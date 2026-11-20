import { NextResponse } from "next/server";
import { extractTextFromUpload } from "@/lib/extractText";
import {
  generateBookFromText,
  newUserBookId,
  persistGeneratedBook,
} from "@/lib/generateBook";
import { LIMITS, clampText } from "@/lib/limits";
import { resolveOpenAiKey, serverHasOpenAiKey } from "@/lib/llmExtract";
import { allowRequest } from "@/lib/rateLimit";
import { requireIdentity } from "../../../../../cursor/identity";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function POST(request: Request) {
  const identity = await requireIdentity(request);
  if (identity instanceof Response) return identity;
  if (identity.kind === "key") {
    return NextResponse.json({ error: "person_required" }, { status: 403 });
  }

  if (!allowRequest(`upload:${identity.sub}`, LIMITS.uploadsPerHour, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await formDataSafe(request);
  } catch {
    return NextResponse.json({ error: "invalid_form" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file_required" }, { status: 400 });
  }
  if (file.size <= 0) {
    return NextResponse.json({ error: "empty_file" }, { status: 400 });
  }
  if (file.size > LIMITS.uploadBytes) {
    return NextResponse.json(
      { error: "file_too_large", maxBytes: LIMITS.uploadBytes },
      { status: 413 },
    );
  }

  const titleHint = clampText(String(form.get("title") ?? ""), LIMITS.bookTitle);
  const authorHint = clampText(String(form.get("author") ?? ""), LIMITS.bookAuthor);
  const modeRaw = String(form.get("mode") ?? "auto").toLowerCase();
  const preferLlm = modeRaw !== "heuristic";
  // Visitor-supplied key is request-scoped only — never logged or persisted.
  const visitorKey = String(form.get("openaiApiKey") ?? "");

  if (preferLlm && modeRaw === "ai") {
    const key = resolveOpenAiKey(visitorKey);
    if (!key) {
      return NextResponse.json(
        {
          error: "ai_key_required",
          serverHasKey: serverHasOpenAiKey(),
        },
        { status: 400 },
      );
    }
  }

  try {
    const { text, kind } = await extractTextFromUpload(file);
    const generated = await generateBookFromText({
      text,
      filename: file.name,
      titleHint: titleHint || undefined,
      authorHint: authorHint || undefined,
      preferLlm,
      openAiApiKey: visitorKey || null,
    });

    if (modeRaw === "ai" && generated.mode !== "llm") {
      return NextResponse.json(
        { error: "ai_extract_failed", serverHasKey: serverHasOpenAiKey() },
        { status: 502 },
      );
    }

    const bookId = newUserBookId(identity.sub, generated.title);
    await persistGeneratedBook({
      ownerSub: identity.sub,
      bookId,
      filename: file.name,
      bytes: file.size,
      generated,
    });

    return NextResponse.json(
      {
        book: {
          id: bookId,
          title: generated.title,
          author: generated.author,
          chapterCount: generated.chapters.length,
          generationMode: generated.mode,
          sourceKind: kind,
          firstChapterId: generated.chapters[0]?.id,
        },
      },
      { headers: { "cache-control": "private, no-store" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "upload_failed";
    // Never include request secrets in logs.
    console.error("book_upload_failed", message);
    const status =
      message === "file_too_large"
        ? 413
        : message === "unsupported_type" ||
            message === "empty_text" ||
            message === "no_chapters_found" ||
            message === "book_id_conflict"
          ? 400
          : 500;
    return NextResponse.json({ error: message, detail: message }, { status });
  }
}

async function formDataSafe(request: Request): Promise<FormData> {
  return request.formData();
}
