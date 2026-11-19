import { AppHeader } from "@/components/AppHeader";
import { QuestionBankClient } from "@/components/QuestionBankClient";
import { listLibraryBooks, resolveBook } from "@/lib/library";
import {
  computeBankInsights,
  latestAnswersByQuestion,
  listBankAnswers,
  listCustomQuestions,
} from "@/lib/questionBank";
import { getViewer } from "@/lib/viewer";

export const dynamic = "force-dynamic";

export default async function QuestionBankPage({
  searchParams,
}: {
  searchParams: Promise<{ book?: string; chapter?: string }>;
}) {
  const viewer = await getViewer();
  const params = await searchParams;
  const books = await listLibraryBooks(viewer.sub);
  const book =
    (await resolveBook(viewer.sub, params.book ?? "")) ?? books[0];
  const chapterId = params.chapter ?? book.chapters[1]?.id ?? book.chapters[0].id;
  const chapter =
    book.chapters.find((c) => c.id === chapterId) ?? book.chapters[0];

  const [custom, latestMap, history, insights] = await Promise.all([
    listCustomQuestions(viewer.sub, book.id, chapter.id),
    latestAnswersByQuestion(viewer.sub, book.id, chapter.id),
    listBankAnswers(viewer.sub, book.id, chapter.id),
    computeBankInsights(viewer.sub, book.id),
  ]);

  const latestByKey: Record<
    string,
    { answerText: string | null; valueNumber: number | null; updatedAt: string }
  > = {};
  for (const [key, row] of Object.entries(latestMap)) {
    latestByKey[key] = {
      answerText: row.answer_text,
      valueNumber: row.value_number,
      updatedAt: row.updated_at,
    };
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <AppHeader active="bank" initial={viewer.initial} />
      <QuestionBankClient
        bookId={book.id}
        bookTitle={book.title}
        books={books.map((b) => ({ id: b.id, title: b.title }))}
        chapters={book.chapters.map((c) => ({
          id: c.id,
          number: c.number,
          title: c.title,
          shortTitle: c.shortTitle,
          bankCount: c.bankQuestions.length,
        }))}
        selectedChapterId={chapter.id}
        catalog={chapter.bankQuestions}
        custom={custom}
        latestByKey={latestByKey}
        history={history}
        insights={insights}
      />
    </div>
  );
}
