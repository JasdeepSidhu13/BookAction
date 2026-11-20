import Link from "next/link";
import type { Book } from "@/lib/types";
import { getBook } from "@/content/books";

type Props = {
  book: Book;
  className?: string;
};

/**
 * Toggle between Atomic Habits Essentials (10) and Complete (20).
 * Other books render nothing.
 */
export function BookEditionSwitch({ book, className }: Props) {
  if (!book.alternateEdition || !book.editionLabel) return null;

  const essentialsId = "atomic-habits";
  const completeId = "atomic-habits-complete";
  const essentials = getBook(essentialsId);
  const complete = getBook(completeId);
  if (!essentials || !complete) return null;

  const currentIsEssentials = book.id === essentialsId;
  const essentialsHref = `/books/${essentialsId}/chapters/${essentials.chapters[0]?.id}`;
  const completeHref = `/books/${completeId}/chapters/${complete.chapters[0]?.id}`;

  return (
    <div
      className={
        className ??
        "flex flex-col gap-2 rounded-tile border border-line bg-white px-3 py-3"
      }
      role="group"
      aria-label="Atomic Habits edition"
    >
      <span className="px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
        Edition
      </span>
      <div className="inline-flex gap-1 rounded-control bg-track p-1">
        <Link
          href={essentialsHref}
          aria-current={currentIsEssentials ? "page" : undefined}
          className={
            currentIsEssentials
              ? "inline-flex h-9 flex-1 items-center justify-center rounded-[9px] bg-white px-2 text-center text-[12px] font-semibold text-ink no-underline shadow-tab"
              : "inline-flex h-9 flex-1 items-center justify-center rounded-[9px] px-2 text-center text-[12px] font-medium text-soft no-underline"
          }
        >
          Essentials · 10
        </Link>
        <Link
          href={completeHref}
          aria-current={!currentIsEssentials ? "page" : undefined}
          className={
            !currentIsEssentials
              ? "inline-flex h-9 flex-1 items-center justify-center rounded-[9px] bg-white px-2 text-center text-[12px] font-semibold text-ink no-underline shadow-tab"
              : "inline-flex h-9 flex-1 items-center justify-center rounded-[9px] px-2 text-center text-[12px] font-medium text-soft no-underline"
          }
        >
          Complete · 20
        </Link>
      </div>
      <p className="m-0 px-1 text-[12px] leading-[1.45] text-soft">
        {currentIsEssentials
          ? "Condensed action path. Switch for Clear’s full 20-chapter arc."
          : "Full book path. Switch for the shorter Essentials edition."}
      </p>
    </div>
  );
}
