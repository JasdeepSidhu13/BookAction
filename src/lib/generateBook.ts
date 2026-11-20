import { randomBytes } from "node:crypto";
import { LIMITS, clampText } from "@/lib/limits";
import { cleanPdfText, isChapterLine, isLikelyHeading } from "@/lib/pdfClean";
import type { BankQuestion, Chapter, Question, SummaryBlock } from "@/lib/types";
import { sql } from "@/lib/db";

export type GeneratedBookPayload = {
  title: string;
  author: string;
  chapters: Chapter[];
  mode: "heuristic";
};

type RawChapter = { number: number; title: string; body: string };
type Hit = {
  index: number;
  number: number;
  title: string;
  style: "block" | "chapter" | "part" | "dotted" | "heading";
};

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
  const cleaned = cleanPdfText(input.text);
  const meta = inferMeta(cleaned, input.filename, input.titleHint, input.authorHint);
  const raw = splitChapters(cleaned).slice(0, LIMITS.maxChapters);
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
  const head = text.slice(0, 3500);
  const lines = head
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 20);

  let titleFromText = "";
  for (const line of lines) {
    if (isChapterLine(line)) continue;
    if (/^(table of contents|contents|copyright|isbn)/i.test(line)) continue;
    if (line.length >= 6 && line.length <= 80 && !/[.!?]$/.test(line)) {
      titleFromText = line;
      break;
    }
  }

  const authorFromText =
    head.match(/(?:^|\n)\s*(?:by|author[:\s]+)\s*([A-Z][A-Za-z .'\-]{2,60})/im)?.[1] ?? "";
  const fromFile = (filename ?? "")
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return {
    title: clampText(
      titleHint || titleFromText || fromFile || "Uploaded book",
      LIMITS.bookTitle,
    ),
    author:
      clampText(authorHint || authorFromText || "Unknown", LIMITS.bookAuthor) ||
      "Unknown",
  };
}

/**
 * Line-oriented chapter detection — avoids nested \s* regexes that backtrack on whitespace.
 */
function splitChapters(text: string): RawChapter[] {
  const normalized = text.slice(0, LIMITS.uploadChars);
  const lines = normalized.split("\n");
  const lineOffsets: number[] = new Array(lines.length);
  let offset = 0;
  for (let i = 0; i < lines.length; i++) {
    lineOffsets[i] = offset;
    offset += lines[i].length + 1;
  }

  const tocEnd = estimateTocEnd(normalized);
  const hits: Hit[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const index = lineOffsets[i];

    // Prefer body hits after the table of contents.
    const inToc = index < tocEnd;

    const chapterWord =
      /^(?:chapter|ch\.?)\s+(\d{1,2}|[ivxlc]{1,8})\s*[:.\-–—]?\s*(.*)$/i.exec(line);
    if (chapterWord) {
      const number = romanOrInt(chapterWord[1]);
      const title = cleanTitle(chapterWord[2] || `Chapter ${number}`);
      if (number >= 1 && number <= 60 && title.length >= 2) {
        hits.push({
          index,
          number,
          title,
          style: inToc ? "dotted" : "chapter",
        });
      }
      continue;
    }

    const partWord =
      /^part\s+(\d{1,2}|[ivxlc]{1,8}|one|two|three|four|five)\s*[:.\-–—]?\s*(.*)$/i.exec(
        line,
      );
    if (partWord && !inToc) {
      const number = partToNumber(partWord[1]);
      const title = cleanTitle(partWord[2] || `Part ${number}`);
      if (number >= 1 && number <= 20) {
        hits.push({ index, number, title, style: "part" });
      }
      continue;
    }

    const dotted = /^(\d{1,2})[.)]\s+([A-Z].{2,100})$/.exec(line);
    if (dotted && !inToc) {
      const number = Number(dotted[1]);
      const title = cleanTitle(dotted[2]);
      if (number >= 1 && number <= 60 && title.length >= 3 && !/\.{3}|…/.test(line)) {
        hits.push({ index, number, title, style: "dotted" });
      }
      continue;
    }

    if (/^\d{1,2}$/.test(line) && !inToc) {
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j += 1;
      if (j < lines.length) {
        const titleLine = lines[j].trim();
        if (
          /^[A-Z]/.test(titleLine) &&
          titleLine.length >= 3 &&
          titleLine.length <= 100 &&
          !/[.!?]$/.test(titleLine)
        ) {
          const number = Number(line);
          if (number >= 1 && number <= 60) {
            hits.push({
              index,
              number,
              title: cleanTitle(titleLine),
              style: "block",
            });
          }
        }
      }
    }
  }

  let unique = pickChapterSequence(hits).slice(0, LIMITS.maxChapters);

  // If chapter markers failed, split on major headings after the front matter.
  if (unique.length < 2) {
    unique = headingBasedChapters(normalized, tocEnd).slice(0, LIMITS.maxChapters);
  }

  if (unique.length >= 2) {
    return unique.map((hit, i) => {
      const end = i + 1 < unique.length ? unique[i + 1].index : normalized.length;
      let body = normalized.slice(hit.index, end).trim();
      body = stripLeadingTitle(body, hit.title);
      return {
        number: hit.number || i + 1,
        title: hit.title,
        body: body.slice(0, LIMITS.chapterSourceChars * 3),
      };
    });
  }

  // Last resort: size-based chunks with titles from the first strong sentence.
  const start = Math.min(tocEnd, Math.floor(normalized.length * 0.05));
  const chunks = chunkText(normalized.slice(start), 7000).slice(0, LIMITS.maxChapters);
  return chunks.map((body, i) => ({
    number: i + 1,
    title: titleFromBody(body, i + 1),
    body,
  }));
}

function estimateTocEnd(text: string): number {
  const lower = text.slice(0, 40_000).toLowerCase();
  const tocIdx = lower.search(
    /(?:^|\n)\s*(table of contents|contents|toc)\s*(?:\n|$)/,
  );
  if (tocIdx < 0) return 0;

  // TOC entries are dense (many short chapter lines close together).
  // Find where spacing between "chapter N" hits suddenly grows.
  const window = text.slice(tocIdx, tocIdx + 25_000);
  const chapterHits = [...window.matchAll(/(?:^|\n)\s*chapter\s+\d+/gi)];
  if (chapterHits.length < 3) return tocIdx + 500;

  let last = chapterHits[0].index ?? 0;
  for (let i = 1; i < chapterHits.length; i++) {
    const at = chapterHits[i].index ?? 0;
    if (at - last > 1200 && i >= 3) {
      return tocIdx + at;
    }
    last = at;
  }
  // Fallback: after the dense TOC block
  const lastToc = chapterHits[Math.min(chapterHits.length - 1, 20)].index ?? 0;
  return tocIdx + lastToc + 80;
}

function headingBasedChapters(text: string, after: number): Hit[] {
  const slice = text.slice(after);
  const lines = slice.split("\n");
  const hits: Hit[] = [];
  let offset = after;
  let n = 1;
  for (const raw of lines) {
    const line = raw.trim();
    if (
      line &&
      isLikelyHeading(line) &&
      !/^(table of contents|contents|copyright|index|appendix)/i.test(line) &&
      line.length >= 6
    ) {
      // Prefer headings that are followed by a real paragraph soon after.
      const next = slice.slice(offset + raw.length, offset + raw.length + 400);
      const prose = next.replace(/\n+/g, " ").trim();
      if (prose.length > 80) {
        hits.push({
          index: offset,
          number: n,
          title: cleanTitle(line),
          style: "heading",
        });
        n += 1;
        if (n > LIMITS.maxChapters) break;
      }
    }
    offset += raw.length + 1;
  }

  // Keep headings that are reasonably spaced (real sections, not a list).
  const spaced: Hit[] = [];
  for (const hit of hits) {
    const prev = spaced[spaced.length - 1];
    if (!prev || hit.index - prev.index >= 800) spaced.push(hit);
  }
  return spaced.length >= 2 ? spaced : [];
}

function pickChapterSequence(hits: Hit[]): Hit[] {
  const styleRank: Record<Hit["style"], number> = {
    chapter: 4,
    block: 3,
    part: 2,
    heading: 2,
    dotted: 1,
  };
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
        // Prefer later body over early TOC
        return b.index - a.index;
      });
    const pick =
      options.find((h) => h.style === "chapter" || h.style === "block") ??
      options.find((h) => h.style !== "dotted") ??
      options[0];
    if (!pick) {
      if (chosen.length >= 2) break;
      continue;
    }
    if (chosen.length > 0 && pick.index - chosen[chosen.length - 1].index < 220) {
      continue;
    }
    chosen.push(pick);
    minIndex = pick.index + 220;
  }

  if (chosen.length >= 2 && chosen[0].number <= 2) return chosen;

  const sorted = [...hits]
    .filter((h) => h.style !== "dotted")
    .sort((a, b) => a.index - b.index);
  const run: Hit[] = [];
  for (const hit of sorted) {
    if (run.length === 0) {
      run.push(hit);
      continue;
    }
    const prev = run[run.length - 1];
    if (hit.number === prev.number + 1 && hit.index - prev.index >= 220) {
      run.push(hit);
    }
  }
  return run.length >= chosen.length ? run : chosen;
}

