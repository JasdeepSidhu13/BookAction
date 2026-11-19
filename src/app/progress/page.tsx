import { AppHeader } from "@/components/AppHeader";
import { ProgressClient } from "@/components/ProgressClient";
import { books } from "@/content/books";
import { computeProgress } from "@/lib/progress";
import { getViewer } from "@/lib/viewer";

export const dynamic = "force-dynamic";

export default async function ProgressPage({
  searchParams,
}: {
  searchParams: Promise<{ book?: string; range?: string }>;
}) {
  const viewer = await getViewer();
  const params = await searchParams;
  const bookId = params.book ?? books[0].id;
  const range = params.range ?? "8";
  const rangeWeeks = Number(range) || 8;
  const progress = await computeProgress(viewer.sub, bookId, rangeWeeks);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <AppHeader active="progress" initial={viewer.initial} />
      <ProgressClient
        books={books.map((b) => ({ id: b.id, title: b.title }))}
        selectedBookId={progress.book.id}
        range={String(rangeWeeks)}
        growthPoints={progress.growthPoints}
        chapterStats={progress.chapterStats}
        heatmap={progress.heatmap}
        insights={progress.insights}
        questionChanges={progress.questionChanges}
        kpis={{
          growthIndex: progress.growthIndex,
          growthDelta: progress.growthDelta,
          followThrough: progress.followThrough,
          streak: progress.streak,
          openCommitments: progress.openCommitments,
          overdueCount: progress.overdueCount,
          overdueDays: progress.overdueDays,
        }}
      />
    </div>
  );
}
