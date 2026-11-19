import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";
import { formatDueLabel, getDueCheckIns, listOpenCommitments } from "@/lib/checkins";
import { getViewer } from "@/lib/viewer";

export const dynamic = "force-dynamic";

export default async function CheckInsPage() {
  const viewer = await getViewer();
  const due = await getDueCheckIns(viewer.sub);
  const commitments = await listOpenCommitments(viewer.sub);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <AppHeader active="checkins" initial={viewer.initial} />
      <main className="mx-auto flex max-w-[900px] flex-col gap-8 px-4 py-10 sm:px-8 sm:pb-20">
        <div className="flex flex-col gap-2">
          <h1 className="m-0 font-display text-4xl font-bold tracking-tight">Check-ins</h1>
          <p className="m-0 text-[15px] text-soft">
            Recurring action questions for each chapter — weekly, monthly, or quarterly.
          </p>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="m-0 font-display text-xl font-bold">Upcoming</h2>
          {due.map((item) => (
            <Link
              key={`${item.bookId}:${item.chapterId}`}
              href={`/books/${item.bookId}/chapters/${item.chapterId}/action`}
              className="flex items-center justify-between gap-4 rounded-panel border border-line bg-white p-5 text-ink no-underline"
            >
              <span className="flex flex-col gap-1">
                <span className="text-[15px] font-semibold">
                  Ch {item.chapterNumber} · {item.title}
                </span>
                <span className="text-[13px] text-muted">
                  {formatDueLabel(item.diffDays, item.cadence, item.dueDate)}
                </span>
              </span>
              <span className="text-sm font-semibold text-brand">Open →</span>
            </Link>
          ))}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="m-0 font-display text-xl font-bold">Open commitments</h2>
          {commitments.length === 0 ? (
            <div className="rounded-panel border border-line bg-white p-5 text-sm text-muted">
              Commitments from your check-ins will appear here.
            </div>
          ) : (
            commitments.map((c) => (
              <div key={c.id} className="rounded-panel border border-line bg-white p-5">
                <p className="m-0 text-[15px] font-medium leading-[1.5]">{c.text}</p>
                <p className="mt-2 mb-0 text-[13px] text-muted">
                  {c.due_at
                    ? `Due ${new Date(c.due_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                    : "No due date"}
                </p>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
