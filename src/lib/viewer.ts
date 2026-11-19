import { headers } from "next/headers";
import { getIdentity } from "../../cursor/identity";
import { libraryAccess, type LibraryAccess } from "@/lib/library";
import { isOwnerIdentity } from "@/lib/owner";

export type Viewer = {
  sub: string;
  name: string;
  initial: string;
  email: string;
  simulated: boolean;
  verified: boolean;
  isOwner: boolean;
  library: LibraryAccess;
};

/**
 * Resolve the current viewer. Unverified callers get an empty sub and no starter
 * books — pages stay read-only until Cursor identity is present (private/team app).
 */
export async function getViewer(): Promise<Viewer> {
  const h = await headers();
  const identity = await getIdentity(h);

  if (!identity.verified || identity.kind === "key") {
    return {
      sub: "",
      name: "Signed out",
      initial: "?",
      email: "",
      simulated: false,
      verified: false,
      isOwner: false,
      library: libraryAccess("", false),
    };
  }

  const name = identity.name || identity.email || "Reader";
  const isOwner = isOwnerIdentity(identity);
  return {
    sub: identity.sub,
    name,
    initial: name.trim().charAt(0).toUpperCase() || "A",
    email: identity.email,
    simulated: identity.simulated,
    verified: true,
    isOwner,
    library: libraryAccess(identity.sub, isOwner),
  };
}
