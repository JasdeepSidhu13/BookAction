import { NextResponse } from "next/server";
import { deleteUserBook, getUserBookMeta } from "@/lib/userBooks";
import { requireIdentity } from "../../../../../cursor/identity";

export const dynamic = "force-dynamic";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ bookId: string }> },
) {
  const identity = await requireIdentity(request);
  if (identity instanceof Response) return identity;
  if (identity.kind === "key") {
    return NextResponse.json({ error: "person_required" }, { status: 403 });
  }

  const { bookId } = await context.params;
  if (!bookId || bookId.length > 200) {
    return NextResponse.json({ error: "invalid_book" }, { status: 400 });
  }

  const meta = await getUserBookMeta(identity.sub, bookId);
  if (!meta) {
    return NextResponse.json(
      { error: "not_found", detail: "Only uploaded books can be deleted." },
      { status: 404 },
    );
  }

  const ok = await deleteUserBook(identity.sub, bookId);
  if (!ok) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json(
    { ok: true, deletedId: bookId, title: meta.title },
    { headers: { "cache-control": "private, no-store" } },
  );
}
