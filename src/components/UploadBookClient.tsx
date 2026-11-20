"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type Props = {
  viewerName: string;
  simulated: boolean;
  verified: boolean;
  serverHasOpenAiKey: boolean;
};

export function UploadBookClient({
  viewerName,
  simulated,
  verified,
  serverHasOpenAiKey,
}: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [mode, setMode] = useState<"ai" | "heuristic">("ai");
  const [visitorKey, setVisitorKey] = useState("");
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
    if (mode === "ai" && !serverHasOpenAiKey && !visitorKey.trim()) {
      setStatus("Add an OpenAI API key below, or switch to Fast local extract.");
      return;
    }
    setBusy(true);
    setStatus(
      mode === "ai"
        ? "Reading PDF and generating chapter summaries with AI…"
        : "Reading PDF and extracting with the local heuristic…",
    );
    setResult(null);
    try {
      const body = new FormData();
      body.set("file", file);
      body.set("mode", mode === "ai" ? "ai" : "heuristic");
      if (title.trim()) body.set("title", title.trim());
      if (author.trim()) body.set("author", author.trim());
      if (mode === "ai" && !serverHasOpenAiKey && visitorKey.trim()) {
        body.set("openaiApiKey", visitorKey.trim());
      }
      const res = await fetch("/api/books/upload", { method: "POST", body });
      const rawText = await res.text();
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
        data = rawText ? (JSON.parse(rawText) as typeof data) : {};
      } catch {
        // Host gateways often return HTML 502/504 when AI extract exceeds the limit.
        setStatus(
          res.status === 502 || res.status === 504 || res.status === 524
            ? "Upload timed out. Try Fast local extract, or a shorter PDF."
            : "Upload failed — the server returned an unexpected response. Try Fast local extract.",
        );
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
        data.book.generationMode === "llm"
          ? `AI extracted ${data.book.chapterCount} chapters with summaries and action questions.`
          : `Extracted ${data.book.chapterCount} chapters locally (heuristic).`,
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
          Prefer AI extraction for faithful summaries (OpenAI). Anyone signed into this
          app can use the owner’s bound key, or paste their own key for this upload only —
          it is never stored. Saved privately for {viewerName}.
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

        <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
          <legend className="px-0 text-[13px] font-medium text-muted">Extraction</legend>
          <label className="flex cursor-pointer items-start gap-3 rounded-[14px] border border-line p-3.5">
            <input
              type="radio"
              name="mode"
              checked={mode === "ai"}
              onChange={() => setMode("ai")}
              className="mt-1"
            />
            <span className="flex flex-col gap-0.5">
              <span className="text-[15px] font-semibold text-ink">AI extract (recommended)</span>
              <span className="text-[13px] text-soft">
                OpenAI drafts big idea, key ideas, apply steps, and questions from the text.
                {serverHasOpenAiKey
                  ? " This app already has a key configured."
                  : " Paste your OpenAI key below for this upload."}
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-[14px] border border-line p-3.5">
            <input
              type="radio"
              name="mode"
              checked={mode === "heuristic"}
              onChange={() => setMode("heuristic")}
              className="mt-1"
            />
            <span className="flex flex-col gap-0.5">
              <span className="text-[15px] font-semibold text-ink">Fast local extract</span>
              <span className="text-[13px] text-soft">
                No API call. Splits into chapters/sections with heuristic summaries.
              </span>
            </span>
          </label>
        </fieldset>

        {mode === "ai" && !serverHasOpenAiKey ? (
          <label className="flex flex-col gap-1.5 text-[13px] font-medium text-muted">
            Your OpenAI API key (this upload only)
            <input
              type="password"
              autoComplete="off"
              value={visitorKey}
              onChange={(e) => setVisitorKey(e.target.value)}
              className="h-11 rounded-chip border border-line2 bg-white px-4 text-sm text-ink"
              placeholder="sk-…"
            />
            <span className="text-[12px] font-normal text-muted">
              Sent once with this upload, never saved. Or ask the app owner to bind{" "}
              <code className="text-ink">OPENAI_API_KEY</code> in Secrets.
            </span>
          </label>
        ) : null}

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
          {busy
            ? mode === "ai"
              ? "AI extracting…"
              : "Extracting…"
            : mode === "ai"
              ? "Upload & AI extract"
              : "Upload & extract locally"}
        </button>

        {status ? <p className="m-0 text-sm text-soft">{status}</p> : null}
        {result ? (
          <p className="m-0 text-sm font-medium text-ink">
            Ready: {result.title} · {result.chapterCount} chapters ·{" "}
            {result.generationMode === "llm" ? "AI" : "local"}.{" "}
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
        <h2 className="m-0 font-display text-xl font-bold">Who can use AI extract?</h2>
        <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-[1.55] text-soft">
          <li>
            <strong className="font-semibold text-ink">You (with Cursor):</strong> bind{" "}
            <code className="text-ink">OPENAI_API_KEY</code> once in app Secrets — every
            signed-in visitor then gets AI quality without pasting a key.
          </li>
          <li>
            <strong className="font-semibold text-ink">Another Cursor user:</strong> sign in
            to this Private/Team app and upload; they share your bound key, or paste their own.
          </li>
          <li>
            <strong className="font-semibold text-ink">Someone without Cursor:</strong> Cursor
            Private/Team apps require Cursor sign-in. They can create a free Cursor account to
            open the app, or paste their own OpenAI key after you invite them. Talking to an
            agent in chat is only for you during builds — the live app uses OpenAI (or local
            extract) instead.
          </li>
        </ul>
        {!verified && !simulated ? (
          <p className="m-0 text-sm text-amber-ink">
            Publish Chapterwise as Private or Team, then reopen it while signed into
            Cursor so uploads stay tied to your account.
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
    case "ai_key_required":
      return "AI extract needs an OpenAI key — paste yours, or bind OPENAI_API_KEY in Secrets.";
    case "ai_extract_failed":
      return "AI extract failed (key, quota, or model). Check the key or try Fast local extract.";
    case "ai_timeout":
      return "AI extract took too long. Try Fast local extract, or a shorter PDF.";
    default:
      return code
        ? `Upload failed (${code}). Try again with a PDF under 12 MB.`
        : "Upload failed. Please try again with a PDF.";
  }
}
