/**
 * Who gets the built-in starter library (Awaken + Confidence Gap).
 * Everyone else starts with an empty library and only their uploads.
 *
 * Override with CHAPTERWISE_OWNER_EMAIL / CHAPTERWISE_OWNER_USER_ID if needed.
 */
const OWNER_EMAIL = (
  process.env.CHAPTERWISE_OWNER_EMAIL ?? "jasdeepsidhu13@gmail.com"
)
  .trim()
  .toLowerCase();

const OWNER_USER_ID = Number(
  process.env.CHAPTERWISE_OWNER_USER_ID ?? "370716115",
);

export type OwnerCheck = {
  kind?: string;
  email?: string;
  userId?: number;
  /** Local identity.dev simulation — treat as owner so the product preview stays usable. */
  simulated?: boolean;
};

export function isOwnerIdentity(identity: OwnerCheck): boolean {
  if (identity.kind === "key") return false;
  if (identity.simulated) return true;
  if (
    Number.isFinite(OWNER_USER_ID) &&
    OWNER_USER_ID > 0 &&
    identity.userId === OWNER_USER_ID
  ) {
    return true;
  }
  if (OWNER_EMAIL && identity.email?.trim().toLowerCase() === OWNER_EMAIL) {
    return true;
  }
  return false;
}
