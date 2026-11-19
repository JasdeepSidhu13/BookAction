import { NextResponse } from "next/server";
import { isOwnerIdentity } from "@/lib/owner";
import { getIdentity } from "../../../../cursor/identity";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const identity = await getIdentity(request);
  if (!identity.verified) {
    return NextResponse.json(
      { verified: false, reason: identity.reason },
      { headers: { "cache-control": "private, no-store" } },
    );
  }
  if (identity.kind === "key") {
    return NextResponse.json(
      { verified: true, kind: "key", name: identity.name, isOwner: false },
      { headers: { "cache-control": "private, no-store" } },
    );
  }
  return NextResponse.json(
    {
      verified: true,
      name: identity.name,
      email: identity.email,
      kind: identity.kind,
      simulated: identity.simulated,
      isOwner: isOwnerIdentity(identity),
    },
    { headers: { "cache-control": "private, no-store" } },
  );
}
