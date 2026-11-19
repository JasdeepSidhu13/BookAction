import { AppHeader } from "@/components/AppHeader";
import { EmptyLibrary } from "@/components/EmptyLibrary";
import { ProgressClient } from "@/components/ProgressClient";
import { SignInBanner } from "@/components/SignInBanner";
import { listLibraryBooks } from "@/lib/library";
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
  const books = await listLibraryBooks(viewer.library);
  const range = params.range ?? "8";
  const rangeWeeks = Number(range) || 8;

  if (!viewer.verified) {
    return (
      <div className="min-h-screen bg-canvas text-ink">
        <AppHeader active="progress" signedIn={false} />
        <main className="mx-auto flex max-w-[800px] flex-col gap-6 px-4 py-10 sm:px-8">
          <h1 className="m-0 font-display text-4xl font-bold tracking-tight">Progress</h1>
          <SignInBanner />
        </main>
      </div>
    );
  }

  const progress = await computeProgress(
    viewer.library,
    params.book ?? books[0]?.id,
    rangeWeeks,
  );

  if (!progress) {
    return (
      <div className="min-h-screen bg-canvas text-ink">
        <AppHeader
          active="progress"
          initial={viewer.initial}
          signedIn
          viewerName={viewer.name}
        />
        <main className="mx-auto flex max-w-[800px] flex-col gap-6 px-4 py-10 sm:px-8">
          <h1 className="m-0 font-display text-4xl font-bold tracking-tight">Progress</h1>
          <EmptyLibrary
            verified
            title="No books to measure yet"
            detail="Upload a book and complete a few check-ins to unlock growth insights."
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <AppHeader
        active="progress"
        initial={viewer.initial}
        signedIn
        viewerName={viewer.name}
      />
      <ProgressClient
        books={books.map((b) => ({ id: b.id, title: b.title }))}
        selectedBookId={progress.book.id}
        range={String(rangeWeeks)}
        growthPoints={progress.growthPoints}
        chapterStats={progress.chapterStats}
        heatmap={progress.heatmap}
        insights={progress.insights}
        questionChanges={progress.questionChanges}
        bank={progress.bank}
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
