import { sql } from "@/lib/db";
import type { BankQuestion, Book, Chapter, Question, SummaryBlock } from "@/lib/types";

export type UserBookRow = {
  id: string;
  owner_sub: string;
  title: string;
  author: string;
  cover_accent: string;
  source_filename: string | null;
  source_bytes: number | null;
  status: "processing" | "ready" | "failed";
  error_message: string | null;
  generation_mode: "heuristic" | "llm";
  chapter_count: number;
  created_at: string;
  updated_at: string;
};

export type UserChapterRow = {
  id: number;
  book_id: string;
  owner_sub: string;
  chapter_id: string;
  number: number;
  title: string;
  short_title: string;
  part: string;
  teaser: string;
  read_minutes: number;
  summary_json: SummaryBlock[] | string;
  questions_json: Question[] | string;
  bank_questions_json: BankQuestion[] | string;
  created_at: string;
  updated_at: string;
};

function parseJson<T>(value: T | string, fallback: T): T {
  if (typeof value !== "string") return value ?? fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function rowToChapter(row: UserChapterRow): Chapter {
  return {
    id: row.chapter_id,
    number: row.number,
    title: row.title,
    shortTitle: row.short_title,
    part: row.part,
    teaser: row.teaser,
    readMinutes: row.read_minutes,
    summary: parseJson(row.summary_json, []),
    questions: parseJson(row.questions_json, []),
    bankQuestions: parseJson(row.bank_questions_json, []),
  };
}

export async function listUserBooks(ownerSub: string): Promise<Book[]> {
  const books = await sql<UserBookRow>(
    `select * from user_books
     where owner_sub = $1 and status = 'ready'
     order by created_at desc`,
    [ownerSub],
  );
  const result: Book[] = [];
  for (const book of books) {
    const chapters = await sql<UserChapterRow>(
      `select * from user_chapters
       where owner_sub = $1 and book_id = $2
       order by number asc`,
      [ownerSub, book.id],
    );
    if (chapters.length === 0) continue;
    result.push({
      id: book.id,
      title: book.title,
      author: book.author,
      coverAccent: book.cover_accent,
      totalChaptersHint: book.chapter_count || chapters.length,
      chapters: chapters.map(rowToChapter),
    });
  }
  return result;
}

export async function getUserBook(
  ownerSub: string,
  bookId: string,
): Promise<Book | undefined> {
  const books = await sql<UserBookRow>(
    `select * from user_books
     where owner_sub = $1 and id = $2 and status = 'ready'
     limit 1`,
    [ownerSub, bookId],
  );
  const book = books[0];
  if (!book) return undefined;
  const chapters = await sql<UserChapterRow>(
    `select * from user_chapters
     where owner_sub = $1 and book_id = $2
     order by number asc`,
    [ownerSub, bookId],
  );
  if (chapters.length === 0) return undefined;
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    coverAccent: book.cover_accent,
    totalChaptersHint: book.chapter_count || chapters.length,
    chapters: chapters.map(rowToChapter),
  };
}

export async function getUserBookMeta(ownerSub: string, bookId: string) {
  const rows = await sql<UserBookRow>(
    `select * from user_books where owner_sub = $1 and id = $2 limit 1`,
    [ownerSub, bookId],
  );
  return rows[0];
}

export async function deleteUserBook(ownerSub: string, bookId: string) {
  await sql(`delete from user_books where owner_sub = $1 and id = $2`, [
    ownerSub,
    bookId,
  ]);
}
