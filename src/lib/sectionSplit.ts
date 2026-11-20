import { LIMITS } from "@/lib/limits";
import {
  isChapterLine,
  isLikelyHeading,
  stripFrontAndBackMatter,
} from "@/lib/pdfClean";

export type RawChapter = { number: number; title: string; body: string };

type Hit = {
  index: number;
  number: number;
  title: string;
  style: "block" | "chapter" | "part" | "dotted" | "heading";
};

/**
 * Prefer real chapter/part markers; otherwise divide the book into 5–7
 * content sections with titles grounded in each section's text.
 */
export function splitChapters(text: string): RawChapter[] {
  const normalized = text.slice(0, LIMITS.uploadChars);
  const detected = detectMarkedChapters(normalized);

  if (detected.length >= 2 && chaptersLookUseful(detected)) {
    if (shouldSubdivide(detected)) {
      return divideIntoSections(normalized, 5, 7);
    }
    return detected.slice(0, LIMITS.maxChapters);
  }

  return divideIntoSections(normalized, 5, 7);
}

/** Frankl-style books: 1–3 huge parts, weak titles, or very long average chapter. */
function shouldSubdivide(chapters: RawChapter[]): boolean {
  if (chapters.length >= 5) return false;
  const words = chapters.map((c) => wordCount(c.body));
  const total = words.reduce((a, b) => a + b, 0);
  const avg = total / chapters.length;
  const weakTitles = chapters.filter((c) =>
    /^(untitled|part\s+\d+|section\s+\d+)$/i.test(c.title.trim()),
  ).length;

  // Only a couple of parts/markers → always slice into 5–7 for actionability.
  if (chapters.length <= 2 && total >= 250) return true;
  // Long narrative parts (avg chapter huge) even if titled well.
  if (chapters.length <= 4 && avg >= 2200) return true;
  // Weak titles with enough text to split.
  if (weakTitles >= Math.ceil(chapters.length / 2) && total >= 800) return true;
  return false;
}

function chaptersLookUseful(chapters: RawChapter[]): boolean {
  if (chapters.length < 2) return false;
  const avg = chapters.reduce((n, c) => n + c.body.length, 0) / chapters.length;
  if (avg < 400) return false;
  // Too many tiny "chapters" usually means TOC / list noise.
  const tiny = chapters.filter((c) => c.body.length < 350).length;
  if (tiny > chapters.length / 2) return false;
  return true;
}

function detectMarkedChapters(normalized: string): RawChapter[] {
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
      let rawSub = (partWord[2] || "").trim();
      if (rawSub.length < 4) {
        let j = i + 1;
        while (j < lines.length && !lines[j].trim()) j += 1;
        const next = lines[j]?.trim() ?? "";
        if (
          next &&
          !isChapterLine(next) &&
          next.length >= 4 &&
          next.length <= 90 &&
          !/[.!?]$/.test(next)
        ) {
          rawSub = next;
        }
      }
      const title =
        rawSub.length >= 4 ? cleanTitle(rawSub) : `Part ${number}`;
      if (number >= 1 && number <= 20) {
        hits.push({ index, number, title, style: "part" });
      }
      continue;
    }

    // Named major sections without "Chapter" (common in Frankl editions).
    if (
      !inToc &&
      /^(experiences in a concentration camp|logotherapy in a nutshell|the case for a tragic optimism|postscript|preface|foreword)\b/i.test(
        line,
      )
    ) {
      hits.push({
        index,
        number: hits.length + 1,
        title: cleanTitle(line),
        style: "heading",
      });
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
  if (unique.length < 2) {
    unique = headingBasedChapters(normalized, tocEnd).slice(0, LIMITS.maxChapters);
  }
  if (unique.length < 2) return [];

  return unique.map((hit, i) => {
    const end = i + 1 < unique.length ? unique[i + 1].index : normalized.length;
    let body = normalized.slice(hit.index, end).trim();
    body = stripLeadingTitle(body, hit.title);
    return {
      number: i + 1,
      title: hit.title,
      body: body.slice(0, LIMITS.chapterSourceChars * 3),
    };
  });
}

/** Divide book text into 5–7 grounded sections when chapter markers are missing/weak. */
export function divideIntoSections(
  text: string,
  minSections = 5,
  maxSections = 7,
): RawChapter[] {
  const body = stripFrontAndBackMatter(text).slice(0, LIMITS.uploadChars);
  const units = contentUnits(body);
  if (units.length === 0) {
    throw new Error("no_chapters_found");
  }

  const words = body.split(/\s+/).filter(Boolean).length;
  // Aim ~1 section per ~2–3k words, clamped to 5–7.
  const byWords = Math.round(words / 2500);
  const n = Math.min(maxSections, Math.max(minSections, byWords || minSections));

  const chunks = distributeUnits(units, n);
  return chunks.map((chunk, i) => {
    const chunkBody = chunk.join("\n\n").trim().slice(0, LIMITS.chapterSourceChars * 3);
    return {
      number: i + 1,
      title: titleFromChunk(chunkBody, i + 1),
      body: chunkBody,
    };
  });
}

