import { NextResponse } from "next/server";
import { completeCommitment } from "@/lib/checkins";
import { requireIdentity } from "../../../../cursor/identity";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const identity = await requireIdentity(request);
  if (identity instanceof Response) return identity;
  if (identity.kind === "key") {
    return NextResponse.json({ error: "person_required" }, { status: 403 });
  }

  const body = (await request.json()) as { id: number };
  await completeCommitment(identity.sub, body.id);
  return NextResponse.json(
    { ok: true },
    { headers: { "cache-control": "private, no-store" } },
  );
}
