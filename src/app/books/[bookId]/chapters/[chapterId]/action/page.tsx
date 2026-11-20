import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { CheckInForm } from "@/components/CheckInForm";
import {
  cadenceDays,
  ensureDraftCheckIn,
  getAnswersMap,
  getFirstSubmittedAnswers,
  getOrCreateSettings,
  getPreviousSubmittedAnswers,
  listOpenCommitments,
  setNextDeadline,
} from "@/lib/checkins";
import { parseDeadlineDate, toDateInputValue } from "@/lib/deadlines";
import { resolveChapter } from "@/lib/library";
import { computeProgress } from "@/lib/progress";
import { getViewer } from "@/lib/viewer";

export const dynamic = "force-dynamic";

export default async function ActionCheckInPage({
  params,
}: {
  params: Promise<{ bookId: string; chapterId: string }>;
}) {
  const { bookId, chapterId } = await params;
  const viewer = await getViewer();
  if (!viewer.verified) notFound();
  const data = await resolveChapter(viewer.library, bookId, chapterId);
  if (!data) notFound();
  const { book, chapter } = data;

  const draft = await ensureDraftCheckIn(viewer.sub, bookId, chapterId);
  let settings = await getOrCreateSettings(viewer.sub, bookId, chapterId);
  // Seed a calendar deadline if the reader has not picked one yet.
  if (!settings.next_deadline_at) {
    const suggested = new Date();
    suggested.setUTCDate(suggested.getUTCDate() + cadenceDays(settings.cadence));
    const seeded = parseDeadlineDate(suggested.toISOString().slice(0, 10));
    if (seeded) {
      settings = await setNextDeadline(viewer.sub, bookId, chapterId, seeded);
    }
  }
  const answers = await getAnswersMap(draft.id);
  const previous = await getPreviousSubmittedAnswers(viewer.sub, bookId, chapterId, draft.id);
  const first = await getFirstSubmittedAnswers(viewer.sub, bookId, chapterId);
  const progress = await computeProgress(viewer.library, bookId);
  const chapterStat = progress?.chapterStats.find((c) => c.chapterId === chapterId);
  const chapterSpark =
    chapterStat?.latest != null && chapterStat.first != null
      ? [chapterStat.first, chapterStat.latest]
      : (progress?.growthPoints.map((p) => p.score) ?? []);

  const commitments = await listOpenCommitments(viewer.sub);
  const lastCommitment =
    commitments.find((c) => c.chapter_id === chapterId)?.text ??
    previous?.answers[
      chapter.questions.find((q) => q.tracksCommitment)?.id ?? ""
    ]?.valueText ??
    null;

  const insightBlock = chapter.summary.find((b) => b.type === "insight");
  const fromChapterNote =
    insightBlock && insightBlock.type === "insight"
      ? insightBlock.text
      : "A real decision cuts off every other option. Is there a back door you're keeping open?";

  const previousDateLabel = previous?.checkIn
    ? [
        previous.checkIn.submitted_at
          ? new Date(previous.checkIn.submitted_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          : null,
        previous.checkIn.deadline_at
          ? `due ${new Date(previous.checkIn.deadline_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}`
          : null,
      ]
        .filter(Boolean)
        .join(" · ")
    : null;

  const initialDeadline = toDateInputValue(settings.next_deadline_at);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <AppHeader
        active="checkins"
        initial={viewer.initial}
        signedIn
        viewerName={viewer.name}
      />
      <div className="mx-auto flex max-w-[1200px] flex-col gap-7 px-4 py-8 sm:px-8 sm:pb-20">
        <div className="flex flex-col gap-4">
          <Link
            href={`/books/${book.id}/chapters/${chapter.id}`}
            className="text-sm font-medium text-soft no-underline"
          >
            ← Chapter {chapter.number} summary
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-amber">
                Action · Check-in #{draft.check_in_number}
              </span>
              <h1 className="m-0 font-display text-[2rem] font-bold leading-[1.1] tracking-tight sm:text-[40px]">
                {chapter.title}
              </h1>
              <p className="m-0 text-sm text-muted">{book.title}</p>
            </div>
            <Link
              href={`/question-bank?book=${book.id}&chapter=${chapter.id}`}
              className="inline-flex h-11 items-center rounded-chip border border-line bg-white px-4 text-sm font-semibold text-ink no-underline"
            >
              Full question set · {chapter.bankQuestions.length} questions →
            </Link>
          </div>
        </div>

        <div className="rounded-panel border border-line bg-brand-soft px-5 py-4 text-sm leading-[1.55] text-brand-dark">
          This check-in uses a focused set of {chapter.questions.length} recurring questions.
          Open the <strong>full question set</strong> for every Notion action prompt for this
          chapter, add your own questions, and build answer history for insights.
        </div>

        <div
          role="tablist"
          aria-label="Chapter views"
          className="inline-flex gap-1 self-start rounded-control bg-track p-1 sm:hidden"
        >
          <Link
            href={`/books/${book.id}/chapters/${chapter.id}`}
            role="tab"
            className="inline-flex h-10 items-center rounded-[9px] px-4 text-sm font-medium text-soft no-underline"
          >
            Summary
          </Link>
          <span
            role="tab"
            aria-selected="true"
            className="inline-flex h-10 items-center rounded-[9px] bg-white px-4 text-sm font-semibold text-ink shadow-tab"
          >
            Action
          </span>
        </div>

        <CheckInForm
          checkInId={draft.id}
          bookId={book.id}
          chapterId={chapter.id}
          chapterTitle={chapter.title}
          checkInNumber={draft.check_in_number}
          questions={chapter.questions}
          initialAnswers={answers}
          previousAnswers={previous?.answers ?? null}
          firstAnswers={first?.answers ?? null}
          previousDateLabel={previousDateLabel}
          lastCommitment={lastCommitment}
          initialCadence={settings.cadence}
          initialDeadline={initialDeadline}
          chapterScore={chapterStat?.latest ?? null}
          chapterDelta={chapterStat?.delta ?? null}
          sparkline={chapterSpark}
          fromChapterNote={fromChapterNote}
        />
      </div>
    </div>
  );
}
