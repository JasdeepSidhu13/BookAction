import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { BookCover } from "@/components/BookCover";
import { SummaryBlocks } from "@/components/SummaryBlocks";
import { getDueCheckIns } from "@/lib/checkins";
import { resolveChapter } from "@/lib/library";
import { getViewer } from "@/lib/viewer";

export const dynamic = "force-dynamic";

export default async function ChapterSummaryPage({
  params,
}: {
  params: Promise<{ bookId: string; chapterId: string }>;
}) {
  const { bookId, chapterId } = await params;
  const viewer = await getViewer();
  const data = await resolveChapter(viewer.sub, bookId, chapterId);
  if (!data) notFound();
  const { book, chapter } = data;
  const due = await getDueCheckIns(viewer.sub);
  const thisDue = due.find((d) => d.chapterId === chapter.id);
  const actionDue = thisDue && thisDue.diffDays <= 1;

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <AppHeader active="library" initial={viewer.initial} />

      <div className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-10 px-4 py-8 sm:px-8 sm:pb-20">
        <aside aria-label="Chapters" className="flex w-full max-w-[300px] flex-[1_1_260px] flex-col gap-5">
          <Link href="/" className="flex items-center gap-3.5 text-ink no-underline">
            <BookCover title={book.title} author={book.author} accent={book.coverAccent} size="sm" />
            <span className="flex flex-col gap-0.5">
              <span className="text-[15px] font-semibold leading-[1.3]">{book.title}</span>
              <span className="text-[13px] text-muted">{book.author}</span>
            </span>
          </Link>
          <div className="flex flex-col gap-1.5">
            <span className="px-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              {chapter.part}
            </span>
            {book.chapters.map((ch) => {
              const current = ch.id === chapter.id;
              const touched = ch.number < chapter.number;
              return (
                <Link
                  key={ch.id}
                  href={`/books/${book.id}/chapters/${ch.id}`}
                  aria-current={current ? "page" : undefined}
                  className={
                    current
                      ? "flex items-center gap-3 rounded-chip bg-brand-soft px-3 py-2.5 text-sm font-semibold text-brand no-underline"
                      : "flex items-center gap-3 rounded-chip px-3 py-2.5 text-sm text-ink no-underline"
                  }
                >
                  <StatusIcon current={current} done={touched && !current} />
                  <span>
                    {ch.number} · {ch.title}
                  </span>
                </Link>
              );
            })}
            {book.totalChaptersHint && book.totalChaptersHint > book.chapters.length ? (
              <span className="px-3 py-1.5 text-[13px] text-muted">+ more chapters coming</span>
            ) : null}
          </div>
        </aside>

        <main className="flex min-w-0 max-w-[800px] flex-[999_1_560px] flex-col gap-10">
          <div className="flex flex-col gap-5">
            <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-[13px] text-muted">
              <Link href="/" className="text-muted no-underline">
                Library
              </Link>
              <span aria-hidden>/</span>
              <span>{book.title}</span>
              <span aria-hidden>/</span>
              <span className="text-ink">Chapter {chapter.number}</span>
            </nav>
            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand">
                Chapter {chapter.number}
              </span>
              <h1 className="m-0 font-display text-[2.25rem] font-bold leading-[1.1] tracking-tight sm:text-[44px]">
                {chapter.title}
              </h1>
              <div className="flex flex-wrap gap-5 text-sm text-soft">
                <span>{chapter.readMinutes} min read</span>
                <span aria-hidden>·</span>
                <span>
                  {
                    chapter.summary.find((b) => b.type === "keyIdeas") &&
                    "type" in chapter.summary.find((b) => b.type === "keyIdeas")!
                      ? (chapter.summary.find((b) => b.type === "keyIdeas") as { ideas: unknown[] }).ideas
                          .length
                      : 4
                  }{" "}
                  key ideas
                </span>
                <span aria-hidden>·</span>
                <span>{chapter.questions.length} action questions</span>
              </div>
            </div>
            <div
              role="tablist"
              aria-label="Chapter views"
              className="inline-flex gap-1 self-start rounded-control bg-track p-1"
            >
              <span
                role="tab"
                aria-selected="true"
                className="inline-flex h-10 items-center rounded-[9px] bg-white px-5 text-sm font-semibold text-ink shadow-tab"
              >
                Summary
              </span>
              <Link
                href={`/books/${book.id}/chapters/${chapter.id}/action`}
                role="tab"
                aria-selected="false"
                className="inline-flex h-10 items-center gap-2 rounded-[9px] px-5 text-sm font-medium text-soft no-underline"
              >
                Action
                {actionDue ? (
                  <span className="rounded-full bg-amber-soft px-2 py-0.5 text-xs font-semibold text-amber-ink">
                    Due
                  </span>
                ) : null}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <SummaryBlocks blocks={chapter.summary} />
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href={`/books/${book.id}/chapters/${chapter.id}/action`}
              className="flex flex-wrap items-center justify-between gap-4 rounded-card bg-brand px-7 py-7 text-white no-underline"
            >
              <span className="flex flex-col gap-1">
                <span className="font-display text-[22px] font-bold">Turn this chapter into action</span>
                <span className="text-[15px] text-brand-pale">
                  {chapter.questions.length} check-in questions · about{" "}
                  {Math.max(5, chapter.questions.length + 1)} minutes
                  {thisDue ? ` · ${thisDue.cadence} check-in` : ""}
                </span>
              </span>
              <span className="inline-flex h-12 items-center gap-2 rounded-control bg-white px-[22px] text-[15px] font-semibold text-brand">
                Start check-in →
              </span>
            </Link>
            <Link
              href={`/question-bank?book=${book.id}&chapter=${chapter.id}`}
              className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-line bg-white px-7 py-6 text-ink no-underline"
            >
              <span className="flex flex-col gap-1">
                <span className="font-display text-[20px] font-bold">Full question set</span>
                <span className="text-[15px] text-soft">
                  {chapter.bankQuestions.length} action prompts from the chapter · answer anytime in
                  Question Bank
                </span>
              </span>
              <span className="inline-flex h-12 items-center gap-2 rounded-control bg-brand-soft px-[22px] text-[15px] font-semibold text-brand">
                Open extended questions →
              </span>
            </Link>
          </div>

          {/* Mobile sticky CTA */}
          <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white p-4 sm:hidden">
            <Link
              href={`/books/${book.id}/chapters/${chapter.id}/action`}
              className="flex h-[52px] items-center justify-center rounded-[14px] bg-brand text-base font-semibold text-white no-underline"
            >
              Start {thisDue?.cadence ?? "weekly"} check-in · {chapter.questions.length} questions
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatusIcon({ current, done }: { current: boolean; done: boolean }) {
  if (current) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3730A3" strokeWidth="2" aria-label="Reading" role="img">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 1 0 18z" fill="#3730A3" />
      </svg>
    );
  }
  if (done) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Completed" role="img">
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 3 3 5-6" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" strokeWidth="2" aria-label="Not started" role="img">
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}
