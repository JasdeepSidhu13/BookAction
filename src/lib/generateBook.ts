import { LIMITS, clampText } from "@/lib/limits";
import type { BankQuestion, Chapter, Question, SummaryBlock } from "@/lib/types";
import { sql } from "@/lib/db";

export type GeneratedBookPayload = {
  title: string;
  author: string;
  chapters: Chapter[];
  mode: "heuristic" | "llm";
};

type RawChapter = { number: number; title: string; body: string };

const ACCENTS = ["#2F6F6A", "#3730A3", "#B45309", "#155E75", "#9A3412", "#1D4ED8"];

export async function generateBookFromText(input: {
  text: string;
  filename?: string;
  titleHint?: string;
  authorHint?: string;
  /** Opt-in: slower, needs OPENAI_API_KEY. Default is fast heuristic so PDF upload always works. */
  useLlm?: boolean;
}): Promise<GeneratedBookPayload> {
  const meta = inferMeta(input.text, input.filename, input.titleHint, input.authorHint);
  const raw = splitChapters(input.text).slice(0, LIMITS.maxChapters);
  if (raw.length === 0) {
    throw new Error("no_chapters_found");
  }

  const llmKey = process.env.OPENAI_API_KEY?.trim() ?? "";
  if (input.useLlm && llmKey) {
    try {
      // Cap AI chapters so large PDFs finish within request limits.
      const aiCount = Math.min(raw.length, 8);
      const aiChapters = await generateWithLlm(raw.slice(0, aiCount), llmKey);
      const rest = raw.slice(aiCount).map((ch, idx) => heuristicChapter(ch, aiCount + idx));
      return { ...meta, chapters: [...aiChapters, ...rest], mode: "llm" };
    } catch {
      // Fall through to heuristic so uploads still succeed.
    }
  }

  return {
    ...meta,
    chapters: raw.map((ch, idx) => heuristicChapter(ch, idx)),
    mode: "heuristic",
  };
}

