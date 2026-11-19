import { sql } from "@/lib/db";
import { isAccessibleBookChapter, resolveBook, resolveChapter } from "@/lib/library";
import { LIMITS, clampText } from "@/lib/limits";
import type { BankAnswerRow, BankQuestion, CustomQuestionRow } from "@/lib/types";

export async function listCustomQuestions(
  ownerSub: string,
  bookId: string,
  chapterId: string,
): Promise<CustomQuestionRow[]> {
  return sql<CustomQuestionRow>(
    `select * from custom_questions
     where owner_sub = $1 and book_id = $2 and chapter_id = $3
     order by created_at desc`,
    [ownerSub, bookId, chapterId],
  );
}

export async function addCustomQuestion(
  ownerSub: string,
  bookId: string,
  chapterId: string,
  prompt: string,
): Promise<CustomQuestionRow> {
  if (!(await isAccessibleBookChapter(ownerSub, bookId, chapterId))) {
    throw new Error("unknown_chapter");
  }
  const trimmed = clampText(prompt, LIMITS.customPrompt);
  if (!trimmed) throw new Error("empty_prompt");
  const existing = await sql<{ count: string }>(
    `select count(*)::text as count from custom_questions
     where owner_sub = $1 and book_id = $2 and chapter_id = $3`,
    [ownerSub, bookId, chapterId],
  );
  if (Number(existing[0]?.count ?? 0) >= LIMITS.maxCustomQuestionsPerChapter) {
    throw new Error("too_many_custom_questions");
  }
  const rows = await sql<CustomQuestionRow>(
    `insert into custom_questions (owner_sub, book_id, chapter_id, prompt)
     values ($1, $2, $3, $4)
     returning *`,
    [ownerSub, bookId, chapterId, trimmed],
  );
  return rows[0];
}

export async function listBankAnswers(
  ownerSub: string,
  bookId: string,
  chapterId?: string,
): Promise<BankAnswerRow[]> {
  if (chapterId) {
    return sql<BankAnswerRow>(
      `select * from question_bank_answers
       where owner_sub = $1 and book_id = $2 and chapter_id = $3
       order by updated_at desc`,
      [ownerSub, bookId, chapterId],
    );
  }
  return sql<BankAnswerRow>(
    `select * from question_bank_answers
     where owner_sub = $1 and book_id = $2
     order by updated_at desc`,
    [ownerSub, bookId],
  );
}

/** Latest answer per question key (catalog id or custom:id / text hash). */
export async function latestAnswersByQuestion(
  ownerSub: string,
  bookId: string,
  chapterId: string,
): Promise<Record<string, BankAnswerRow>> {
  const rows = await listBankAnswers(ownerSub, bookId, chapterId);
  const map: Record<string, BankAnswerRow> = {};
  for (const row of rows) {
    const key = row.question_id ?? `text:${row.question_text}`;
    if (!map[key]) map[key] = row;
  }
  return map;
}

export async function saveBankAnswer(input: {
  ownerSub: string;
  bookId: string;
  chapterId: string;
  questionId?: string | null;
  questionText: string;
  answerText?: string | null;
  valueNumber?: number | null;
  source: "catalog" | "custom";
}): Promise<BankAnswerRow> {
  if (!(await isAccessibleBookChapter(input.ownerSub, input.bookId, input.chapterId))) {
    throw new Error("unknown_chapter");
  }
  const questionText = clampText(input.questionText, LIMITS.questionText);
  if (!questionText) throw new Error("empty_question");
  const answerText = input.answerText != null ? clampText(input.answerText, LIMITS.answerText) : null;

  const existing = await sql<{ count: string }>(
    `select count(*)::text as count from question_bank_answers
     where owner_sub = $1 and book_id = $2 and chapter_id = $3`,
    [input.ownerSub, input.bookId, input.chapterId],
  );
  if (Number(existing[0]?.count ?? 0) >= LIMITS.maxBankAnswersPerChapter) {
    throw new Error("too_many_bank_answers");
  }

  // Always insert a new row so history accumulates for insights.
  const rows = await sql<BankAnswerRow>(
    `insert into question_bank_answers
      (owner_sub, book_id, chapter_id, question_id, question_text, answer_text, value_number, source)
     values ($1, $2, $3, $4, $5, $6, $7, $8)
     returning *`,
    [
      input.ownerSub,
      input.bookId,
      input.chapterId,
      input.questionId ?? null,
      questionText,
      answerText || null,
      input.valueNumber ?? null,
      input.source,
    ],
  );
  return rows[0];
}

export async function catalogQuestionsForChapter(
  ownerSub: string,
  bookId: string,
  chapterId: string,
): Promise<BankQuestion[]> {
  const data = await resolveChapter(ownerSub, bookId, chapterId);
  return data?.chapter.bankQuestions ?? [];
}

export async function computeBankInsights(ownerSub: string, bookId: string) {
  const answers = await listBankAnswers(ownerSub, bookId);
  const book = await resolveBook(ownerSub, bookId);
  const byChapter = new Map<string, BankAnswerRow[]>();
  for (const a of answers) {
    const list = byChapter.get(a.chapter_id) ?? [];
    list.push(a);
    byChapter.set(a.chapter_id, list);
  }

  const chaptersTouched = byChapter.size;
  const totalAnswers = answers.length;
  const last7 = answers.filter(
    (a) => Date.now() - new Date(a.updated_at).getTime() < 7 * 86400000,
  ).length;

  const chapterActivity = [...byChapter.entries()]
    .map(([chapterId, rows]) => {
      const ch = book?.chapters.find((c) => c.id === chapterId);
      const uniqueQs = new Set(rows.map((r) => r.question_id ?? r.question_text)).size;
      return {
        chapterId,
        number: ch?.number ?? 0,
        title: ch?.shortTitle ?? chapterId,
        answerCount: rows.length,
        uniqueQuestions: uniqueQs,
        lastAnswered: rows[0]?.updated_at ?? null,
      };
    })
    .sort((a, b) => b.answerCount - a.answerCount);

  const recent = answers.slice(0, 8).map((a) => ({
    id: a.id,
    chapterId: a.chapter_id,
    chapterTitle:
      book?.chapters.find((c) => c.id === a.chapter_id)?.shortTitle ?? a.chapter_id,
    questionText: a.question_text,
    answerText: a.answer_text,
    updatedAt: a.updated_at,
  }));

  return {
    totalAnswers,
    chaptersTouched,
    answersLast7Days: last7,
    chapterActivity,
    recent,
  };
}