function heuristicChapter(raw: RawChapter, idx: number): Chapter {
  const body = raw.body.slice(0, LIMITS.chapterSourceChars);
  const sentences = extractSentences(body);
  const scored = sentences
    .map((s) => ({ text: s, score: scoreSentence(s) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const thesis =
    pickThesis(sentences, scored) ||
    "This chapter asks you to turn its core idea into a concrete decision and a next action.";

  const sections = extractSectionIdeas(body);
  const ideaPool =
    sections.length >= 2
      ? sections
      : scored.slice(0, 8).map((s, i) => ({
          title: ideaTitle(s.text, i),
          body: tighten(s.text, 220),
        }));

  // Dedupe similar ideas
  const ideas = dedupeIdeas(ideaPool).slice(0, 4);
  while (ideas.length < 2) {
    ideas.push({
      title: `Practice ${ideas.length + 1}`,
      body: tighten(thesis, 180),
    });
  }

  const insight =
    scored.find(
      (s) =>
        s.text.length >= 40 &&
        s.text.length <= 180 &&
        s.text !== thesis &&
        !ideas.some((i) => i.body.startsWith(s.text.slice(0, 40))),
    )?.text ||
    sentences.find((s) => s.length >= 40 && s.length <= 160 && s !== thesis) ||
    "Return to this idea when you notice yourself waiting to feel ready before acting.";

  const applyItems = buildApplyItems(body, ideas, thesis);
  const bank = buildBankQuestions(body, raw.number, thesis, ideas, applyItems);
  const questions = buildActionQuestions(raw.number, thesis, bank);

  const summary: SummaryBlock[] = [
    { type: "bigIdea", text: clampText(tighten(thesis, 320), 360) },
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
      ideas,
    },
    {
      type: "insight",
      id: "insight",
      text: clampText(tighten(insight, 260), 280),
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: applyItems,
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
    teaser: clampText(tighten(thesis, 150), 160),
    readMinutes: Math.min(20, Math.max(5, Math.round(words / 200))),
    summary,
    questions,
    bankQuestions: bank,
  };
}

function extractSentences(body: string): string[] {
  // Keep heading lines as hard breaks so ALL-CAPS section titles don't glue into prose.
  const blocks: string[] = [];
  for (const line of body.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    if (isLikelyHeading(t) || isChapterLine(t)) {
      blocks.push("\n");
      continue;
    }
    blocks.push(t);
  }
  const prose = blocks
    .join(" ")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .replace(/OceanofPDF\.com/gi, "")
    .trim();

  const parts = prose
    .split(/\n+/)
    .flatMap((para) => para.split(/(?<=[.!?])\s+(?=[A-Z"“])/));

  return parts
    .map((s) => s.trim())
    .filter((s) => {
      if (s.length < 35 || s.length > 280) return false;
      if (/^(chapter|part|table of contents)\b/i.test(s)) return false;
      if (/^\d+$/.test(s)) return false;
      if (isLikelyHeading(s)) return false;
      const letters = (s.match(/[A-Za-z]/g) || []).length;
      return letters / s.length > 0.55;
    });
}

function scoreSentence(s: string): number {
  let score = 0;
  if (/\byou\b|\byour\b/i.test(s)) score += 2;
  if (
    /\b(must|should|need to|decide|commit|practice|change|create|build|choose|stop|start|mean|matter)\b/i.test(
      s,
    )
  ) {
    score += 3;
  }
  if (/\bis not\b|\brather than\b|\binstead\b|\bbecause\b/i.test(s)) score += 2;
  if (/[.]$/.test(s) && s.length >= 50 && s.length <= 180) score += 2;
  if (/\?$/.test(s)) score -= 1;
  if (/^(figure|table|photo|illustration|page)\b/i.test(s)) score -= 5;
  if (s.split(/\s+/).length < 8) score -= 2;
  // Prefer mid-chapter substance over title echoes
  if (/^[A-Z\s]{10,}$/.test(s)) score -= 4;
  return score;
}

function pickThesis(
  sentences: string[],
  scored: { text: string; score: number }[],
): string {
  // Prefer a strong early sentence (opening claim), then best overall.
  const early = sentences.slice(0, 5).map((text, i) => ({
    text,
    score: scoreSentence(text) + (3 - Math.min(i, 3)),
  }));
  const pool = [...early, ...scored.slice(0, 5)].sort((a, b) => b.score - a.score);
  const best = pool[0]?.text ?? "";
  // Avoid thesis that swallowed a heading remnant.
  if (/[A-Z]{4,}\s+[A-Z]{4,}/.test(best)) {
    return sentences.find((s) => !/[A-Z]{4,}\s+[A-Z]{4,}/.test(s)) ?? best;
  }
  return best;
}

function extractSectionIdeas(
  body: string,
): { title: string; body: string }[] {
  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
  const ideas: { title: string; body: string }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!isLikelyHeading(line) || isChapterLine(line)) continue;
    if (/^(key ideas|apply|summary|contents)/i.test(line)) continue;
    const following: string[] = [];
    for (let j = i + 1; j < Math.min(lines.length, i + 8); j++) {
      if (isLikelyHeading(lines[j]) || isChapterLine(lines[j])) break;
      following.push(lines[j]);
    }
    const para = following.join(" ").replace(/\s+/g, " ").trim();
    if (para.length < 40) continue;
    const title = titleCase(cleanTitle(line)).slice(0, 60);
    // Prefer the strongest sentence under the heading as the body.
    const under = extractSentences(para);
    const best =
      under.map((t) => ({ t, s: scoreSentence(t) })).sort((a, b) => b.s - a.s)[0]
        ?.t ?? para;
    ideas.push({
      title,
      body: tighten(best, 220),
    });
  }
  return ideas;
}

function ideaTitle(sentence: string, index: number): string {
  // Pull a short noun-ish phrase from the sentence.
  const cleaned = sentence.replace(/^[^A-Za-z]+/, "");
  const clause = cleaned.split(/[:,—–-]/)[0]?.trim() ?? cleaned;
  if (clause.length >= 12 && clause.length <= 48 && !/[.!?]$/.test(clause)) {
    return titleCase(clause);
  }
  const words = cleaned.split(/\s+/).slice(0, 6).join(" ");
  if (words.length >= 12) return titleCase(words.replace(/[.!?].*$/, ""));
  return `Key point ${index + 1}`;
}

function dedupeIdeas(
  ideas: { title: string; body: string }[],
): { title: string; body: string }[] {
  const out: { title: string; body: string }[] = [];
  for (const idea of ideas) {
    const key = idea.body.slice(0, 50).toLowerCase();
    if (out.some((o) => o.body.slice(0, 50).toLowerCase() === key)) continue;
    if (out.some((o) => o.title.toLowerCase() === idea.title.toLowerCase())) continue;
    out.push({
      title: clampText(idea.title, 80),
      body: clampText(idea.body, 240),
    });
  }
  return out;
}

function buildApplyItems(
  body: string,
  ideas: { title: string; body: string }[],
  thesis: string,
): string[] {
  const imperatives = extractImperatives(body).slice(0, 2);
  const items: string[] = [...imperatives];

  if (ideas[0]) {
    items.push(
      `Write one sentence on how “${ideas[0].title}” shows up in your life this week.`,
    );
  }
  items.push(
    `Name one first action (within 24 hours) that would prove you are living: ${tighten(thesis, 100)}`,
  );
  items.push(
    "Note what might get in the way — and the smallest next step if it does.",
  );

  return [...new Set(items.map((s) => clampText(s, 240)))].slice(0, 4);
}

function extractImperatives(body: string): string[] {
  const sentences = extractSentences(body);
  const out: string[] = [];
  for (const s of sentences) {
    if (s.length > 180 || s.length < 28) continue;
    if (
      /^(do|make|take|write|list|choose|set|stop|start|practice|ask|notice|schedule|commit|decide|create|build|put|keep|pick|name|reduce|attach|treat|adjust)\b/i.test(
        s,
      )
    ) {
      out.push(tighten(s, 200));
    }
  }
  return out;
}

function buildBankQuestions(
  body: string,
  chapterNumber: number,
  thesis: string,
  ideas: { title: string; body: string }[],
  applyItems: string[],
): BankQuestion[] {
  const extracted = extractQuestions(body);
  const generated = [
    `What is the core claim of this chapter for me?`,
    `Where does “${ideas[0]?.title ?? "this idea"}” show up in my life right now?`,
    `What am I avoiding that this chapter makes harder to ignore?`,
    `If I believed “${tighten(thesis, 90)}”, what would I do differently this week?`,
    applyItems[0]
      ? `Did I follow through on: ${applyItems[0].replace(/\?$/, "")}?`
      : "What first action will I take within 24 hours?",
    "What might get in the way, and how will I respond?",
    ideas[1]
      ? `How could I practice “${ideas[1].title}” in a small way today?`
      : "What would living this idea look like on an ordinary Tuesday?",
    "What evidence would show me I’m changing — not just intending to?",
  ];

  const prompts = [...extracted, ...generated]
    .map((p) => clampText(p.replace(/\s+/g, " ").trim(), LIMITS.questionText))
    .filter((p) => p.length >= 12);
  const unique: string[] = [];
  for (const p of prompts) {
    if (!unique.some((u) => u.toLowerCase() === p.toLowerCase())) unique.push(p);
  }

  return unique.slice(0, 10).map((prompt, i) => ({
    id: `u${chapterNumber}-${i + 1}`,
    prompt,
    section: i < 3 ? "Reflection" : i < 6 ? "Apply" : "Action",
    type: "text" as const,
  }));
}

function buildActionQuestions(
  chapterNumber: number,
  thesis: string,
  bank: BankQuestion[],
): Question[] {
  return [
    {
      id: `uq${chapterNumber}-1`,
      prompt: "How consistently did I practice this chapter’s main idea this week?",
      type: "scale",
      help: "Scale · 1 = not at all, 10 = fully",
    },
    {
      id: `uq${chapterNumber}-2`,
      prompt:
        bank[0]?.prompt ??
        `What from “${tighten(thesis, 80)}” mattered most this week?`,
      type: "text",
    },
    {
      id: `uq${chapterNumber}-3`,
      prompt: "How clear is my next action from this chapter?",
      type: "scale",
      help: "Scale · 1 = unclear, 10 = crystal clear",
    },
    {
      id: `uq${chapterNumber}-4`,
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: `uq${chapterNumber}-5`,
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ];
}

function extractQuestions(body: string): string[] {
  const lines = body.split("\n").map((l) => l.replace(/[ \t]+/g, " ").trim());
  const out: string[] = [];
  for (const line of lines) {
    if (!line.includes("?")) continue;
    if (line.length < 16 || line.length > 180) continue;
    if (
      /^(who|what|when|where|why|how|which|am|is|are|do|does|did|can|could|would|will|if)\b/i.test(
        line,
      ) ||
      line.endsWith("?")
    ) {
      const q = line.replace(/^[\d.)\-•]+\s*/, "");
      if (!out.includes(q)) out.push(q);
    }
  }
  // Also catch questions mid-paragraph
  for (const s of extractSentences(body)) {
    if (s.endsWith("?") && s.length >= 16 && s.length <= 180 && !out.includes(s)) {
      out.push(s);
    }
  }
  return out;
}

function stripLeadingTitle(body: string, title: string): string {
  const lines = body.split("\n");
  let i = 0;
  while (i < Math.min(6, lines.length)) {
    const t = lines[i].trim();
    if (!t) {
      i += 1;
      continue;
    }
    if (
      isChapterLine(t) ||
      t.toLowerCase() === title.toLowerCase() ||
      t.toLowerCase().includes(title.toLowerCase().slice(0, 24))
    ) {
      i += 1;
      continue;
    }
    break;
  }
  return lines.slice(i).join("\n").trim();
}

function titleFromBody(body: string, n: number): string {
  const sentences = extractSentences(body);
  if (sentences[0]) {
    const words = sentences[0].split(/\s+/).slice(0, 6).join(" ");
    return titleCase(words.replace(/[.!?].*$/, "")) || `Section ${n}`;
  }
  return `Section ${n}`;
}

function chunkText(text: string, size: number): string[] {
  const parts: string[] = [];
  let rest = text.trim();
  while (rest.length > size) {
    let cut = rest.lastIndexOf("\n\n", size);
    if (cut < size * 0.45) cut = rest.lastIndexOf(". ", size);
    if (cut < size * 0.45) cut = size;
    parts.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  if (rest) parts.push(rest);
  return parts;
}

function romanOrInt(raw: string): number {
  if (/^\d+$/.test(raw)) return Number(raw);
  return partToNumber(raw);
}

function partToNumber(raw: string): number {
  const word: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
  };
  const lower = raw.toLowerCase();
  if (word[lower]) return word[lower];
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
  return (
    title
      .replace(/\s+/g, " ")
      .replace(/OceanofPDF.*/i, "")
      .replace(/\.{2,}|…/g, "")
      .replace(/\s+\d{1,3}\s*$/, "")
      .trim() || "Untitled chapter"
  );
}

function titleCase(value: string): string {
  return value
    .toLowerCase()
    .replace(/\b([a-z])/g, (c) => c.toUpperCase())
    .replace(/\b(A|An|The|And|Or|Of|To|In|On|For|With)\b/g, (w, _m, offset) =>
      offset === 0 ? w : w.toLowerCase(),
    );
}

function tighten(value: string, max: number): string {
  let s = value.replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const at = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("; "), cut.lastIndexOf(", "));
  if (at > max * 0.5) return cut.slice(0, at + (cut[at] === "." ? 1 : 0)).trim();
  return `${cut.replace(/\s+\S*$/, "").trim()}…`;
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
