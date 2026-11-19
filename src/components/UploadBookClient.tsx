"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  viewerName: string;
  simulated: boolean;
  verified: boolean;
};

export function UploadBookClient({ viewerName, simulated, verified }: Props) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{
    id: string;
    title: string;
    chapterCount: number;
    generationMode: string;
    firstChapterId?: string;
  } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setStatus("Choose a PDF or text file first.");
      return;
    }
    setBusy(true);
    setStatus("Extracting chapters and generating summaries…");
    setResult(null);
    try {
      const body = new FormData();
      body.set("file", file);
      if (title.trim()) body.set("title", title.trim());
      if (author.trim()) body.set("author", author.trim());
      const res = await fetch("/api/books/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setStatus(errorMessage(data.error));
        setBusy(false);
        return;
      }
      setResult(data.book);
      setStatus(
        data.book.generationMode === "llm"
          ? "Generated with your OpenAI key."
          : "Generated with the built-in extractor (add OPENAI_API_KEY for richer summaries).",
      );
      setBusy(false);
      if (data.book.firstChapterId) {
        router.push(`/books/${data.book.id}/chapters/${data.book.firstChapterId}`);
        router.refresh();
      }
    } catch {
      setStatus("Upload failed. Try a smaller PDF or a .txt export.");
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex max-w-[800px] flex-col gap-8 px-4 py-10 sm:px-8 sm:pb-20">
      <div className="flex flex-col gap-2">
        <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.08em] text-brand">
          Add a book
        </p>
        <h1 className="m-0 font-display text-4xl font-bold tracking-tight">
          Upload & generate
        </h1>
        <p className="m-0 text-[15px] leading-[1.6] text-soft">
          Upload a PDF or text file. Chapterwise extracts chapters, builds summaries, and creates
          Action + Question Bank prompts — saved privately to your Postgres library as{" "}
          {viewerName}.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-5 rounded-card border border-line bg-white p-6 sm:p-8"
      >
        <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[16px] border-[1.5px] border-dashed border-[#C9C8C1] bg-canvas px-6 py-10 text-center">
          <input
            type="file"
            accept=".pdf,.txt,.md,application/pdf,text/plain,text/markdown"
            className="sr-only"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <span className="font-display text-lg font-bold">
            {file ? file.name : "Drop a PDF or .txt here"}
          </span>
          <span className="text-sm text-muted">
            Max 12 MB · chapters are detected automatically
          </span>
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-[13px] font-medium text-muted">
            Title (optional)
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-chip border border-line2 bg-white px-4 text-sm text-ink"
              placeholder="Detected from the file if blank"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-[13px] font-medium text-muted">
            Author (optional)
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="h-11 rounded-chip border border-line2 bg-white px-4 text-sm text-ink"
              placeholder="Unknown if not found"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={busy || !file}
          className="inline-flex h-12 items-center justify-center rounded-chip bg-brand px-5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {busy ? "Generating…" : "Generate summaries & questions"}
        </button>

        {status ? <p className="m-0 text-sm text-soft">{status}</p> : null}
        {result ? (
          <p className="m-0 text-sm font-medium text-ink">
            Ready: {result.title} · {result.chapterCount} chapters.{" "}
            <Link
              href={`/books/${result.id}/chapters/${result.firstChapterId}`}
              className="text-brand"
            >
              Open first chapter →
            </Link>
          </p>
        ) : null}
      </form>

      <section className="flex flex-col gap-3 rounded-panel border border-line bg-white p-6">
        <h2 className="m-0 font-display text-xl font-bold">Where your data lives</h2>
        <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-[1.55] text-soft">
          <li>
            <strong className="font-semibold text-ink">Storage:</strong> your app’s private Postgres
            database (check-ins, answers, commitments, question-bank history, and uploaded book
            chapters). Catalog books ship in the app; uploads are per signed-in user.
          </li>
          <li>
            <strong className="font-semibold text-ink">Retrieval:</strong> Library, Check-ins,
            Question Bank, and Progress all read by your Cursor identity. Uploaded books appear
            beside catalog titles and support the same chapter → Action → Question Bank flow.
          </li>
          <li>
            <strong className="font-semibold text-ink">Insights:</strong> Progress aggregates scale
            trends, follow-through on commitments, streaks, chapter activity, and Question Bank
            answer volume as data accumulates — so summaries stay useful even after many check-ins.
          </li>
        </ul>
        {!verified && !simulated ? (
          <p className="m-0 text-sm text-amber-ink">
            Sign in on the published app so uploads stay tied to your account instead of a shared
            local guest.
          </p>
        ) : null}
      </section>
    </main>
  );
}

function errorMessage(code: string | undefined): string {
  switch (code) {
    case "file_too_large":
      return "File is too large (max 12 MB).";
    case "unsupported_type":
      return "Use a PDF or plain text file.";
    case "empty_text":
      return "Couldn’t extract text from that file.";
    case "no_chapters_found":
      return "No readable chapters found. Try a text export.";
    case "person_required":
      return "Sign in to upload a book.";
    default:
      return "Upload failed. Please try again.";
  }
}
