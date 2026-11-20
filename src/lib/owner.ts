/**
 * Who gets the built-in starter library (Awaken, Confidence Gap,
 * Man’s Search for Meaning, Atomic Habits). Everyone else starts empty
 * and only sees uploads.
 *
 * Set CHAPTERWISE_OWNER_EMAIL and/or CHAPTERWISE_OWNER_USER_ID as app secrets
 * (no hardcoded personal identifiers in source).
 */
const OWNER_EMAIL = (process.env.CHAPTERWISE_OWNER_EMAIL ?? "")
  .trim()
  .toLowerCase();

const OWNER_USER_ID = Number(process.env.CHAPTERWISE_OWNER_USER_ID ?? "");

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
