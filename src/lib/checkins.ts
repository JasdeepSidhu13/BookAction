import { books, getChapter } from "@/content/books";
import { sql } from "@/lib/db";
import type {
  AnswerMap,
  AnswerRow,
  Cadence,
  CheckInRow,
  CommitmentRow,
  Question,
} from "@/lib/types";

export function cadenceDays(cadence: Cadence): number {
  if (cadence === "monthly") return 30;
  if (cadence === "quarterly") return 90;
  return 7;
}

export async function getOrCreateSettings(
  ownerSub: string,
  bookId: string,
  chapterId: string,
): Promise<{ cadence: Cadence; status: string }> {
  const existing = await sql<{ cadence: Cadence; status: string }>(
    `select cadence, status from chapter_settings
     where owner_sub = $1 and book_id = $2 and chapter_id = $3`,
    [ownerSub, bookId, chapterId],
  );
  if (existing[0]) return existing[0];
  await sql(
    `insert into chapter_settings (owner_sub, book_id, chapter_id, cadence, status)
     values ($1, $2, $3, 'weekly', 'in_progress')
     on conflict (owner_sub, book_id, chapter_id) do nothing`,
    [ownerSub, bookId, chapterId],
  );
  return { cadence: "weekly", status: "in_progress" };
}

export async function setCadence(
  ownerSub: string,
  bookId: string,
  chapterId: string,
  cadence: Cadence,
): Promise<void> {
  await getOrCreateSettings(ownerSub, bookId, chapterId);
  await sql(
    `update chapter_settings
     set cadence = $4, updated_at = now()
     where owner_sub = $1 and book_id = $2 and chapter_id = $3`,
    [ownerSub, bookId, chapterId, cadence],
  );
}

export async function getLatestCheckIn(
  ownerSub: string,
  bookId: string,
  chapterId: string,
): Promise<CheckInRow | null> {
  const rows = await sql<CheckInRow>(
    `select * from check_ins
     where owner_sub = $1 and book_id = $2 and chapter_id = $3
     order by created_at desc
     limit 1`,
    [ownerSub, bookId, chapterId],
  );
  return rows[0] ?? null;
}

export async function getSubmittedCheckIns(
  ownerSub: string,
  bookId?: string,
): Promise<CheckInRow[]> {
  if (bookId) {
    return sql<CheckInRow>(
      `select * from check_ins
       where owner_sub = $1 and book_id = $2 and status = 'submitted'
       order by submitted_at asc`,
      [ownerSub, bookId],
    );
  }
  return sql<CheckInRow>(
    `select * from check_ins
     where owner_sub = $1 and status = 'submitted'
     order by submitted_at asc`,
    [ownerSub],
  );
}

export async function getAnswersForCheckIn(checkInId: number): Promise<AnswerRow[]> {
  return sql<AnswerRow>(
    `select * from answers where check_in_id = $1 order by id asc`,
    [checkInId],
  );
}

export async function getAnswersMap(checkInId: number): Promise<AnswerMap> {
  const rows = await getAnswersForCheckIn(checkInId);
  const map: AnswerMap = {};
  for (const row of rows) {
    map[row.question_id] = {
      valueNumber: row.value_number,
      valueText: row.value_text,
      valueChoice: row.value_choice,
    };
  }
  return map;
}

export async function getPreviousSubmittedAnswers(
  ownerSub: string,
  bookId: string,
  chapterId: string,
  beforeCheckInId?: number,
): Promise<{ checkIn: CheckInRow; answers: AnswerMap } | null> {
  const rows = beforeCheckInId
    ? await sql<CheckInRow>(
        `select * from check_ins
         where owner_sub = $1 and book_id = $2 and chapter_id = $3
           and status = 'submitted' and id <> $4
         order by submitted_at desc
         limit 1`,
        [ownerSub, bookId, chapterId, beforeCheckInId],
      )
    : await sql<CheckInRow>(
        `select * from check_ins
         where owner_sub = $1 and book_id = $2 and chapter_id = $3
           and status = 'submitted'
         order by submitted_at desc
         limit 1`,
        [ownerSub, bookId, chapterId],
      );
  const checkIn = rows[0];
  if (!checkIn) return null;
  return { checkIn, answers: await getAnswersMap(checkIn.id) };
}

