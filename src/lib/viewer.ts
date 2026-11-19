import { headers } from "next/headers";
import { getIdentity } from "../../cursor/identity";

/**
 * Resolve the current viewer. Unverified callers do not share a guest data bucket —
 * they get verified:false with an empty sub so pages stay read-only for catalog content.
 */
export async function getViewer() {
  const h = await headers();
  const identity = await getIdentity(h);
  if (!identity.verified) {
    return {
      sub: "",
      name: "Signed out",
      initial: "?",
      simulated: false,
      verified: false as const,
    };
  }
  const name = identity.name || identity.email || "Reader";
  return {
    sub: identity.sub,
    name,
    initial: name.trim().charAt(0).toUpperCase() || "A",
    simulated: identity.simulated,
    verified: true as const,
  };
}
