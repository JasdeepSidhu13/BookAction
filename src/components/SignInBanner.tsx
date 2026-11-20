import Link from "next/link";

type Props = {
  compact?: boolean;
};

/**
 * Cursor identity is only attached for private/team/invited published apps.
 * Public apps have no signed-in person header, so uploads cannot be owned.
 */
export function SignInBanner({ compact = false }: Props) {
  if (compact) {
    return (
      <div className="flex flex-col gap-3 rounded-panel border border-line bg-amber-soft px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 text-sm text-amber-ink">
          Sign in with Cursor to use your private library. The app must be
          Private, Team, or invite-only — not Public.
        </p>
        <Link
          href="/signin"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-chip bg-brand px-4 text-sm font-semibold text-white no-underline"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-5 rounded-card border border-line bg-white p-7">
      <div className="flex flex-col gap-2">
        <h2 className="m-0 font-display text-xl font-bold">Sign in to get started</h2>
        <p className="m-0 text-[15px] leading-[1.55] text-soft">
          Uploads, check-ins, and progress stay tied to your Cursor account.
          Cursor’s sign-in screen appears when Chapterwise is Private, Team, or
          invite-only — Public links skip login entirely.
        </p>
      </div>
      <Link
        href="/signin"
        className="inline-flex h-12 w-full items-center justify-center rounded-chip bg-brand px-5 text-sm font-semibold text-white no-underline sm:w-auto"
      >
        Sign in with Cursor
      </Link>
      <ol className="m-0 flex list-decimal flex-col gap-1.5 pl-5 text-[15px] leading-[1.55] text-soft">
        <li>Open Apps dashboard → Chapterwise → Access.</li>
        <li>Set Who can access to Private, Team, or People you invite.</li>
        <li>Reopen the app — Cursor asks you to sign in, then your library loads.</li>
      </ol>
    </section>
  );
}
