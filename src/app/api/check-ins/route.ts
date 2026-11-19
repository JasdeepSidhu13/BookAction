import { NextResponse } from "next/server";
import {
  ensureDraftCheckIn,
  saveAnswers,
  setCadence,
  submitCheckIn,
} from "@/lib/checkins";
import type { AnswerMap, Cadence } from "@/lib/types";
import { requireIdentity } from "../../../../cursor/identity";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const identity = await requireIdentity(request);
  if (identity instanceof Response) return identity;
  if (identity.kind === "key") {
    return NextResponse.json({ error: "person_required" }, { status: 403 });
  }

  const body = (await request.json()) as {
    checkInId?: number;
    bookId: string;
    chapterId: string;
    cadence?: Cadence;
    answers: AnswerMap;
    mode: "draft" | "submit";
  };

  const draft =
    body.checkInId != null
      ? { id: body.checkInId }
      : await ensureDraftCheckIn(identity.sub, body.bookId, body.chapterId);

  if (body.cadence) {
    await setCadence(identity.sub, body.bookId, body.chapterId, body.cadence);
  }

  await saveAnswers(identity.sub, draft.id, body.answers ?? {});

  if (body.mode === "submit") {
    const submitted = await submitCheckIn(identity.sub, draft.id);
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

  const body = (await request.json()) as {
    bookId: string;
    chapterId: string;
    cadence: Cadence;
  };
  await setCadence(identity.sub, body.bookId, body.chapterId, body.cadence);
  return NextResponse.json(
    { ok: true },
    { headers: { "cache-control": "private, no-store" } },
  );
}