export async function getFirstSubmittedAnswers(
  ownerSub: string,
  bookId: string,
  chapterId: string,
): Promise<{ checkIn: CheckInRow; answers: AnswerMap } | null> {
  const rows = await sql<CheckInRow>(
    `select * from check_ins
     where owner_sub = $1 and book_id = $2 and chapter_id = $3
       and status = 'submitted'
     order by submitted_at asc
     limit 1`,
    [ownerSub, bookId, chapterId],
  );
  const checkIn = rows[0];
  if (!checkIn) return null;
  return { checkIn, answers: await getAnswersMap(checkIn.id) };
}

export async function ensureDraftCheckIn(
  ownerSub: string,
  bookId: string,
  chapterId: string,
): Promise<CheckInRow> {
  const settings = await getOrCreateSettings(ownerSub, bookId, chapterId);
  const latest = await getLatestCheckIn(ownerSub, bookId, chapterId);
  if (latest?.status === "draft") return latest;

  const countRows = await sql<{ count: string }>(
    `select count(*)::text as count from check_ins
     where owner_sub = $1 and book_id = $2 and chapter_id = $3 and status = 'submitted'`,
    [ownerSub, bookId, chapterId],
  );
  const nextNumber = Number(countRows[0]?.count ?? 0) + 1;
  const inserted = await sql<CheckInRow>(
    `insert into check_ins
      (owner_sub, book_id, chapter_id, cadence, status, check_in_number)
     values ($1, $2, $3, $4, 'draft', $5)
     returning *`,
    [ownerSub, bookId, chapterId, settings.cadence, nextNumber],
  );
  return inserted[0];
}

export async function saveAnswers(
  ownerSub: string,
  checkInId: number,
  answers: AnswerMap,
): Promise<void> {
  const rows = await sql<CheckInRow>(
    `select * from check_ins where id = $1 and owner_sub = $2`,
    [checkInId, ownerSub],
  );
  const checkIn = rows[0];
  if (!checkIn || checkIn.status !== "draft") {
    throw new Error("Check-in not editable");
  }

  for (const [questionId, value] of Object.entries(answers)) {
    await sql(
      `insert into answers (check_in_id, question_id, value_number, value_text, value_choice, updated_at)
       values ($1, $2, $3, $4, $5, now())
       on conflict (check_in_id, question_id) do update set
         value_number = excluded.value_number,
         value_text = excluded.value_text,
         value_choice = excluded.value_choice,
         updated_at = now()`,
      [
        checkInId,
        questionId,
        value.valueNumber ?? null,
        value.valueText ?? null,
        value.valueChoice ?? null,
      ],
    );
  }
  await sql(`update check_ins set updated_at = now() where id = $1`, [checkInId]);
}

export async function submitCheckIn(ownerSub: string, checkInId: number): Promise<CheckInRow> {
  const rows = await sql<CheckInRow>(
    `select * from check_ins where id = $1 and owner_sub = $2`,
    [checkInId, ownerSub],
  );
  const checkIn = rows[0];
  if (!checkIn || checkIn.status !== "draft") {
    throw new Error("Check-in not submittable");
  }

  const updated = await sql<CheckInRow>(
    `update check_ins
     set status = 'submitted', submitted_at = now(), updated_at = now()
     where id = $1
     returning *`,
    [checkInId],
  );

  const chapter = getChapter(checkIn.book_id, checkIn.chapter_id);
  const commitmentQuestion = chapter?.chapter.questions.find((q) => q.tracksCommitment);
  if (commitmentQuestion) {
    const answers = await getAnswersMap(checkInId);
    const text = answers[commitmentQuestion.id]?.valueText?.trim();
    if (text) {
      const due = new Date();
      due.setDate(due.getDate() + cadenceDays(checkIn.cadence));
      await sql(
        `insert into commitments
          (owner_sub, book_id, chapter_id, check_in_id, text, status, due_at)
         values ($1, $2, $3, $4, $5, 'open', $6)`,
        [ownerSub, checkIn.book_id, checkIn.chapter_id, checkInId, text, due.toISOString()],
      );
    }
  }

  await sql(
    `update chapter_settings
     set status = 'in_progress', updated_at = now()
     where owner_sub = $1 and book_id = $2 and chapter_id = $3`,
    [ownerSub, checkIn.book_id, checkIn.chapter_id],
  );

  return updated[0];
}

