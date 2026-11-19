import { randomBytes } from "node:crypto";
import { LIMITS, clampText } from "@/lib/limits";
import type { BankQuestion, Chapter, Question, SummaryBlock } from "@/lib/types";
import { sql } from "@/lib/db";

export type GeneratedBookPayload = {
  title: string;
  author: string;
  chapters: Chapter[];
  mode: "heuristic";
};

type RawChapter = { number: number; title: string; body: string };
type Hit = { index: number; number: number; title: string; style: "block" | "chapter" | "dotted" };

const ACCENTS = ["#2F6F6A", "#3730A3", "#B45309", "#155E75", "#9A3412", "#1D4ED8"];

/**
 * Extract chapter summaries + Action / Question Bank prompts from uploaded text.
 * Uses local heuristics only (no external API).
 */
export async function generateBookFromText(input: {
  text: string;
  filename?: string;
  titleHint?: string;
  authorHint?: string;
}): Promise<GeneratedBookPayload> {
  const meta = inferMeta(input.text, input.filename, input.titleHint, input.authorHint);
  const raw = splitChapters(input.text).slice(0, LIMITS.maxChapters);
  if (raw.length === 0) {
    throw new Error("no_chapters_found");
  }

  return {
    ...meta,
    chapters: raw.map((ch, idx) => heuristicChapter(ch, idx)),
    mode: "heuristic",
  };
}

export function newUserBookId(ownerSub: string, title: string): string {
  const owner = slugify(ownerSub).slice(0, 12) || "owner";
  const base = slugify(title) || "uploaded-book";
  const rand = randomBytes(4).toString("hex");
  return `user-${owner}-${base}-${rand}`;
}

export async function persistGeneratedBook(input: {
  ownerSub: string;
  bookId: string;
  filename?: string;
  bytes?: number;
  generated: GeneratedBookPayload;
}) {
  const accent = ACCENTS[Math.abs(hash(input.bookId)) % ACCENTS.length];

  // Insert-only: never overwrite another owner's row on id conflict.
  const inserted = await sql<{ id: string }>(
    `insert into user_books
      (id, owner_sub, title, author, cover_accent, source_filename, source_bytes,
       status, generation_mode, chapter_count, updated_at)
     values ($1,$2,$3,$4,$5,$6,$7,'ready','heuristic',$8, now())
     on conflict (id) do nothing
     returning id`,
    [
      input.bookId,
      input.ownerSub,
      clampText(input.generated.title, LIMITS.bookTitle),
      clampText(input.generated.author, LIMITS.bookAuthor) || "Unknown",
      accent,
      input.filename ?? null,
      input.bytes ?? null,
      input.generated.chapters.length,
    ],
  );
  if (!inserted[0]) {
    throw new Error("book_id_conflict");
  }

  await sql(`delete from user_chapters where owner_sub = $1 and book_id = $2`, [
    input.ownerSub,
    input.bookId,
  ]);

  for (const chapter of input.generated.chapters) {
    await sql(
      `insert into user_chapters
        (book_id, owner_sub, chapter_id, number, title, short_title, part, teaser,
         read_minutes, summary_json, questions_json, bank_questions_json, updated_at)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11::jsonb,$12::jsonb, now())`,
      [
        input.bookId,
        input.ownerSub,
        chapter.id,
        chapter.number,
        chapter.title,
        chapter.shortTitle,
        chapter.part,
        chapter.teaser,
        chapter.readMinutes,
        JSON.stringify(chapter.summary),
        JSON.stringify(chapter.questions),
        JSON.stringify(chapter.bankQuestions),
      ],
    );
  }
}

