type Props = {
  compact?: boolean;
};

/**
 * Cursor identity is only attached for private/team published apps.
 * Public apps have no signed-in person header, so uploads cannot be owned.
 */
export function SignInBanner({ compact = false }: Props) {
  if (compact) {
    return (
      <p className="m-0 rounded-panel border border-line bg-amber-soft px-4 py-3 text-sm text-amber-ink">
        Sign in with Cursor to use your private library. Set this app to{" "}
        <strong className="font-semibold">Private</strong> or{" "}
        <strong className="font-semibold">Team</strong> in Publish Settings, then
        reopen it while signed into Cursor.
      </p>
    );
  }

  return (
    <section className="flex flex-col gap-3 rounded-card border border-line bg-white p-7">
      <h2 className="m-0 font-display text-xl font-bold">Sign in to get started</h2>
      <p className="m-0 text-[15px] leading-[1.55] text-soft">
        Chapterwise ties uploads, check-ins, and progress to your Cursor account.
        Authentication comes from Cursor when the app is published as{" "}
        <strong className="font-semibold text-ink">Private</strong> or{" "}
        <strong className="font-semibold text-ink">Team</strong> — open the app while
        signed into Cursor and your library stays yours.
      </p>
      <ol className="m-0 flex list-decimal flex-col gap-1.5 pl-5 text-[15px] leading-[1.55] text-soft">
        <li>In Cursor, open Publish Settings for Chapterwise.</li>
        <li>Set visibility to Private (just you) or Team.</li>
        <li>Reopen the app URL — Cursor will sign you in automatically.</li>
      </ol>
    </section>
  );
}
