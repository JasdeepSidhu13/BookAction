/**
 * Normalize PDF-extracted text so chapter detection and summaries see prose,
 * not page chrome, soft wraps, or hyphenation artifacts.
 */
export function cleanPdfText(raw: string): string {
  let text = raw.replace(/\r\n?/g, "\n").replace(/\u0000/g, "");

  // Soft hyphen / line-break hyphenation: "deci-\nsion" → "decision"
  text = text.replace(/([A-Za-z])-\n([a-z])/g, "$1$2");

  // Drop common pirate / watermark lines
  text = text
    .split("\n")
    .filter((line) => {
      const t = line.trim();
      if (!t) return true;
      if (/oceanofpdf/i.test(t)) return false;
      if (/^https?:\/\//i.test(t) && t.length < 120) return false;
      if (/^(downloaded|free download|www\.)/i.test(t)) return false;
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
  return paragraphs.join("\n\n").trim();
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
  return /^(chapter|part)\s+[\divxlc]/i.test(line.trim());
}

export function isLikelyHeading(line: string): boolean {
  const t = line.trim();
  if (t.length < 3 || t.length > 80) return false;
  if (t.includes("?") && t.length > 40) return false;
  const letters = t.replace(/[^A-Za-z]/g, "");
  if (letters.length < 3) return false;
  // ALL CAPS heading
  if (letters === letters.toUpperCase() && letters.length >= 4) return true;
  // Title Case short line without sentence end
  if (
    !/[.!;:]$/.test(t) &&
    t.length <= 70 &&
    /^[A-Z]/.test(t) &&
    t.split(/\s+/).length <= 10 &&
    !/^(the|a|an|and|but|or|if|when|as|to|of|in|on|for)\s/i.test(t)
  ) {
    const words = t.split(/\s+/);
    const capped = words.filter((w) => /^[A-Z]/.test(w)).length;
    if (capped / words.length >= 0.6) return true;
  }
  return false;
}