export async function listOpenCommitments(ownerSub: string): Promise<CommitmentRow[]> {
  return sql<CommitmentRow>(
    `select * from commitments
     where owner_sub = $1 and status = 'open'
     order by due_at asc nulls last, created_at asc`,
    [ownerSub],
  );
}

export async function completeCommitment(ownerSub: string, id: number): Promise<void> {
  await sql(
    `update commitments
     set status = 'done', completed_at = now(), updated_at = now()
     where id = $1 and owner_sub = $2`,
    [id, ownerSub],
  );
}

export function answeredCount(questions: Question[], answers: AnswerMap): number {
  return questions.filter((q) => {
    const a = answers[q.id];
    if (!a) return false;
    if (q.type === "scale") return typeof a.valueNumber === "number";
    if (q.type === "choice") return Boolean(a.valueChoice);
    return Boolean(a.valueText?.trim());
  }).length;
}

export async function getDueCheckIns(ownerSub: string) {
  const settings = await sql<{
    book_id: string;
    chapter_id: string;
    cadence: Cadence;
    status: string;
  }>(
    `select book_id, chapter_id, cadence, status from chapter_settings where owner_sub = $1`,
    [ownerSub],
  );
  const byKey = new Map(settings.map((s) => [`${s.book_id}:${s.chapter_id}`, s]));

  const items = [];
  for (const book of books) {
    for (const chapter of book.chapters) {
      const key = `${book.id}:${chapter.id}`;
      const setting = byKey.get(key) ?? { cadence: "weekly" as Cadence, status: "not_started" };
      const latestSubmitted = await sql<CheckInRow>(
        `select * from check_ins
         where owner_sub = $1 and book_id = $2 and chapter_id = $3 and status = 'submitted'
         order by submitted_at desc limit 1`,
        [ownerSub, book.id, chapter.id],
      );
      const last = latestSubmitted[0];
      let dueDate: Date;
      if (!last?.submitted_at) {
        dueDate = new Date();
        if (chapter.number > 2) {
          dueDate.setDate(dueDate.getDate() + (chapter.number - 2) * 7);
        }
      } else {
        dueDate = new Date(last.submitted_at);
        dueDate.setDate(dueDate.getDate() + cadenceDays(setting.cadence));
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const due = new Date(dueDate);
      due.setHours(0, 0, 0, 0);
      const diffDays = Math.round((due.getTime() - today.getTime()) / 86400000);
      items.push({
        bookId: book.id,
        chapterId: chapter.id,
        chapterNumber: chapter.number,
        title: chapter.shortTitle,
        cadence: setting.cadence,
        dueDate: due.toISOString(),
        diffDays,
        urgency: diffDays <= 0 ? "due" : diffDays === 1 ? "soon" : "later",
      });
    }
  }
  return items.sort((a, b) => a.diffDays - b.diffDays);
}

export function formatDueLabel(diffDays: number, cadence: Cadence, dueDate: string): string {
  const cadenceLabel = cadence[0].toUpperCase() + cadence.slice(1);
  if (diffDays < 0) return `${cadenceLabel} · ${Math.abs(diffDays)}d overdue`;
  if (diffDays === 0) return `${cadenceLabel} · due today`;
  if (diffDays === 1) return `${cadenceLabel} · due tomorrow`;
  const d = new Date(dueDate);
  return `${cadenceLabel} · ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}
