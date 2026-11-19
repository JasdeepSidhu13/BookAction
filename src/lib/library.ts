import { books as catalogBooks, getBook as getCatalogBook } from "@/content/books";
import { isOwnerIdentity, type OwnerCheck } from "@/lib/owner";
import type { Book } from "@/lib/types";
import { getUserBook, listUserBooks } from "@/lib/userBooks";

/** Access context for the current viewer's personal library. */
export type LibraryAccess = {
  sub: string;
  /** True only for the app owner — includes Awaken + Confidence Gap starter books. */
  includeStarterBooks: boolean;
};

export function libraryAccess(
  sub: string,
  includeStarterBooks: boolean,
): LibraryAccess {
  return { sub, includeStarterBooks };
}

/** Build library access from a verified Cursor person identity. */
export function accessFromPerson(identity: OwnerCheck & { sub: string }): LibraryAccess {
  return libraryAccess(identity.sub, isOwnerIdentity(identity));
}

export async function listLibraryBooks(access: LibraryAccess): Promise<Book[]> {
  const uploaded = access.sub ? await listUserBooks(access.sub) : [];
  if (access.includeStarterBooks) {
    return [...catalogBooks, ...uploaded];
  }
  return uploaded;
}

export async function resolveBook(
  access: LibraryAccess,
  bookId?: string | null,
): Promise<Book | undefined> {
  if (!bookId) {
    const library = await listLibraryBooks(access);
    return library[0];
  }
  if (access.includeStarterBooks) {
    const catalog = getCatalogBook(bookId);
    if (catalog) return catalog;
  }
  if (!access.sub) return undefined;
  return getUserBook(access.sub, bookId);
}

export async function resolveChapter(
  access: LibraryAccess,
  bookId: string,
  chapterId: string,
) {
  const book = await resolveBook(access, bookId);
  if (!book) return undefined;
  const chapter = book.chapters.find((c) => c.id === chapterId);
  if (!chapter) return undefined;
  return { book, chapter };
}

export async function isAccessibleBookChapter(
  access: LibraryAccess,
  bookId: string,
  chapterId: string,
): Promise<boolean> {
  return Boolean(await resolveChapter(access, bookId, chapterId));
}
