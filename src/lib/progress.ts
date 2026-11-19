import {
  getAnswersForCheckIn,
  getSubmittedCheckIns,
  listOpenCommitments,
} from "@/lib/checkins";
import { sql } from "@/lib/db";
import { getDefaultCatalogBook, listLibraryBooks, resolveBook, resolveChapter } from "@/lib/library";
import { computeBankInsights } from "@/lib/questionBank";
import type { AnswerRow, Book, CheckInRow, CommitmentRow } from "@/lib/types";

function avg(nums: number[]): number | null {
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

async function scaleAnswersForCheckIn(
  ownerSub: string,
  checkIn: CheckInRow,
): Promise<number[]> {
  const chapter = await resolveChapter(ownerSub, checkIn.book_id, checkIn.chapter_id);
  if (!chapter) return [];
  const scaleIds = new Set(
    chapter.chapter.questions.filter((q) => q.type === "scale").map((q) => q.id),
  );
  const answers = await getAnswersForCheckIn(checkIn.id);
  return answers
    .filter((a) => scaleIds.has(a.question_id) && typeof a.value_number === "number")
    .map((a) => a.value_number as number);
}

export async function computeProgress(ownerSub: string, bookId?: string, rangeWeeks = 8) {
  const library = await listLibraryBooks(ownerSub);
  const book =
    (bookId ? await resolveBook(ownerSub, bookId) : undefined) ??
    library[0] ??
    getDefaultCatalogBook();
  const submitted = await getSubmittedCheckIns(ownerSub, book.id);
  const since = new Date();
  since.setDate(since.getDate() - rangeWeeks * 7);
  const inRange = submitted.filter(
    (c) => c.submitted_at && new Date(c.submitted_at) >= since,
  );

  const growthPoints: { date: string; score: number }[] = [];
  for (const checkIn of inRange) {
    const scales = await scaleAnswersForCheckIn(ownerSub, checkIn);
    const score = avg(scales);
    if (score != null && checkIn.submitted_at) {
      growthPoints.push({ date: checkIn.submitted_at, score: round1(score) });
    }
  }

  const allScores: number[] = [];
  for (const checkIn of submitted) {
    allScores.push(...(await scaleAnswersForCheckIn(ownerSub, checkIn)));
  }
  const firstScores: number[] = [];
  if (submitted[0]) firstScores.push(...(await scaleAnswersForCheckIn(ownerSub, submitted[0])));

  const growthIndex = avg(growthPoints.map((p) => p.score).slice(-3)) ?? avg(allScores);
  const firstIndex = avg(firstScores);
  const growthDelta =
    growthIndex != null && firstIndex != null ? round1(growthIndex - firstIndex) : null;

  const choiceAnswers = await sql<AnswerRow & { book_id: string; chapter_id: string }>(
    `select a.*, c.book_id, c.chapter_id
     from answers a
     join check_ins c on c.id = a.check_in_id
     where c.owner_sub = $1 and c.book_id = $2 and c.status = 'submitted'
       and a.value_choice is not null`,
    [ownerSub, book.id],
  );
  const followChoices = [];
  for (const a of choiceAnswers) {
    const ch = await resolveChapter(ownerSub, a.book_id, a.chapter_id);
    const q = ch?.chapter.questions.find((qq) => qq.id === a.question_id);
    if (q?.followsCommitment) followChoices.push(a);
  }
  const yesCount = followChoices.filter((a) => a.value_choice === "Yes").length;
  const partlyCount = followChoices.filter((a) => a.value_choice === "Partly").length;
  const followThrough =
    followChoices.length === 0
      ? null
      : Math.round(((yesCount + partlyCount * 0.5) / followChoices.length) * 100);

  const commitments = await listOpenCommitments(ownerSub);
  const bookCommitments = commitments.filter((c) => c.book_id === book.id);
  const now = Date.now();
  const overdue = bookCommitments.filter(
    (c) => c.due_at && new Date(c.due_at).getTime() < now,
  );

  const streak = computeStreak(submitted);
  const chapterStats = await Promise.all(
    book.chapters.map(async (chapter) => {
      const chapterCheckIns = submitted.filter((c) => c.chapter_id === chapter.id);
      if (chapterCheckIns.length === 0) {
        return {
          chapterId: chapter.id,
          number: chapter.number,
          title: chapter.shortTitle,
          latest: null as number | null,
          first: null as number | null,
          delta: null as number | null,
          checkInCount: 0,
        };
      }
      const first = avg(await scaleAnswersForCheckIn(ownerSub, chapterCheckIns[0]));
      const latest = avg(
        await scaleAnswersForCheckIn(ownerSub, chapterCheckIns[chapterCheckIns.length - 1]),
      );
      return {
        chapterId: chapter.id,
        number: chapter.number,
        title: chapter.shortTitle,
        latest: latest != null ? round1(latest) : null,
        first: first != null ? round1(first) : null,
        delta: latest != null && first != null ? round1(latest - first) : null,
        checkInCount: chapterCheckIns.length,
      };
    }),
  );

  const heatmap = buildHeatmap(submitted, 12);
  const questionChanges = await buildQuestionChanges(ownerSub, book.id, submitted);
  const insights = buildInsights({
    book,
    bookId: book.id,
    growthDelta,
    chapterStats,
    questionChanges,
    commitments: bookCommitments,
    overdue,
    followThrough,
  });

  const answersLogged = await sql<{ count: string }>(
    `select count(*)::text as count
     from answers a
     join check_ins c on c.id = a.check_in_id
     where c.owner_sub = $1 and c.book_id = $2 and c.status = 'submitted'`,
    [ownerSub, book.id],
  );

  const chaptersTouched = new Set(submitted.map((c) => c.chapter_id)).size;
  const bank = await computeBankInsights(ownerSub, book.id);

  if (bank.totalAnswers > 0) {
    const top = bank.chapterActivity[0];
    insights.unshift({
      kind: "pattern",
      title: "Question Bank is building signal",
      body: top
        ? `${bank.totalAnswers} bank answers logged · most active: Ch ${top.number} (${top.answerCount}).`
        : `${bank.totalAnswers} bank answers logged across ${bank.chaptersTouched} chapters.`,
      href: `/question-bank?book=${book.id}`,
      cta: "Open Question Bank →",
    });
  }

  return {
    book,
    growthIndex: growthIndex != null ? round1(growthIndex) : null,
    growthDelta,
    followThrough,
    streak,
    openCommitments: bookCommitments.length,
    overdueCount: overdue.length,
    overdueDays:
      overdue[0]?.due_at != null
        ? Math.max(0, Math.round((now - new Date(overdue[0].due_at).getTime()) / 86400000))
        : 0,
    growthPoints,
    chapterStats: chapterStats.filter((c) => c.checkInCount > 0 || c.number <= 3),
    heatmap,
    insights: insights.slice(0, 4),
    questionChanges,
    answersLogged: Number(answersLogged[0]?.count ?? 0) + bank.totalAnswers,
    chaptersTouched: Math.max(chaptersTouched, bank.chaptersTouched),
    commitments: bookCommitments,
    submittedCount: submitted.length,
    bank,
  };
}

function computeStreak(submitted: CheckInRow[]): number {
  if (submitted.length === 0) return 0;
  const weeks = new Set(
    submitted
      .filter((c) => c.submitted_at)
      .map((c) => {
        const d = new Date(c.submitted_at as string);
        const onejan = new Date(d.getFullYear(), 0, 1);
        return `${d.getFullYear()}-W${Math.floor((d.getTime() - onejan.getTime()) / 604800000)}`;
      }),
  );
  return weeks.size;
}

function buildHeatmap(submitted: CheckInRow[], weeks: number): number[] {
  const result = Array.from({ length: weeks }, () => 0);
  const now = new Date();
  for (const checkIn of submitted) {
    if (!checkIn.submitted_at) continue;
    const d = new Date(checkIn.submitted_at);
    const diff = Math.floor((now.getTime() - d.getTime()) / 604800000);
    const idx = weeks - 1 - diff;
    if (idx >= 0 && idx < weeks) result[idx] += 1;
  }
  return result;
}

async function buildQuestionChanges(ownerSub: string, bookId: string, submitted: CheckInRow[]) {
  const byChapter = new Map<string, CheckInRow[]>();
  for (const c of submitted) {
    const list = byChapter.get(c.chapter_id) ?? [];
    list.push(c);
    byChapter.set(c.chapter_id, list);
  }
  const rows: {
    questionId: string;
    label: string;
    chapterNumber: number;
    first: number;
    latest: number;
    change: number;
  }[] = [];

  for (const [chapterId, list] of byChapter) {
    const chapter = await resolveChapter(ownerSub, bookId, chapterId);
    if (!chapter) continue;
    const firstAnswers = await getAnswersForCheckIn(list[0].id);
    const latestAnswers = await getAnswersForCheckIn(list[list.length - 1].id);
    const firstMap = Object.fromEntries(firstAnswers.map((a) => [a.question_id, a]));
    const latestMap = Object.fromEntries(latestAnswers.map((a) => [a.question_id, a]));
    for (const q of chapter.chapter.questions.filter((qq) => qq.type === "scale")) {
      const first = firstMap[q.id]?.value_number;
      const latest = latestMap[q.id]?.value_number;
      if (typeof first !== "number" || typeof latest !== "number") continue;
      rows.push({
        questionId: q.id,
        label: shortenPrompt(q.prompt),
        chapterNumber: chapter.chapter.number,
        first,
        latest,
        change: latest - first,
      });
    }
  }
  return rows.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
}

function shortenPrompt(prompt: string): string {
  return prompt
    .replace(/^How (consistently|strongly|deliberately|clear|urgently|aware|rewarding) (am I|is my|did I|do I) /i, "")
    .replace(/\?$/, "")
    .replace(/^./, (c) => c.toUpperCase())
    .slice(0, 64);
}

function buildInsights(input: {
  book: Book;
  bookId: string;
  growthDelta: number | null;
  chapterStats: {
    chapterId: string;
    number: number;
    title: string;
    latest: number | null;
    delta: number | null;
    checkInCount: number;
  }[];
  questionChanges: { label: string; first: number; latest: number; change: number; chapterNumber: number }[];
  commitments: CommitmentRow[];
  overdue: CommitmentRow[];
  followThrough: number | null;
}) {
  const insights: {
    kind: "progress" | "attention" | "pattern" | "focus";
    title: string;
    body: string;
    href?: string;
    cta?: string;
    commitmentId?: number;
  }[] = [];

  const insightBook = input.book;
  const chapterIdByNumber = (num: number) =>
    insightBook.chapters.find((c) => c.number === num)?.id ?? insightBook.chapters[0]?.id ?? "";

  const best = input.questionChanges.find((q) => q.change >= 2);
  if (best) {
    insights.push({
      kind: "progress",
      title: "You are improving where it counts",
      body: `"${best.label}" rose from ${best.first} → ${best.latest} across your check-ins.`,
      href: `/books/${input.bookId}/chapters/${chapterIdByNumber(best.chapterNumber)}/action`,
      cta: "See your answers →",
    });
  } else if (input.growthDelta != null && input.growthDelta > 0) {
    insights.push({
      kind: "progress",
      title: "Your growth index is rising",
      body: `Up ${input.growthDelta} since your first check-in. Keep the cadence.`,
      href: `/progress`,
      cta: "Review progress →",
    });
  }

  const stalled = input.chapterStats.find(
    (c) => c.checkInCount >= 2 && (c.delta == null || Math.abs(c.delta) < 0.3),
  );
  if (stalled) {
    insights.push({
      kind: "attention",
      title: `Chapter ${stalled.number} has stalled`,
      body: `Score has stayed near ${stalled.latest ?? "—"} across recent check-ins. Re-reading before the next check-in usually helps.`,
      href: `/books/${input.bookId}/chapters/${stalled.chapterId}`,
      cta: `Revisit chapter ${stalled.number} →`,
    });
  }

  if (input.commitments.length > 0) {
    const recurring = input.commitments[0];
    insights.push({
      kind: "pattern",
      title: "An open commitment needs closure",
      body: `"${truncate(recurring.text, 90)}" is still unresolved.`,
      href: `/books/${input.bookId}/chapters/${recurring.chapter_id}/action`,
      cta: "Make it this week's focus →",
    });
  }

  if (input.overdue[0]) {
    const days = Math.max(
      1,
      Math.round((Date.now() - new Date(input.overdue[0].due_at as string).getTime()) / 86400000),
    );
    insights.push({
      kind: "focus",
      title: "Close one open commitment",
      body: `"${truncate(input.overdue[0].text, 80)}" is ${days} day${days === 1 ? "" : "s"} overdue.${
        input.followThrough != null
          ? ` Finishing it would strengthen follow-through (now ${input.followThrough}%).`
          : ""
      }`,
      commitmentId: input.overdue[0].id,
      cta: "Mark as done",
    });
  } else if (input.commitments[0]) {
    insights.push({
      kind: "focus",
      title: "This period's focus",
      body: `Stay with: "${truncate(input.commitments[0].text, 100)}"`,
      commitmentId: input.commitments[0].id,
      cta: "Mark as done",
    });
  }

  if (insights.length === 0) {
    insights.push({
      kind: "progress",
      title: "Start your first check-in",
      body: "Answer a chapter's action questions to unlock growth trends and insights.",
      href: `/books/${input.bookId}/chapters/${insightBook.chapters[1]?.id ?? insightBook.chapters[0].id}/action`,
      cta: "Open Action →",
    });
  }

  return insights.slice(0, 4);
}

function truncate(text: string, n: number): string {
  if (text.length <= n) return text;
  return `${text.slice(0, n - 1)}…`;
}
