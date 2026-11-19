import Link from "next/link";
import type { ReactNode } from "react";
import { AppHeader } from "@/components/AppHeader";
import { BookCover } from "@/components/BookCover";
import { EmptyLibrary } from "@/components/EmptyLibrary";
import { SignInBanner } from "@/components/SignInBanner";
import { formatDueLabel, getDueCheckIns } from "@/lib/checkins";
import { listLibraryBooks } from "@/lib/library";
import { computeProgress } from "@/lib/progress";
import { getViewer } from "@/lib/viewer";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  const viewer = await getViewer();
  const books = await listLibraryBooks(viewer.library);
  const book = books[0];
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  if (!viewer.verified) {
    return (
      <div className="min-h-screen bg-canvas text-ink">
        <AppHeader active="library" signedIn={false} />
        <main className="mx-auto flex max-w-[800px] flex-col gap-8 px-4 py-10 sm:px-8 sm:pb-16">
          <div className="animate-fade-up flex flex-col gap-2">
            <p className="m-0 text-sm font-medium text-muted">{today}</p>
            <h1 className="m-0 font-display text-[2rem] font-bold leading-[1.15] tracking-tight sm:text-[40px]">
              Your private reading library
            </h1>
            <p className="m-0 text-[15px] leading-[1.55] text-soft">
              Sign in so uploads and check-ins stay tied to your account. New
              accounts start with a clean slate — upload a book to begin.
            </p>
          </div>
          <SignInBanner />
        </main>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-canvas text-ink">
        <AppHeader
          active="library"
          initial={viewer.initial}
          showAddBook
          signedIn
          viewerName={viewer.name}
        />
        <main className="mx-auto flex max-w-[800px] flex-col gap-8 px-4 py-10 sm:px-8 sm:pb-16">
          <div className="animate-fade-up flex flex-col gap-2">
            <p className="m-0 text-sm font-medium text-muted">{today}</p>
            <h1 className="m-0 font-display text-[2rem] font-bold leading-[1.15] tracking-tight sm:text-[40px]">
              Welcome, {viewer.name.split(" ")[0]}.
            </h1>
            {viewer.simulated ? (
              <p className="m-0 text-sm text-muted">
                Local preview uses a simulated viewer until you publish.
              </p>
            ) : null}
          </div>
          <EmptyLibrary verified />
        </main>
      </div>
    );
  }

  const continueChapter = book.chapters[1] ?? book.chapters[0];
  const due = await getDueCheckIns(viewer.library);
  const progress = await computeProgress(viewer.library, book.id);
  const completedHint = Math.max(progress?.chaptersTouched ?? 0, 1);
  const dueNow = due.filter((d) => d.diffDays <= 1);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <AppHeader
        active="library"
        initial={viewer.initial}
        showAddBook
        signedIn
        viewerName={viewer.name}
      />
      <main className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 py-10 sm:px-8 sm:pb-16">
        <div className="animate-fade-up flex flex-col gap-2">
          <p className="m-0 text-sm font-medium text-muted">{today}</p>
          <h1 className="m-0 font-display text-[2rem] font-bold leading-[1.15] tracking-tight sm:text-[40px]">
            Welcome back. You have {dueNow.length} check-in
            {dueNow.length === 1 ? "" : "s"} due.
          </h1>
          {viewer.simulated ? (
            <p className="m-0 text-sm text-muted">
              Local preview uses a simulated viewer until you publish.
            </p>
          ) : null}
        </div>

        <div className="animate-fade-up-delay flex flex-wrap gap-6">
          <section
            aria-labelledby="cont"
            className="flex min-w-0 flex-[999_1_560px] flex-wrap gap-7 rounded-card border border-line bg-white p-7"
          >
            <BookCover title={book.title} author={book.author} accent={book.coverAccent} size="lg" />
            <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-4">
              <p id="cont" className="m-0 text-[13px] font-semibold uppercase tracking-[0.08em] text-brand">
                Continue reading
              </p>
              <div className="flex flex-col gap-1.5">
                <h2 className="m-0 font-display text-[26px] font-bold leading-[1.2]">
                  Chapter {continueChapter.number} · {continueChapter.title}
                </h2>
                <p className="m-0 text-[15px] leading-[1.6] text-soft">{continueChapter.teaser}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[13px] text-soft">
                  <span>Book progress</span>
                  <span className="font-semibold text-ink">{completedHint} chapters touched</span>
                </div>
                <div className="h-2 overflow-hidden rounded bg-wash">
                  <div
                    className="h-full rounded bg-brand"
                    style={{ width: `${Math.min(100, (completedHint / book.chapters.length) * 100)}%` }}
                  />
                </div>
              </div>
              <div className="mt-auto flex flex-wrap gap-3">
                <Link
                  href={`/books/${book.id}/chapters/${continueChapter.id}`}
                  className="inline-flex h-11 items-center rounded-chip bg-brand px-5 text-sm font-semibold text-white no-underline"
                >
                  Read summary
                </Link>
                <Link
                  href={`/books/${book.id}/chapters/${continueChapter.id}/action`}
                  className="inline-flex h-11 items-center rounded-chip bg-brand-soft px-5 text-sm font-semibold text-brand no-underline"
                >
                  Open Action
                </Link>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="due"
            className="flex min-w-0 flex-[1_1_340px] flex-col gap-4 rounded-card border border-line bg-white p-7"
          >
            <div className="flex items-center justify-between">
              <h2 id="due" className="m-0 font-display text-lg font-bold">
                Check-ins
              </h2>
              <Link href="/check-ins" className="text-sm font-medium no-underline">
                See all
              </Link>
            </div>
            {due.slice(0, 3).map((item) => {
              if (item.urgency === "later") {
                return (
                  <div
                    key={item.chapterId}
                    className="flex items-center gap-3.5 rounded-[14px] border border-line p-3.5"
                  >
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#A1A1AA]" />
                    <span className="flex flex-1 flex-col gap-0.5">
                      <span className="text-[15px] font-semibold">
                        Ch {item.chapterNumber} · {item.title}
                      </span>
                      <span className="text-[13px] text-muted">
                        {formatDueLabel(item.diffDays, item.cadence, item.dueDate)}
                      </span>
                    </span>
                  </div>
                );
              }
              const urgent = item.urgency === "due";
              return (
                <Link
                  key={item.chapterId}
                  href={`/books/${item.bookId}/chapters/${item.chapterId}/action`}
                  className={`flex items-center gap-3.5 rounded-[14px] p-3.5 text-ink no-underline ${
                    urgent ? "bg-rose-soft" : "bg-amber-soft"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${urgent ? "bg-rose" : "bg-amber"}`}
                  />
                  <span className="flex flex-1 flex-col gap-0.5">
                    <span className="text-[15px] font-semibold">
                      Ch {item.chapterNumber} · {item.title}
                    </span>
                    <span className={`text-[13px] ${urgent ? "text-rose-tint" : "text-amber-mid"}`}>
                      {formatDueLabel(item.diffDays, item.cadence, item.dueDate)}
                    </span>
                  </span>
                  <span className={`text-[13px] font-semibold ${urgent ? "text-rose-ink" : "text-amber-ink"}`}>
                    Start
                  </span>
                </Link>
              );
            })}
          </section>
        </div>

        <section
          aria-labelledby="wk"
          className="animate-fade-up-delay-2 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <h2 id="wk" className="sr-only">
            This week
          </h2>
          <Stat
            label="Growth index"
            value={
              progress?.growthIndex != null ? (
                <>
                  {progress.growthIndex.toFixed(1)}
                  <span className="text-base font-semibold text-muted"> / 10</span>
                </>
              ) : (
                "—"
              )
            }
            hint={
              progress?.growthDelta != null
                ? `▲ ${Math.abs(progress.growthDelta).toFixed(1)} since first check-in`
                : "Start check-ins to unlock"
            }
            hintClass={progress?.growthDelta != null ? "text-success font-semibold" : "text-soft"}
          />
          <Stat
            label="Check-in streak"
            value={
              <>
                {progress?.streak ?? 0}
                <span className="text-base font-semibold text-muted"> weeks</span>
              </>
            }
            hint={(progress?.streak ?? 0) > 0 ? "Active weeks so far" : "No submissions yet"}
          />
          <Stat
            label="Follow-through"
            value={progress?.followThrough != null ? `${progress.followThrough}%` : "—"}
            hint="Committed actions completed"
          />
          <Stat
            label="Answers logged"
            value={String(progress?.answersLogged ?? 0)}
            hint={
              (progress?.chaptersTouched ?? 0) > 0
                ? `Across ${progress!.chaptersTouched} chapter${progress!.chaptersTouched === 1 ? "" : "s"}`
                : "Waiting for your first answers"
            }
          />
        </section>

        <section aria-labelledby="lib" className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 id="lib" className="m-0 font-display text-[22px] font-bold">
              Your library
            </h2>
            <span className="text-sm text-muted">
              {books.length} book{books.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
            {books.map((b) => (
              <Link
                key={b.id}
                href={`/books/${b.id}/chapters/${b.chapters[0].id}`}
                className="flex flex-col gap-3 text-ink no-underline"
              >
                <BookCover title={b.title} author={b.author} accent={b.coverAccent} />
                <span className="flex flex-col gap-1">
                  <span className="text-[15px] font-semibold">{b.title}</span>
                  <span className="text-[13px] text-muted">
                    In progress · {b.chapters.length} chapters ready
                  </span>
                </span>
              </Link>
            ))}
            <Link
              href="/upload"
              className="flex aspect-[7/10] flex-col items-center justify-center gap-2.5 rounded-control border-[1.5px] border-dashed border-[#C9C8C1] bg-transparent text-sm font-medium text-soft no-underline"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#52525B" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add a book
              <span className="text-xs text-muted">Upload PDF · generate summaries & questions</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  hintClass = "text-soft",
}: {
  label: string;
  value: ReactNode;
  hint: string;
  hintClass?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-tile border border-line bg-white p-5">
      <span className="text-[13px] font-medium text-muted">{label}</span>
      <span className="font-display text-[32px] font-bold">{value}</span>
      <span className={`text-[13px] ${hintClass}`}>{hint}</span>
    </div>
  );
}
