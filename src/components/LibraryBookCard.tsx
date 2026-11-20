"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { BookCover } from "@/components/BookCover";

type Props = {
  id: string;
  title: string;
  author: string;
  coverAccent: string;
  chapterCount: number;
  firstChapterId: string;
  canDelete: boolean;
  editionLabel?: string;
  /** When set, show Essentials/Complete switcher under the card. */
  editionSwitch?: {
    essentials: { bookId: string; firstChapterId: string };
    complete: { bookId: string; firstChapterId: string };
  };
};

export function LibraryBookCard({
  id,
  title,
  author,
  coverAccent,
  chapterCount,
  firstChapterId,
  canDelete,
  editionLabel,
  editionSwitch,
}: Props) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (confirmOpen && !dialog.open) dialog.showModal();
    if (!confirmOpen && dialog.open) dialog.close();
  }, [confirmOpen]);

  async function confirmDelete() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/books/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(
          data.error === "not_found"
            ? "That book can’t be deleted (starter books stay in the catalog)."
            : "Couldn’t delete the book. Try again.",
        );
        setBusy(false);
        return;
      }
      setConfirmOpen(false);
      router.refresh();
    } catch {
      setError("Couldn’t delete the book. Try again.");
      setBusy(false);
    }
  }

  const currentIsEssentials = editionSwitch
    ? id === editionSwitch.essentials.bookId
    : true;

  return (
    <div className="flex flex-col gap-3">
      <Link
        href={`/books/${id}/chapters/${firstChapterId}`}
        className="flex flex-col gap-3 text-ink no-underline"
      >
        <BookCover title={title} author={author} accent={coverAccent} />
        <span className="flex flex-col gap-1">
          <span className="text-[15px] font-semibold">{title}</span>
          <span className="text-[13px] text-muted">
            {editionLabel
              ? editionLabel
              : `In progress · ${chapterCount} chapters ready`}
          </span>
        </span>
      </Link>
      {editionSwitch ? (
        <div
          className="inline-flex gap-1 rounded-control bg-track p-1"
          role="group"
          aria-label={`${title} edition`}
        >
          <Link
            href={`/books/${editionSwitch.essentials.bookId}/chapters/${editionSwitch.essentials.firstChapterId}`}
            aria-current={currentIsEssentials ? "page" : undefined}
            className={
              currentIsEssentials
                ? "inline-flex h-8 flex-1 items-center justify-center rounded-[8px] bg-white px-2 text-center text-[11px] font-semibold text-ink no-underline shadow-tab"
                : "inline-flex h-8 flex-1 items-center justify-center rounded-[8px] px-2 text-center text-[11px] font-medium text-soft no-underline"
            }
          >
            Essentials · 10
          </Link>
          <Link
            href={`/books/${editionSwitch.complete.bookId}/chapters/${editionSwitch.complete.firstChapterId}`}
            aria-current={!currentIsEssentials ? "page" : undefined}
            className={
              !currentIsEssentials
                ? "inline-flex h-8 flex-1 items-center justify-center rounded-[8px] bg-white px-2 text-center text-[11px] font-semibold text-ink no-underline shadow-tab"
                : "inline-flex h-8 flex-1 items-center justify-center rounded-[8px] px-2 text-center text-[11px] font-medium text-soft no-underline"
            }
          >
            Complete · 20
          </Link>
        </div>
      ) : null}

      {canDelete ? (
        <button
          type="button"
          onClick={() => {
            setError("");
            setConfirmOpen(true);
          }}
          className="self-start text-[13px] font-medium text-rose-ink underline-offset-2 hover:underline"
        >
          Delete book
        </button>
      ) : null}

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="w-[min(100%,420px)] rounded-card border border-line bg-white p-0 text-ink shadow-lg open:flex open:flex-col"
        onClose={() => {
          if (!busy) setConfirmOpen(false);
        }}
        onCancel={(e) => {
          if (busy) e.preventDefault();
        }}
      >
        <div className="flex flex-col gap-4 p-6">
          <h2 id={titleId} className="m-0 font-display text-xl font-bold">
            Are you sure?
          </h2>
          <p className="m-0 text-[15px] leading-[1.55] text-soft">
            Delete <strong className="font-semibold text-ink">{title}</strong>? This
            permanently removes its summaries, check-ins, answers, commitments, and
            Question Bank data. This cannot be undone.
          </p>
          {error ? <p className="m-0 text-sm text-rose-ink">{error}</p> : null}
          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              disabled={busy}
              onClick={() => setConfirmOpen(false)}
              className="inline-flex h-11 items-center rounded-chip border border-line bg-white px-4 text-sm font-medium text-ink disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void confirmDelete()}
              className="inline-flex h-11 items-center rounded-chip bg-rose px-4 text-sm font-semibold text-white disabled:opacity-60"
            >
              {busy ? "Deleting…" : "Yes, delete"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
