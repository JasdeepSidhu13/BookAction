import { NextResponse } from "next/server";
import { extractTextFromUpload } from "@/lib/extractText";
import { generateBookFromText, persistGeneratedBook } from "@/lib/generateBook";
import { LIMITS, clampText } from "@/lib/limits";
import { requireIdentity } from "../../../../../cursor/identity";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

export async function POST(request: Request) {
  const identity = await requireIdentity(request);
  if (identity instanceof Response) return identity;
  if (identity.kind === "key") {
    return NextResponse.json({ error: "person_required" }, { status: 403 });
  }

  let form: FormData;
  try {
    form = await request.formData();
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
  const useLlm =
    String(form.get("useLlm") ?? "").toLowerCase() === "true" ||
    String(form.get("useLlm") ?? "") === "1" ||
    String(form.get("useLlm") ?? "") === "on";

  try {
    const { text, kind } = await extractTextFromUpload(file);
    const generated = await generateBookFromText({
      text,
      filename: file.name,
      titleHint: titleHint || undefined,
      authorHint: authorHint || undefined,
      useLlm,
    });

    const base = slugify(generated.title) || "uploaded-book";
    const bookId = `user-${base}-${Date.now().toString(36)}`;
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
    console.error("book_upload_failed", message, error);
    const status =
      message === "file_too_large"
        ? 413
        : message === "unsupported_type" ||
            message === "empty_text" ||
            message === "no_chapters_found"
          ? 400
          : 500;
    return NextResponse.json(
      { error: message, detail: message },
      { status },
    );
  }
}
