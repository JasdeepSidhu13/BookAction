"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type Props = {
  viewerName: string;
  simulated: boolean;
  verified: boolean;
};

export function UploadBookClient({ viewerName, simulated, verified }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{
    id: string;
    title: string;
    chapterCount: number;
    generationMode: string;
    firstChapterId?: string;
  } | null>(null);

  function pickFile(next: File | null | undefined) {
    if (!next) return;
    const name = next.name.toLowerCase();
    const type = (next.type || "").toLowerCase();
    const ok =
      name.endsWith(".pdf") ||
      name.endsWith(".txt") ||
      name.endsWith(".md") ||
      type === "application/pdf" ||
      type.startsWith("text/");
    if (!ok) {
      setStatus("Please choose a PDF or plain text (.txt) file.");
      setFile(null);
      return;
    }
    setFile(next);
    setStatus(`Selected: ${next.name} (${formatBytes(next.size)})`);
    setResult(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setStatus("Choose a PDF first, then click Generate.");
      inputRef.current?.click();
      return;
    }
    setBusy(true);
    setStatus("Reading PDF and extracting chapter summaries + action questions…");
    setResult(null);
    try {
      const body = new FormData();
      body.set("file", file);
      if (title.trim()) body.set("title", title.trim());
      if (author.trim()) body.set("author", author.trim());
      const res = await fetch("/api/books/upload", { method: "POST", body });
      let data: {
        error?: string;
        detail?: string;
        book?: {
          id: string;
          title: string;
          chapterCount: number;
          generationMode: string;
          firstChapterId?: string;
        };
      } = {};
      try {
        data = await res.json();
      } catch {
        setStatus("Upload failed — the server returned an unexpected response.");
        setBusy(false);
        return;
      }
      if (!res.ok || !data.book) {
        setStatus(errorMessage(data.error || data.detail));
        setBusy(false);
        return;
      }
      setResult(data.book);
      setStatus(
        `Extracted ${data.book.chapterCount} chapters with summaries and action questions.`,
      );
      setBusy(false);
      if (data.book.firstChapterId) {
        router.push(`/books/${data.book.id}/chapters/${data.book.firstChapterId}`);
        router.refresh();
      }
    } catch {
      setStatus("Upload failed. Try a smaller PDF, or export the book as .txt.");
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
          Upload a PDF
        </h1>
        <p className="m-0 text-[15px] leading-[1.6] text-soft">
          Upload any book PDF. Chapterwise extracts chapters, builds a summary for each, and creates
          Action check-in + Question Bank prompts — no OpenAI call required. Saved privately for{" "}
          {viewerName}.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-5 rounded-card border border-line bg-white p-6 sm:p-8"
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf,text/plain,.txt,.md"
          className="sr-only"
          onChange={(e) => pickFile(e.target.files?.[0])}
        />

        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onClick={() => inputRef.current?.click()}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragOver(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            pickFile(e.dataTransfer.files?.[0]);
          }}
          className={`flex flex-col items-center justify-center gap-3 rounded-[16px] border-[1.5px] border-dashed px-6 py-10 text-center ${
            dragOver ? "border-brand bg-brand-soft" : "border-[#C9C8C1] bg-canvas"
          }`}
        >
          <span className="font-display text-lg font-bold">
            {file ? file.name : "Drop a PDF here, or choose one"}
          </span>
          <span className="text-sm text-muted">
            Any book PDF · also accepts .txt · max 12 MB
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
            className="mt-1 inline-flex h-11 items-center rounded-chip bg-ink px-5 text-sm font-semibold text-white"
          >
            Choose PDF…
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-[13px] font-medium text-muted">
            Title (optional)
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-chip border border-line2 bg-white px-4 text-sm text-ink"
              placeholder="Detected from the PDF if blank"
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
          {busy ? "Extracting summaries & actions…" : "Upload PDF & extract"}
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
        <h2 className="m-0 font-display text-xl font-bold">What gets extracted</h2>
        <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-[1.55] text-soft">
          <li>
            <strong className="font-semibold text-ink">Summary:</strong> big idea, key ideas, insight,
            and apply-it steps per chapter.
          </li>
          <li>
            <strong className="font-semibold text-ink">Actions:</strong> recurring check-in questions
            plus a full Question Bank (including questions found in the PDF when present).
          </li>
          <li>
            <strong className="font-semibold text-ink">Storage:</strong> saved in your private Postgres
            library under your Cursor identity for Progress insights over time.
          </li>
        </ul>
        {!verified && !simulated ? (
          <p className="m-0 text-sm text-amber-ink">
            Sign in on the published app so uploads stay tied to your account.
          </p>
        ) : null}
      </section>
    </main>
  );
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function errorMessage(code: string | undefined): string {
  switch (code) {
    case "file_too_large":
      return "File is too large (max 12 MB).";
    case "unsupported_type":
      return "Please upload a PDF (or .txt) file.";
    case "empty_text":
      return "Couldn’t extract text from that PDF. Try another export or a .txt file.";
    case "no_chapters_found":
      return "No readable chapters found in that file.";
    case "person_required":
      return "Sign in to upload a book.";
    case "file_required":
      return "Choose a PDF file first.";
    case "rate_limited":
      return "Too many uploads this hour. Try again later.";
    default:
      return code
        ? `Upload failed (${code}). Try again with a PDF under 12 MB.`
        : "Upload failed. Please try again with a PDF.";
  }
}
