import { NextResponse } from "next/server";
import {
  ensureDraftCheckIn,
  saveAnswers,
  setCadence,
  setNextDeadline,
  submitCheckIn,
} from "@/lib/checkins";
import { parseDeadlineDate } from "@/lib/deadlines";
import { accessFromPerson, isAccessibleBookChapter } from "@/lib/library";
import type { AnswerMap, Cadence } from "@/lib/types";
import { requireIdentity } from "../../../../cursor/identity";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const identity = await requireIdentity(request);
  if (identity instanceof Response) return identity;
  if (identity.kind === "key") {
    return NextResponse.json({ error: "person_required" }, { status: 403 });
  }

  const access = accessFromPerson(identity);
  const body = (await request.json()) as {
    checkInId?: number;
    bookId: string;
    chapterId: string;
    cadence?: Cadence;
    deadline?: string | null;
    answers: AnswerMap;
    mode: "draft" | "submit";
  };

  if (!(await isAccessibleBookChapter(access, body.bookId, body.chapterId))) {
    return NextResponse.json({ error: "unknown_chapter" }, { status: 400 });
  }

  const draft =
    body.checkInId != null
      ? { id: body.checkInId }
      : await ensureDraftCheckIn(identity.sub, body.bookId, body.chapterId);

  if (body.cadence) {
    await setCadence(identity.sub, body.bookId, body.chapterId, body.cadence);
  }
  if (body.deadline !== undefined) {
    const parsed =
      body.deadline === null || body.deadline === ""
        ? null
        : parseDeadlineDate(body.deadline);
    if (body.deadline && !parsed) {
      return NextResponse.json({ error: "invalid_deadline" }, { status: 400 });
    }
    await setNextDeadline(identity.sub, body.bookId, body.chapterId, parsed);
  }

  await saveAnswers(identity.sub, draft.id, body.answers ?? {});

  if (body.mode === "submit") {
    const submitted = await submitCheckIn(access, draft.id);
    return NextResponse.json(
      { checkIn: submitted },
      { headers: { "cache-control": "private, no-store" } },
    );
  }

  return NextResponse.json(
    { ok: true, checkInId: draft.id },
    { headers: { "cache-control": "private, no-store" } },
  );
}

export async function PATCH(request: Request) {
  const identity = await requireIdentity(request);
  if (identity instanceof Response) return identity;
  if (identity.kind === "key") {
    return NextResponse.json({ error: "person_required" }, { status: 403 });
  }

  const access = accessFromPerson(identity);
  const body = (await request.json()) as {
    bookId: string;
    chapterId: string;
    cadence?: Cadence;
    deadline?: string | null;
  };
  if (!(await isAccessibleBookChapter(access, body.bookId, body.chapterId))) {
    return NextResponse.json({ error: "unknown_chapter" }, { status: 400 });
  }
  if (body.cadence) {
    await setCadence(identity.sub, body.bookId, body.chapterId, body.cadence);
  }
  let settings = null;
  if (body.deadline !== undefined) {
    const parsed =
      body.deadline === null || body.deadline === ""
        ? null
        : parseDeadlineDate(body.deadline);
    if (body.deadline && !parsed) {
      return NextResponse.json({ error: "invalid_deadline" }, { status: 400 });
    }
    settings = await setNextDeadline(
      identity.sub,
      body.bookId,
      body.chapterId,
      parsed,
    );
  }
  return NextResponse.json(
    { ok: true, settings },
    { headers: { "cache-control": "private, no-store" } },
  );
}
