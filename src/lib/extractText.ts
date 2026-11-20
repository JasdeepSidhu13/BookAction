import { LIMITS } from "@/lib/limits";
import { cleanPdfText } from "@/lib/pdfClean";

export async function extractTextFromUpload(
  file: File,
): Promise<{ text: string; kind: "pdf" | "text" }> {
  if (file.size > LIMITS.uploadBytes) {
    throw new Error("file_too_large");
  }
  const name = file.name.toLowerCase();
  const type = (file.type || "").toLowerCase();

  if (
    name.endsWith(".txt") ||
    name.endsWith(".md") ||
    type.startsWith("text/")
  ) {
    const text = await file.text();
    return { text: clampSource(text, false), kind: "text" };
  }

  const looksPdf =
    name.endsWith(".pdf") ||
    type === "application/pdf" ||
    type === "application/x-pdf";

  if (looksPdf) {
    const buffer = Buffer.from(await file.arrayBuffer());
    // Import the implementation directly so Next/webpack never runs pdf-parse's debug harness.
    const mod = await import("pdf-parse/lib/pdf-parse.js");
    const pdfParse = (mod.default ?? mod) as (
      data: Buffer,
    ) => Promise<{ text?: string }>;
    const parsed = await pdfParse(buffer);
    const text = (parsed.text || "").trim();
    if (!text) throw new Error("empty_text");
    return { text: clampSource(text, true), kind: "pdf" };
  }

  throw new Error("unsupported_type");
}

function clampSource(text: string, fromPdf: boolean): string {
  const cleaned = (fromPdf ? cleanPdfText(text) : text.replace(/\r/g, "").replace(/\u0000/g, ""))
    .trim();
  if (!cleaned) throw new Error("empty_text");
  if (cleaned.length > LIMITS.uploadChars) {
    return cleaned.slice(0, LIMITS.uploadChars);
  }
  return cleaned;
}
