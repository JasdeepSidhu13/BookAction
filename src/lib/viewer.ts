import { headers } from "next/headers";
import { getIdentity } from "../../cursor/identity";

export async function getViewer() {
  const h = await headers();
  const identity = await getIdentity(h);
  if (!identity.verified) {
    return {
      sub: "anonymous-local",
      name: "Guest",
      initial: "G",
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