export async function persistGeneratedBook(input: {
  ownerSub: string;
  bookId: string;
  filename?: string;
  bytes?: number;
  generated: GeneratedBookPayload;
}) {
  const accent = ACCENTS[Math.abs(hash(input.bookId)) % ACCENTS.length];
  await sql(
    `insert into user_books
      (id, owner_sub, title, author, cover_accent, source_filename, source_bytes,
       status, generation_mode, chapter_count, updated_at)
     values ($1,$2,$3,$4,$5,$6,$7,'ready',$8,$9, now())
     on conflict (id) do update set
       title = excluded.title,
       author = excluded.author,
       cover_accent = excluded.cover_accent,
       source_filename = excluded.source_filename,
       source_bytes = excluded.source_bytes,
       status = 'ready',
       error_message = null,
       generation_mode = excluded.generation_mode,
       chapter_count = excluded.chapter_count,
       updated_at = now()`,
    [
      input.bookId,
      input.ownerSub,
      clampText(input.generated.title, LIMITS.bookTitle),
      clampText(input.generated.author, LIMITS.bookAuthor) || "Unknown",
      accent,
      input.filename ?? null,
      input.bytes ?? null,
      input.generated.mode,
      input.generated.chapters.length,
    ],
  );

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
    head.match(/(?:^|\n)\s*([A-Z][A-Za-z0-9:'&\- ]{8,80})\s*(?:\n|$)/)?.[1] ??
    "";
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

function splitChapters(text: string): RawChapter[] {
  const normalized = text.replace(/\r/g, "\n");
  type Hit = { index: number; number: number; title: string; style: string };

  const candidates: Hit[] = [
    ...collectHits(
      normalized,
      // Strong body marker used by many print PDFs: number alone, then title line.
      /(?:^|\n)\s*(\d{1,2})\s*\n\s*([A-Z][^\n]{2,100})/g,
      (m) => ({
        index: m.index + (m[0].startsWith("\n") ? 1 : 0),
        number: romanOrInt(m[1]),
        title: cleanTitle(m[2]),
        style: "numbered-block",
      }),
    ),
    ...collectHits(
      normalized,
      /(?:^|\n)\s*chapter\s+(\d+|[IVXLC]+)\s*[:.\-–—]?\s*([^\n]{0,120})/gi,
      (m) => ({
        index: m.index + (m[0].startsWith("\n") ? 1 : 0),
        number: romanOrInt(m[1]),
        title: cleanTitle(m[2] || `Chapter ${m[1]}`),
        style: "chapter-word",
      }),
    ),
    ...collectHits(
      normalized,
      /(?:^|\n)\s*(\d{1,2})[.)]\s+([A-Z][^\n]{2,100})/g,
      (m) => ({
        index: m.index + (m[0].startsWith("\n") ? 1 : 0),
        number: romanOrInt(m[1]),
        title: cleanTitle(m[2]),
        style: "dotted",
      }),
    ),
  ].filter((h) => h.number >= 1 && h.number <= 60 && h.title.length >= 3);

  const unique = pickChapterSequence(candidates).slice(0, LIMITS.maxChapters);
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

  // Fallback: chunk long books into pseudo-chapters.
  const chunks = chunkText(normalized, 9000).slice(0, LIMITS.maxChapters);
  return chunks.map((body, i) => ({
    number: i + 1,
    title: `Section ${i + 1}`,
    body,
  }));
}

function collectHits<T extends { index: number; number: number; title: string }>(
  text: string,
  pattern: RegExp,
  map: (m: RegExpExecArray) => T,
): T[] {
  const hits: T[] = [];
  pattern.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    const hit = map(match);
    if (!hit.number || hit.number > 80) continue;
    if (!hit.title || hit.title.length < 2) continue;
    hits.push(hit);
  }
  return hits;
}

/**
 * Build an ascending chapter sequence starting at 1.
 * Prefer body-style markers and later occurrences (skip TOC), with a minimum gap.
 */
function pickChapterSequence(
  hits: { index: number; number: number; title: string; style: string }[],
) {
  const styleRank: Record<string, number> = {
    "numbered-block": 3,
    "chapter-word": 2,
    dotted: 1,
  };
  const byNum = new Map<number, typeof hits>();
  for (const hit of hits) {
    const list = byNum.get(hit.number) ?? [];
    list.push(hit);
    byNum.set(hit.number, list);
  }

  const chosen: typeof hits = [];
  let minIndex = 0;
  for (let n = 1; n <= 60; n++) {
    const options = (byNum.get(n) ?? [])
      .filter((h) => h.index >= minIndex)
      .sort((a, b) => {
        const rank = (styleRank[b.style] ?? 0) - (styleRank[a.style] ?? 0);
        if (rank !== 0) return rank;
        // Prefer later start so TOC (earlier) loses to body.
        return b.index - a.index;
      });
    // If many early dotted TOC hits exist, prefer the latest strong style.
    const pick =
      options.find((h) => h.style !== "dotted") ??
      options[0];
    if (!pick) break;
    // Skip tiny gaps that are usually false positives inside a chapter.
    if (chosen.length > 0 && pick.index - chosen[chosen.length - 1].index < 400) {
      continue;
    }
    chosen.push(pick);
    minIndex = pick.index + 400;
  }

  // If we failed to start at 1, fall back to the densest ascending run.
  if (chosen.length >= 2 && chosen[0].number === 1) return chosen;

  const sorted = [...hits].sort((a, b) => a.index - b.index);
  const run: typeof hits = [];
  for (const hit of sorted) {
    if (run.length === 0) {
      run.push(hit);
      continue;
    }
    const prev = run[run.length - 1];
    if (hit.number === prev.number + 1 && hit.index - prev.index >= 400) {
      run.push(hit);
    }
  }
  return run.length >= chosen.length ? run : chosen;
}

function heuristicChapter(raw: RawChapter, idx: number): Chapter {
  const body = raw.body.slice(0, LIMITS.chapterSourceChars);
  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter((p) => p.length > 60);
  const bigIdea =
    paragraphs[0]?.slice(0, 320) ||
    "This chapter invites you to notice key ideas and turn them into committed action.";
  const headings = extractHeadings(body).slice(0, 5);
  const ideas =
    headings.length > 0
      ? headings.map((h) => ({
          title: h,
          body: nearestParagraph(body, h).slice(0, 220) || "Reflect on how this idea shows up in your life.",
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
      ideas: ideas.length
        ? ideas
        : [{ title: "Start here", body: bigIdea.slice(0, 220) }],
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

async function generateWithLlm(raw: RawChapter[], apiKey: string): Promise<Chapter[]> {
  const chapters: Chapter[] = [];
  // Generate sequentially in small batches to stay within time/token budgets.
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    const excerpt = ch.body.slice(0, LIMITS.chapterSourceChars);
    const prompt = `You create chapter study guides for a reading + action app.
Return ONLY valid JSON with this shape:
{
  "title": string,
  "shortTitle": string,
  "teaser": string,
  "bigIdea": string,
  "ideas": [{"title": string, "body": string}],
  "insight": string,
  "apply": [string, string, string],
  "bankQuestions": [string, ...],
  "checkInPrompts": {
     "scale1": string,
     "text1": string,
     "scale2": string,
     "commitment": string
  }
}
Rules:
- 4-6 ideas max
- 6-12 bankQuestions that are reflective/actionable, second person ("What...?", "How...?")
- No markdown, no commentary
Chapter ${ch.number} titled "${ch.title}":
"""
${excerpt}
"""`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
        temperature: 0.3,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You extract faithful chapter summaries and action questions. Prefer the author's language. Never invent citations.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });
    if (!res.ok) throw new Error(`llm_${res.status}`);
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content ?? "";
    const parsed = JSON.parse(content) as {
      title?: string;
      shortTitle?: string;
      teaser?: string;
      bigIdea?: string;
      ideas?: { title: string; body: string }[];
      insight?: string;
      apply?: string[];
      bankQuestions?: string[];
      checkInPrompts?: {
        scale1?: string;
        text1?: string;
        scale2?: string;
        commitment?: string;
      };
    };

    const title = clampText(parsed.title || ch.title, 120);
    const bank = (parsed.bankQuestions ?? [])
      .map((q) => clampText(q, LIMITS.questionText))
      .filter(Boolean)
      .slice(0, 12)
      .map((promptText, qi) => ({
        id: `u${ch.number}-${qi + 1}`,
        prompt: promptText,
        section: qi < 4 ? "Reflection" : "Action",
        type: "text" as const,
      }));

    const ideas = (parsed.ideas ?? []).slice(0, 6).map((idea) => ({
      title: clampText(idea.title, 80),
      body: clampText(idea.body, 280),
    }));

    const summary: SummaryBlock[] = [
      {
        type: "bigIdea",
        text: clampText(parsed.bigIdea || excerpt.slice(0, 280), 400),
      },
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
        ideas: ideas.length
          ? ideas
          : [{ title: "Core takeaway", body: clampText(parsed.bigIdea || excerpt, 220) }],
      },
      {
        type: "insight",
        id: "insight",
        text: clampText(parsed.insight || parsed.bigIdea || excerpt.slice(0, 220), 320),
      },
      {
        type: "apply",
        id: "apply",
        title: "Apply it",
        accent: "#166534",
        items: (parsed.apply ?? []).slice(0, 3).map((s) => clampText(s, 240)),
      },
    ];

    const cp = parsed.checkInPrompts ?? {};
    chapters.push({
      id: `ch-${ch.number}-${slugify(title)}`,
      number: ch.number,
      title,
      shortTitle: clampText(parsed.shortTitle || title, 28),
      part: `Part ${Math.ceil((i + 1) / 5)}`,
      teaser: clampText(parsed.teaser || parsed.bigIdea || "", 160),
      readMinutes: Math.min(20, Math.max(5, Math.round(excerpt.split(/\s+/).length / 200))),
      summary,
      questions: [
        {
          id: `uq${ch.number}-1`,
          prompt:
            clampText(cp.scale1, LIMITS.questionText) ||
            "How consistently did I practice this chapter’s main idea this week?",
          type: "scale",
          help: "Scale · 1 = not at all, 10 = fully",
        },
        {
          id: `uq${ch.number}-2`,
          prompt:
            clampText(cp.text1, LIMITS.questionText) ||
            bank[0]?.prompt ||
            "What insight mattered most?",
          type: "text",
        },
        {
          id: `uq${ch.number}-3`,
          prompt:
            clampText(cp.scale2, LIMITS.questionText) ||
            "How clear is my next action from this chapter?",
          type: "scale",
          help: "Scale · 1 = unclear, 10 = crystal clear",
        },
        {
          id: `uq${ch.number}-4`,
          prompt: "Did I take the first action I committed to last time?",
          type: "choice",
          choices: ["Yes", "Partly", "No"],
          followsCommitment: true,
        },
        {
          id: `uq${ch.number}-5`,
          prompt:
            clampText(cp.commitment, LIMITS.questionText) ||
            "What am I committing to now, and what is my first step?",
          type: "text",
          tracksCommitment: true,
        },
      ],
      bankQuestions:
        bank.length > 0
          ? bank
          : heuristicChapter(ch, i).bankQuestions,
    });
  }
  return chapters;
}

function extractQuestions(body: string): string[] {
  const lines = body.split(/\n+/).map((l) => l.replace(/\s+/g, " ").trim());
  const out: string[] = [];
  for (const line of lines) {
    if (!line.includes("?")) continue;
    if (line.length < 12 || line.length > 180) continue;
    if (/^(who|what|when|where|why|how|which|am|is|are|do|does|did|can|could|would|will|if)\b/i.test(line) || line.endsWith("?")) {
      const q = line.replace(/^[\d\.\)\-]+\s*/, "");
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
      const titled = line
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
      if (!out.includes(titled)) out.push(titled);
    }
  }
  return out;
}

function nearestParagraph(body: string, heading: string): string {
  const idx = body.toUpperCase().indexOf(heading.toUpperCase());
  if (idx < 0) return "";
  const slice = body.slice(idx, idx + 500);
  const parts = slice.split(/\n{2,}/).map((p) => p.replace(/\s+/g, " ").trim());
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
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "chapter";
}

function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) | 0;
  return h;
}