function inferMeta(
  text: string,
  filename?: string,
  titleHint?: string,
  authorHint?: string,
) {
  const head = text.slice(0, 2500);
  const titleFromText =
    head.match(/(?:^|\n)([A-Z][A-Za-z0-9:'&\- ]{8,80})\s*(?:\n|$)/)?.[1] ?? "";
  const authorFromText =
    head.match(/(?:by|author[:\s]+)\s*([A-Z][A-Za-z .'\-]{2,60})/i)?.[1] ?? "";
  const fromFile = (filename ?? "")
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return {
    title: clampText(titleHint || titleFromText || fromFile || "Uploaded book", LIMITS.bookTitle),
    author: clampText(authorHint || authorFromText || "Unknown", LIMITS.bookAuthor) || "Unknown",
  };
}

/**
 * Line-oriented chapter detection — avoids nested \s* regexes that backtrack on whitespace.
 */
function splitChapters(text: string): RawChapter[] {
  const normalized = text.replace(/\r\n?/g, "\n").slice(0, LIMITS.uploadChars);
  const lines = normalized.split("\n");
  const lineOffsets: number[] = new Array(lines.length);
  let offset = 0;
  for (let i = 0; i < lines.length; i++) {
    lineOffsets[i] = offset;
    offset += lines[i].length + 1;
  }

  const hits: Hit[] = [];
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) continue;

    // "Chapter 12: Title" / "CHAPTER 3 Title"
    const chapterWord = /^chapter\s+(\d{1,2}|[ivxlc]{1,6})\s*[:.\-–—]?\s*(.*)$/i.exec(line);
    if (chapterWord) {
      const number = romanOrInt(chapterWord[1]);
      const title = cleanTitle(chapterWord[2] || `Chapter ${number}`);
      if (number >= 1 && number <= 60 && title.length >= 2) {
        hits.push({ index: lineOffsets[i], number, title, style: "chapter" });
      }
      continue;
    }

    // "1. Why Bother?" / "12) Title"
    const dotted = /^(\d{1,2})[.)]\s+([A-Z].{2,100})$/.exec(line);
    if (dotted) {
      const number = Number(dotted[1]);
      const title = cleanTitle(dotted[2]);
      if (number >= 1 && number <= 60 && title.length >= 3) {
        hits.push({ index: lineOffsets[i], number, title, style: "dotted" });
      }
      continue;
    }

    // Number alone, next non-empty line is title (common in print PDFs).
    if (/^\d{1,2}$/.test(line)) {
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j += 1;
      if (j < lines.length) {
        const titleLine = lines[j].trim();
        if (/^[A-Z]/.test(titleLine) && titleLine.length >= 3 && titleLine.length <= 100) {
          const number = Number(line);
          if (number >= 1 && number <= 60) {
            hits.push({
              index: lineOffsets[i],
              number,
              title: cleanTitle(titleLine),
              style: "block",
            });
          }
        }
      }
    }
  }

  const unique = pickChapterSequence(hits).slice(0, LIMITS.maxChapters);
  if (unique.length >= 2) {
    return unique.map((hit, i) => {
      const end = i + 1 < unique.length ? unique[i + 1].index : normalized.length;
      const body = normalized.slice(hit.index, end).trim();
      return {
        number: hit.number || i + 1,
        title: hit.title,
        body: body.slice(0, LIMITS.chapterSourceChars * 3),
      };
    });
  }

  const chunks = chunkText(normalized, 9000).slice(0, LIMITS.maxChapters);
  return chunks.map((body, i) => ({
    number: i + 1,
    title: `Section ${i + 1}`,
    body,
  }));
}

function pickChapterSequence(hits: Hit[]): Hit[] {
  const styleRank: Record<Hit["style"], number> = { block: 3, chapter: 2, dotted: 1 };
  const byNum = new Map<number, Hit[]>();
  for (const hit of hits) {
    const list = byNum.get(hit.number) ?? [];
    list.push(hit);
    byNum.set(hit.number, list);
  }

  const chosen: Hit[] = [];
  let minIndex = 0;
  for (let n = 1; n <= 60; n++) {
    const options = (byNum.get(n) ?? [])
      .filter((h) => h.index >= minIndex)
      .sort((a, b) => {
        const rank = styleRank[b.style] - styleRank[a.style];
        if (rank !== 0) return rank;
        return b.index - a.index; // prefer later body over early TOC
      });
    const pick = options.find((h) => h.style !== "dotted") ?? options[0];
    if (!pick) break;
    if (chosen.length > 0 && pick.index - chosen[chosen.length - 1].index < 400) continue;
    chosen.push(pick);
    minIndex = pick.index + 400;
  }

  if (chosen.length >= 2 && chosen[0].number === 1) return chosen;

  const sorted = [...hits].sort((a, b) => a.index - b.index);
  const run: Hit[] = [];
  for (const hit of sorted) {
    if (run.length === 0) {
      run.push(hit);
      continue;
    }
    const prev = run[run.length - 1];
    if (hit.number === prev.number + 1 && hit.index - prev.index >= 400) run.push(hit);
  }
  return run.length >= chosen.length ? run : chosen;
}

function heuristicChapter(raw: RawChapter, idx: number): Chapter {
  const body = raw.body.slice(0, LIMITS.chapterSourceChars);
  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => p.replace(/[ \t]+/g, " ").trim())
    .filter((p) => p.length > 60);
  const bigIdea =
    paragraphs[0]?.slice(0, 320) ||
    "This chapter invites you to notice key ideas and turn them into committed action.";
  const headings = extractHeadings(body).slice(0, 5);
  const ideas =
    headings.length > 0
      ? headings.map((h) => ({
          title: h,
          body:
            nearestParagraph(body, h).slice(0, 220) ||
            "Reflect on how this idea shows up in your life.",
        }))
      : paragraphs.slice(1, 5).map((p, i) => ({
          title: `Key point ${i + 1}`,
          body: p.slice(0, 220),
        }));

  const questionLines = extractQuestions(body);
  const bank: BankQuestion[] = (
    questionLines.length > 0
      ? questionLines
      : [
          "What is the core idea of this chapter for me?",
          "Where does this show up in my life right now?",
          "What am I avoiding that this chapter points toward?",
          "What would living this idea look like this week?",
          "What first action will I take within 24 hours?",
          "What might get in the way, and how will I respond?",
        ]
  )
    .slice(0, 12)
    .map((prompt, i) => ({
      id: `u${raw.number}-${i + 1}`,
      prompt: clampText(prompt, LIMITS.questionText),
      section: i < 3 ? "Reflection" : i < 6 ? "Apply" : "Action",
      type: "text" as const,
    }));

  const questions: Question[] = [
    {
      id: `uq${raw.number}-1`,
      prompt: "How consistently did I practice this chapter’s main idea this week?",
      type: "scale",
      help: "Scale · 1 = not at all, 10 = fully",
    },
    {
      id: `uq${raw.number}-2`,
      prompt: bank[0]?.prompt ?? "What insight from this chapter mattered most?",
      type: "text",
    },
    {
      id: `uq${raw.number}-3`,
      prompt: "How clear is my next action from this chapter?",
      type: "scale",
      help: "Scale · 1 = unclear, 10 = crystal clear",
    },
    {
      id: `uq${raw.number}-4`,
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: `uq${raw.number}-5`,
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ];

  const summary: SummaryBlock[] = [
    { type: "bigIdea", text: bigIdea },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "insight", label: "Key insight", color: "#B45309" },
        { id: "apply", label: "Apply it", color: "#166534" },
      ],
    },
    {
      type: "keyIdeas",
      id: "key",
      title: "Key ideas",
      accent: "#3730A3",
      ideas: ideas.length ? ideas : [{ title: "Start here", body: bigIdea.slice(0, 220) }],
    },
    {
      type: "insight",
      id: "insight",
      text:
        paragraphs[1]?.slice(0, 260) ||
        "Return to this chapter’s idea when you notice yourself waiting to feel ready before acting.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        bank[0]?.prompt ?? "Write one sentence capturing the chapter’s main idea.",
        bank[1]?.prompt ?? "Name one place this idea applies in your life.",
        "Take one small action within 24 hours and note what you learn.",
      ].map((s) => clampText(s, 240)),
    },
  ];

  const shortTitle =
    raw.title.length > 28 ? `${raw.title.slice(0, 26).trim()}…` : raw.title;
  const words = body.split(/\s+/).filter(Boolean).length;
  const partBucket = Math.ceil((idx + 1) / 5);

  return {
    id: `ch-${raw.number}-${slugify(raw.title)}`,
    number: raw.number || idx + 1,
    title: raw.title,
    shortTitle,
    part: `Part ${partBucket}`,
    teaser: clampText(bigIdea, 160),
    readMinutes: Math.min(20, Math.max(5, Math.round(words / 200))),
    summary,
    questions,
    bankQuestions: bank,
  };
}

