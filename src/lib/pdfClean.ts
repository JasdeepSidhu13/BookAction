/**
 * Normalize PDF-extracted text so chapter detection and summaries see prose,
 * not page chrome, soft wraps, or hyphenation artifacts.
 *
 * Avoids catastrophic multiline regexes and quadratic string rebuilds on
 * very large uploads (capped upstream by LIMITS.uploadChars).
 */
export function cleanPdfText(raw: string): string {
  let text = raw.replace(/\r\n?/g, "\n").replace(/\u0000/g, "").replace(/\f/g, "\n");

  // Soft hyphen / line-break hyphenation: "deci-\nsion" → "decision"
  text = text.replace(/([A-Za-z])-\n([a-z])/g, "$1$2");

  const lines = text.split("\n");
  const kept: string[] = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      kept.push("");
      continue;
    }
    // Standalone page numbers — line check, not a multiline regex over the whole doc.
    if (/^\d{1,4}$/.test(t)) continue;
    if (/oceanofpdf/i.test(t)) continue;
    if (/^https?:\/\//i.test(t) && t.length < 120) continue;
    if (/^(downloaded|free download|www\.)/i.test(t)) continue;
    if (/^man’s search for meaning$/i.test(t) && t.length < 40) continue;
    if (/^viktor e\.? frankl$/i.test(t)) continue;
    kept.push(t);
  }

  // Collapse runs of blank lines, then join soft wraps per paragraph.
  const paragraphs: string[] = [];
  let buf: string[] = [];
  const flush = () => {
    if (buf.length === 0) return;
    paragraphs.push(joinSoftWrapped(buf));
    buf = [];
  };
  for (const line of kept) {
    if (!line) flush();
    else buf.push(line);
  }
  flush();

  let joined = paragraphs.filter(Boolean).join("\n\n").trim();

  // Some PDFs have almost no blank lines — invent paragraph breaks at sentence ends.
  if (paragraphs.length < 8 && joined.length > 4000) {
    joined = inventParagraphs(joined);
  }

  return joined;
}

function inventParagraphs(text: string): string {
  const sentences = text
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z"“])/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (sentences.length < 10) return text;
  const parts: string[] = [];
  for (let i = 0; i < sentences.length; i += 4) {
    parts.push(sentences.slice(i, i + 4).join(" "));
  }
  return parts.join("\n\n");
}

function joinSoftWrapped(lines: string[]): string {
  if (lines.length === 0) return "";
  const out: string[] = [];
  let parts = [lines[0]];
  const flushBuf = () => {
    out.push(parts.join(" "));
    parts = [];
  };
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const buf = parts.join(" ");
    const prevEndsSentence = /[.!?"”')\]]$/.test(buf);
    const looksHeading =
      isLikelyHeading(line) || isLikelyHeading(buf) || isChapterLine(line);
    if (looksHeading || (prevEndsSentence && /^[A-Z0-9"“]/.test(line))) {
      flushBuf();
      parts = [line];
    } else {
      parts.push(line);
    }
  }
  if (parts.length) flushBuf();
  return out.join("\n");
}

export function isChapterLine(line: string): boolean {
  const t = line.trim();
  return (
    /^(chapter|part)\s+[\divxlc]/i.test(t) ||
    /^part\s+(one|two|three|four|five|i{1,3}|iv|v)\b/i.test(t)
  );
}

export function isLikelyHeading(line: string): boolean {
  const t = line.trim();
  if (t.length < 3 || t.length > 90) return false;
  if (t.includes("?") && t.length > 40) return false;
  const letters = t.replace(/[^A-Za-z]/g, "");
  if (letters.length < 3) return false;
  if (letters === letters.toUpperCase() && letters.length >= 4) return true;
  if (
    !/[.!;:]$/.test(t) &&
    t.length <= 80 &&
    /^[A-Z]/.test(t) &&
    t.split(/\s+/).length <= 12
  ) {
    const words = t.split(/\s+/);
    const capped = words.filter((w) => /^[A-Z]/.test(w)).length;
    if (capped / words.length >= 0.55) return true;
  }
  return false;
}

/** Strip copyright / dedication / index / notes when possible. */
export function stripFrontAndBackMatter(text: string): string {
  let body = text;
  const lower = body.toLowerCase();

  // Prefer the narrative body (after preface), not the table-of-contents hit.
  const campBody = lower.search(
    /(?:^|\n)\s*(?:i\s*\n+)?experiences\s+in\s+a\s*\n?\s*concentration\s+camp\b[\s\S]{0,120}this book does not claim/i,
  );
  const startCandidates = [
    campBody,
    [...lower.matchAll(/(?:^|\n)\s*(?:i\s*\n+)?experiences\s+in\s+a\s*\n?\s*concentration\s+camp\b/gi)].map(
      (m) => m.index ?? -1,
    ).filter((n) => n >= 4000)[0] ?? -1,
    lower.search(/(?:^|\n)\s*part\s+(one|1|i)\b/),
    lower.search(/(?:^|\n)\s*chapter\s+(one|1|i)\b/),
  ].filter((n) => n >= 0);
  if (startCandidates.length) {
    // Take the latest plausible front-matter cut so TOC hits are skipped.
    const start = Math.max(...startCandidates.filter((n) => n < body.length * 0.4));
    if (start >= 0) body = body.slice(start);
  } else if (body.length > 8000) {
    body = body.slice(Math.floor(body.length * 0.03));
  }

  const endCut = body.toLowerCase().search(
    /(?:^|\n)\s*(bibliography|references|index|about the author|notes\s*\n)/,
  );
  if (endCut > body.length * 0.55) {
    body = body.slice(0, endCut);
  } else if (body.length > 12_000) {
    body = body.slice(0, Math.floor(body.length * 0.97));
  }

  return body.trim();
}
