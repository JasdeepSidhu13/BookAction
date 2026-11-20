import { randomBytes } from "node:crypto";
import { LIMITS, clampText } from "@/lib/limits";
import { cleanPdfText, isChapterLine, isLikelyHeading } from "@/lib/pdfClean";
import { splitChapters, type RawChapter } from "@/lib/sectionSplit";
import type { BankQuestion, Chapter, Question, SummaryBlock } from "@/lib/types";
import { sql } from "@/lib/db";

export type GeneratedBookPayload = {
  title: string;
  author: string;
  chapters: Chapter[];
  mode: "heuristic";
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
  const head = text.slice(0, 4000);
  const lines = head
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 25);

  let titleFromText = "";
  for (const line of lines) {
    if (isChapterLine(line)) continue;
    if (/^(table of contents|contents|copyright|isbn|by\b)/i.test(line)) continue;
    if (line.length >= 6 && line.length <= 80 && !/[.!?]$/.test(line)) {
      titleFromText = line;
      break;
    }
  }

  const authorFromText =
    head.match(
      /(?:^|\n)\s*(?:by|author[:\s]+)\s*([A-Z][A-Za-z .'\-]{2,60})/im,
    )?.[1] ??
    head.match(/\b(Viktor\s+E\.?\s+Frankl)\b/i)?.[1] ??
    "";

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

function heuristicChapter(raw: RawChapter, idx: number): Chapter {
  const body = raw.body.slice(0, LIMITS.chapterSourceChars);
  const sentences = extractSentences(body);
  const scored = sentences
    .map((s) => ({ text: s, score: scoreSentence(s) }))
    .sort((a, b) => b.score - a.score);

  const usable = scored.filter((s) => s.score >= 0);
  const pool = usable.length ? usable : scored;

  const thesis =
    pickThesis(sentences, pool) ||
    firstUsableLine(body) ||
    body.replace(/\s+/g, " ").trim().slice(0, 220);

  const sections = extractSectionIdeas(body);
  const ideaPool =
    sections.length >= 2
      ? sections
      : pool.slice(0, 10).map((s, i) => ({
          title: ideaTitle(s.text, i),
          body: tighten(s.text, 220),
        }));

  const ideas = dedupeIdeas(ideaPool).slice(0, 4);
  while (ideas.length < 2 && pool[ideas.length]) {
    const s = pool[ideas.length];
    ideas.push({
      title: ideaTitle(s.text, ideas.length),
      body: tighten(s.text, 180),
    });
  }
  if (ideas.length < 2) {
    ideas.push({
      title: ideaTitle(thesis, ideas.length),
      body: tighten(thesis, 180),
    });
  }

  const insight =
    pool.find(
      (s) =>
        s.text.length >= 35 &&
        s.text.length <= 200 &&
        s.text !== thesis &&
        !ideas.some((i) => i.body.startsWith(s.text.slice(0, 40))),
    )?.text ||
    sentences.find((s) => s !== thesis && s.length >= 35 && s.length <= 180) ||
    tighten(thesis, 180);

  const quotes = pool.slice(0, 6).map((s) => s.text);
  const applyItems = buildApplyItems(body, ideas, thesis, quotes);
  const bank = buildBankQuestions(body, raw.number, thesis, ideas, applyItems, quotes);
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

function firstUsableLine(body: string): string {
  const lines = body
    .split(/\n+/)
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter((l) => l.length >= 40 && /[a-z]/.test(l));
  return lines[0] || body.replace(/\s+/g, " ").trim().slice(0, 220);
}

function extractSentences(body: string): string[] {
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
    .flatMap((para) =>
      para.split(/(?<=[.!?])\s+(?=[A-Z"“])/).flatMap((s) => {
        // Also split very long clauses on semicolons.
        if (s.length > 220 && s.includes(";")) return s.split(/;\s+/);
        return [s];
      }),
    );

  const out = parts
    .map((s) => s.trim())
    .filter((s) => {
      if (s.length < 28 || s.length > 320) return false;
      if (/^(chapter|part|table of contents|copyright|isbn)\b/i.test(s)) return false;
      if (/^\d+$/.test(s)) return false;
      if (isLikelyHeading(s) && s.length < 50) return false;
      const letters = (s.match(/[A-Za-z]/g) || []).length;
      return letters / s.length > 0.5;
    });

  // PDF fragments with no punctuation — treat long lines as sentences.
  if (out.length < 4) {
    for (const line of body.split("\n")) {
      const t = line.replace(/\s+/g, " ").trim();
      if (t.length >= 45 && t.length <= 280 && /[a-z]/.test(t) && !isLikelyHeading(t)) {
        if (!out.includes(t)) out.push(t);
      }
    }
  }

  return out;
}

function scoreSentence(s: string): number {
  let score = 1; // every real sentence starts usable
  if (/\byou\b|\byour\b|\bone\b|\bman\b|\bhuman\b/i.test(s)) score += 2;
  if (
    /\b(must|should|need to|decide|commit|practice|change|create|build|choose|stop|start|mean|matter|meaning|purpose|freedom|suffer|attitude|responsib|hope|love|choice|will to)\b/i.test(
      s,
    )
  ) {
    score += 4;
  }
  if (/\bis not\b|\brather than\b|\binstead\b|\bbecause\b|\beven\b/i.test(s)) {
    score += 2;
  }
  if (/[.]$/.test(s) && s.length >= 45 && s.length <= 200) score += 2;
  if (/\?$/.test(s)) score += 1;
  if (/^(figure|table|photo|illustration|page|chapter|part)\b/i.test(s)) score -= 6;
  if (s.split(/\s+/).length < 7) score -= 2;
  if (/^[A-Z\s]{10,}$/.test(s)) score -= 4;
  return score;
}

function pickThesis(
  sentences: string[],
  scored: { text: string; score: number }[],
): string {
  const early = sentences.slice(0, 8).map((text, i) => ({
    text,
    score: scoreSentence(text) + (4 - Math.min(i, 4)),
  }));
  const pool = [...early, ...scored.slice(0, 8)].sort((a, b) => b.score - a.score);
  const best = pool[0]?.text ?? "";
  if (/[A-Z]{5,}\s+[A-Z]{5,}/.test(best)) {
    return sentences.find((s) => !/[A-Z]{5,}\s+[A-Z]{5,}/.test(s)) ?? best;
  }
  return best;
}

function extractSectionIdeas(body: string): { title: string; body: string }[] {
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
    const under = extractSentences(para);
    const best =
      under.map((t) => ({ t, s: scoreSentence(t) })).sort((a, b) => b.s - a.s)[0]
        ?.t ?? para;
    ideas.push({
      title: titleCase(line).slice(0, 60),
      body: tighten(best, 220),
    });
  }
  return ideas;
}

function ideaTitle(sentence: string, index: number): string {
  const cleaned = sentence.replace(/^[^A-Za-z]+/, "");
  const clause = cleaned.split(/[:,—–-]/)[0]?.trim() ?? cleaned;
  if (clause.length >= 12 && clause.length <= 52 && !/[.!?]$/.test(clause)) {
    return titleCase(clause);
  }
  const words = cleaned.split(/\s+/).slice(0, 7).join(" ");
  if (words.length >= 12) return titleCase(words.replace(/[.!?].*$/, ""));
  return `Idea ${index + 1}`;
}

function dedupeIdeas(
  ideas: { title: string; body: string }[],
): { title: string; body: string }[] {
  const out: { title: string; body: string }[] = [];
  for (const idea of ideas) {
    const key = idea.body.slice(0, 48).toLowerCase();
    if (out.some((o) => o.body.slice(0, 48).toLowerCase() === key)) continue;
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
  quotes: string[],
): string[] {
  const imperatives = extractImperatives(body).slice(0, 2);
  const items: string[] = [...imperatives];
  const q0 = quotes[0] ? shortenQuote(quotes[0], 90) : tighten(thesis, 90);

  if (ideas[0]) {
    items.push(
      `Where does “${ideas[0].title}” show up in your life this week? Write one concrete example.`,
    );
  }
  items.push(
    `Choose one first action (within 24 hours) that responds to: “${q0}”`,
  );
  items.push(
    `Name what you cannot change here — and the attitude or meaning you can still choose.`,
  );

  return [...new Set(items.map((s) => clampText(s, 240)))].slice(0, 4);
}

function extractImperatives(body: string): string[] {
  const sentences = extractSentences(body);
  const out: string[] = [];
  for (const s of sentences) {
    if (s.length > 180 || s.length < 28) continue;
    if (
      /^(do|make|take|write|list|choose|set|stop|start|practice|ask|notice|schedule|commit|decide|create|build|put|keep|pick|name|reduce|attach|treat|adjust|accept|seek|find)\b/i.test(
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
  quotes: string[],
): BankQuestion[] {
  const extracted = extractQuestions(body);
  const q1 = shortenQuote(quotes[0] || thesis, 100);
  const q2 = shortenQuote(quotes[1] || ideas[0]?.body || thesis, 90);
  const generated = [
    `What does this section claim about human experience: “${q1}”?`,
    `Where does “${ideas[0]?.title ?? "this idea"}” show up in my life right now?`,
    `What suffering or friction am I facing that this text speaks to?`,
    `If I took seriously “${q2}”, what would I do differently this week?`,
    `What meaning or purpose can I choose in a situation I cannot fully control?`,
    applyItems[0]
      ? `Did I follow through on: ${applyItems[0].replace(/\?$/, "")}?`
      : "What first action will I take within 24 hours?",
    ideas[1]
      ? `How could I practice “${ideas[1].title}” in a small way today?`
      : "What would living this idea look like on an ordinary day?",
    "What evidence would show me I am changing — not only intending to?",
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
      prompt: "How consistently did I live this section’s main idea this week?",
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
      prompt: "How clear is the meaning or next action I choose from this section?",
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
  const out: string[] = [];
  for (const line of body.split("\n").map((l) => l.replace(/\s+/g, " ").trim())) {
    if (!line.includes("?")) continue;
    if (line.length < 16 || line.length > 180) continue;
    const q = line.replace(/^[\d.)\-•]+\s*/, "");
    if (!out.includes(q)) out.push(q);
  }
  for (const s of extractSentences(body)) {
    if (s.endsWith("?") && s.length >= 16 && s.length <= 180 && !out.includes(s)) {
      out.push(s);
    }
  }
  return out;
}

function shortenQuote(value: string, max: number): string {
  const s = tighten(value, max).replace(/^["“]|["”]$/g, "");
  return s;
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
  const at = Math.max(
    cut.lastIndexOf(". "),
    cut.lastIndexOf("; "),
    cut.lastIndexOf(", "),
  );
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