function extractQuestions(body: string): string[] {
  const lines = body.split("\n").map((l) => l.replace(/[ \t]+/g, " ").trim());
  const out: string[] = [];
  for (const line of lines) {
    if (!line.includes("?")) continue;
    if (line.length < 12 || line.length > 180) continue;
    if (
      /^(who|what|when|where|why|how|which|am|is|are|do|does|did|can|could|would|will|if)\b/i.test(
        line,
      ) ||
      line.endsWith("?")
    ) {
      const q = line.replace(/^[\d.)\-]+\s*/, "");
      if (!out.includes(q)) out.push(q);
    }
  }
  return out;
}

function extractHeadings(body: string): string[] {
  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
  const out: string[] = [];
  for (const line of lines) {
    const letters = line.replace(/[^A-Za-z]/g, "");
    if (
      line.length >= 6 &&
      line.length <= 60 &&
      letters.length >= 4 &&
      letters === letters.toUpperCase() &&
      !line.includes("?")
    ) {
      const titled = line.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
      if (!out.includes(titled)) out.push(titled);
    }
  }
  return out;
}

function nearestParagraph(body: string, heading: string): string {
  const idx = body.toUpperCase().indexOf(heading.toUpperCase());
  if (idx < 0) return "";
  const slice = body.slice(idx, idx + 500);
  const parts = slice.split(/\n{2,}/).map((p) => p.replace(/[ \t]+/g, " ").trim());
  return parts[1] || parts[0] || "";
}

function chunkText(text: string, size: number): string[] {
  const parts: string[] = [];
  let rest = text.trim();
  while (rest.length > size) {
    let cut = rest.lastIndexOf("\n\n", size);
    if (cut < size * 0.5) cut = size;
    parts.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  if (rest) parts.push(rest);
  return parts;
}

function romanOrInt(raw: string): number {
  if (/^\d+$/.test(raw)) return Number(raw);
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100 };
  let n = 0;
  const s = raw.toUpperCase();
  for (let i = 0; i < s.length; i++) {
    const v = map[s[i]] ?? 0;
    const next = map[s[i + 1]] ?? 0;
    n += v < next ? -v : v;
  }
  return n;
}

function cleanTitle(title: string): string {
  return title.replace(/\s+/g, " ").replace(/OceanofPDF.*/i, "").trim() || "Untitled chapter";
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || "chapter"
  );
}

function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) | 0;
  return h;
}
