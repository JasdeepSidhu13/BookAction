import { LIMITS } from "@/lib/limits";

export async function extractTextFromUpload(
  file: File,
): Promise<{ text: string; kind: "pdf" | "text" }> {
  if (file.size > LIMITS.uploadBytes) {
    throw new Error("file_too_large");
  }
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();

  if (
    name.endsWith(".txt") ||
    name.endsWith(".md") ||
    type.startsWith("text/")
  ) {
    const text = await file.text();
    return { text: clampSource(text), kind: "text" };
  }

  if (name.endsWith(".pdf") || type === "application/pdf") {
    const buffer = Buffer.from(await file.arrayBuffer());
    // pdf-parse is CommonJS; dynamic import keeps the route light.
    const pdfParse = (await import("pdf-parse")).default as (
      data: Buffer,
    ) => Promise<{ text: string }>;
    const parsed = await pdfParse(buffer);
    return { text: clampSource(parsed.text || ""), kind: "pdf" };
  }

  throw new Error("unsupported_type");
}

function clampSource(text: string): string {
  const cleaned = text.replace(/\r/g, "").replace(/\u0000/g, "").trim();
  if (!cleaned) throw new Error("empty_text");
  if (cleaned.length > LIMITS.uploadChars) {
    return cleaned.slice(0, LIMITS.uploadChars);
  }
  return cleaned;
}
