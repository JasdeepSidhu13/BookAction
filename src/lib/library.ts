import { books as catalogBooks, getBook as getCatalogBook } from "@/content/books";
import type { Book } from "@/lib/types";
import { getUserBook, listUserBooks } from "@/lib/userBooks";

export async function listLibraryBooks(ownerSub: string): Promise<Book[]> {
  const uploaded = ownerSub ? await listUserBooks(ownerSub) : [];
  return [...catalogBooks, ...uploaded];
}

export async function resolveBook(
  ownerSub: string,
  bookId?: string | null,
): Promise<Book | undefined> {
  if (!bookId) return catalogBooks[0];
  const catalog = getCatalogBook(bookId);
  if (catalog) return catalog;
  if (!ownerSub) return undefined;
  return getUserBook(ownerSub, bookId);
}

export async function resolveChapter(
  ownerSub: string,
  bookId: string,
  chapterId: string,
) {
  const book = await resolveBook(ownerSub, bookId);
  if (!book) return undefined;
  const chapter = book.chapters.find((c) => c.id === chapterId);
  if (!chapter) return undefined;
  return { book, chapter };
}

export async function isAccessibleBookChapter(
  ownerSub: string,
  bookId: string,
  chapterId: string,
): Promise<boolean> {
  return Boolean(await resolveChapter(ownerSub, bookId, chapterId));
}

export function getDefaultCatalogBook(): Book {
  return catalogBooks[0];
}
