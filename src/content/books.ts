import type { Book } from "@/lib/types";
import { awakenTheGiantWithin } from "./awaken";
import { theConfidenceGap } from "./confidence-gap";
import { mansSearchForMeaning } from "./mans-search";
import { atomicHabits } from "./atomic-habits";

export const books: Book[] = [
  awakenTheGiantWithin,
  theConfidenceGap,
  mansSearchForMeaning,
  atomicHabits,
];

export function getBook(bookId: string): Book | undefined {
  return books.find((b) => b.id === bookId);
}

export function getChapter(bookId: string, chapterId: string) {
  const book = getBook(bookId);
  if (!book) return undefined;
  const chapter = book.chapters.find((c) => c.id === chapterId);
  if (!chapter) return undefined;
  return { book, chapter };
}

export function getDefaultBook(): Book {
  return books[0];
}

/** Validate IDs against the content catalog before writing to the database. */
export function isValidBookChapter(bookId: string, chapterId: string): boolean {
  return Boolean(getChapter(bookId, chapterId));
}
