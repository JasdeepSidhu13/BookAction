/**
 * Normalize PDF-extracted text so chapter detection and summaries see prose,
 * not page chrome, soft wraps, or hyphenation artifacts.
 */
export function cleanPdfText(raw: string): string {
  let text = raw.replace(/\r\n?/g, "\n").replace(/\u0000/g, "");

  // Soft hyphen / line-break hyphenation: "deci-\nsion" → "decision"
  text = text.replace(/([A-Za-z])-\n([a-z])/g, "$1$2");

  // Drop common pirate / watermark / running-header noise
  text = text
    .split("\n")
    .filter((line) => {
      const t = line.trim();
      if (!t) return true;
      if (/oceanofpdf/i.test(t)) return false;
      if (/^https?:\/\//i.test(t) && t.length < 120) return false;
      if (/^(downloaded|free download|www\.)/i.test(t)) return false;
      if (/^man’s search for meaning$/i.test(t) && t.length < 40) return false;
      if (/^viktor e\.? frankl$/i.test(t)) return false;
      return true;
    })
    .join("\n");

  // Remove standalone page numbers and form-feed junk
  text = text.replace(/^\s*\d{1,4}\s*$/gm, "");
  text = text.replace(/\f/g, "\n");

  // Collapse runs of blank lines
  text = text.replace(/\n{3,}/g, "\n\n");

  // Join soft-wrapped lines into paragraphs (keep blank-line paragraph breaks)
  const paragraphs = text.split(/\n{2,}/).map(joinSoftWrapped).filter(Boolean);
  let joined = paragraphs.join("\n\n").trim();

  // Some PDFs have almost no blank lines — invent paragraph breaks at sentence ends.
  if (paragraphs.length < 8 && joined.length > 4000) {
    joined = inventParagraphs(joined);
  }

  return joined;
}

function inventParagraphs(text: string): string {
  // Break every ~3–5 sentences into a paragraph-ish block.
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

function joinSoftWrapped(block: string): string {
  const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return "";

  const out: string[] = [];
  let buf = lines[0];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const prevEndsSentence = /[.!?"”')\]]$/.test(buf);
    const looksHeading =
      isLikelyHeading(line) || isLikelyHeading(buf) || isChapterLine(line);
    if (looksHeading || (prevEndsSentence && /^[A-Z0-9"“]/.test(line))) {
      out.push(buf);
      buf = line;
    } else {
      buf = `${buf} ${line}`.replace(/\s+/g, " ");
    }
  }
  out.push(buf);
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
  // ALL CAPS heading
  if (letters === letters.toUpperCase() && letters.length >= 4) return true;
  // Title Case short line without sentence end
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

  // Prefer starting at first major part/chapter marker after page 1 fluff.
  const startCandidates = [
    lower.search(/(?:^|\n)\s*part\s+(one|1|i)\b/),
    lower.search(/(?:^|\n)\s*chapter\s+(one|1|i)\b/),
    lower.search(/(?:^|\n)\s*experiences in a concentration camp\b/),
    lower.search(/(?:^|\n)\s*logotherapy\b/),
  ].filter((n) => n >= 0);
  if (startCandidates.length) {
    const start = Math.min(...startCandidates);
    // Keep a little preface if the marker is very late
    body = body.slice(start > 2500 ? start : Math.max(0, start));
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