function contentUnits(body: string): string[] {
  let paras = body
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter((p) => p.length > 50);

  if (paras.length < 12) {
    // Sentence windows when the PDF has almost no paragraph structure.
    const sentences = body
      .replace(/\n+/g, " ")
      .replace(/\s+/g, " ")
      .split(/(?<=[.!?])\s+(?=[A-Z"“])/)
      .map((s) => s.trim())
      .filter((s) => s.length > 40);
    paras = [];
    for (let i = 0; i < sentences.length; i += 3) {
      paras.push(sentences.slice(i, i + 3).join(" "));
    }
  }

  return paras.filter((p) => {
    if (/^(table of contents|contents|copyright|isbn|index)\b/i.test(p)) return false;
    const letters = (p.match(/[A-Za-z]/g) || []).length;
    return letters / p.length > 0.5;
  });
}

function distributeUnits(units: string[], n: number): string[][] {
  const chunks: string[][] = Array.from({ length: n }, () => []);
  const total = units.reduce((s, u) => s + u.length, 0);
  const target = total / n;
  let idx = 0;
  let filled = 0;
  for (let i = 0; i < units.length; i++) {
    chunks[idx].push(units[i]);
    filled += units[i].length;
    const remainingUnits = units.length - i - 1;
    const remainingChunks = n - idx - 1;
    if (
      idx < n - 1 &&
      remainingChunks > 0 &&
      (filled >= target || remainingUnits <= remainingChunks)
    ) {
      idx += 1;
      filled = 0;
    }
  }
  return chunks.filter((c) => c.length > 0);
}

function titleFromChunk(body: string, n: number): string {
  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
  for (const line of lines.slice(0, 8)) {
    if (isChapterLine(line)) continue;
    if (/^part\s+/i.test(line)) continue;
    if (isLikelyHeading(line) && line.length >= 6 && line.length <= 70) {
      return cleanTitle(line);
    }
  }

  const first = body
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .find((s) => s.length > 45 && s.length < 160 && /[a-z]/.test(s));
  if (first) {
    const words = first.split(/\s+/).slice(0, 8).join(" ");
    const fromSentence = titleCase(words.replace(/[.!?].*$/, ""));
    if (fromSentence.length >= 12) return fromSentence;
  }

  const theme = dominantTheme(body);
  if (theme && theme.split(/\s+/).length >= 2) return theme;
  if (theme) return `${theme} (${n})`;

  return `Section ${n}`;
}

const STOP = new Set(
  `a an the and or but if as at by for from in into of on onto to with without than then so such that this these those it its he she they we you your our their is are was were be been being have has had do does did can could should would will may might must about over under again further then once here there when where why how all any both each few more most other some such no nor not only own same so too very just also into across after before during without within between through against among`.split(
    /\s+/,
  ),
);

function dominantTheme(body: string): string {
  const words = body
    .toLowerCase()
    .replace(/[^a-z\s'-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 5 && !STOP.has(w));
  const freq = new Map<string, number>();
  for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1);
  const top = [...freq.entries()]
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([w]) => w);
  if (top.length === 0) return "";
  // Prefer meaningful theme words.
  const meaningful = top.find((w) =>
    /meaning|purpose|freedom|suffer|hope|love|choice|responsib|attitud|camp|prison|life|death|work|faith|spirit|logotherap|tragic|optim/i.test(
      w,
    ),
  );
  const head = meaningful ?? top[0];
  const second = top.find((w) => w !== head);
  if (second && /meaning|purpose|freedom|suffer|hope|love|choice|life/i.test(second)) {
    return titleCase(`${head} and ${second}`);
  }
  return titleCase(head);
}

function estimateTocEnd(text: string): number {
  const lower = text.slice(0, 40_000).toLowerCase();
  const tocIdx = lower.search(
    /(?:^|\n)\s*(table of contents|contents|toc)\s*(?:\n|$)/,
  );
  if (tocIdx < 0) return 0;

  const window = text.slice(tocIdx, tocIdx + 25_000);
  const chapterHits = [...window.matchAll(/(?:^|\n)\s*chapter\s+\d+/gi)];
  if (chapterHits.length < 3) return tocIdx + 500;

  let last = chapterHits[0].index ?? 0;
  for (let i = 1; i < chapterHits.length; i++) {
    const at = chapterHits[i].index ?? 0;
    if (at - last > 1200 && i >= 3) return tocIdx + at;
    last = at;
  }
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

  // Heading-style hits may not be numbered sequentially — keep index order.
  const headings = hits
    .filter((h) => h.style === "heading" || h.style === "part")
    .sort((a, b) => a.index - b.index);
  if (headings.length >= 2) {
    const spaced: Hit[] = [];
    for (const hit of headings) {
      const prev = spaced[spaced.length - 1];
      if (!prev || hit.index - prev.index >= 500) {
        spaced.push({ ...hit, number: spaced.length + 1 });
      }
    }
    if (spaced.length >= chosen.length) return spaced;
  }

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

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
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
