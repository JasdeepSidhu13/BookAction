import Link from "next/link";
import { redirect } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { getViewer } from "@/lib/viewer";

export const dynamic = "force-dynamic";

/**
 * Cursor sign-in is provided by the apps gate for Private / Team / invited access.
 * Public apps never receive a person identity, so this page explains how to turn
 * that gate on. Do not add a separate auth library here.
 */
export default async function SignInPage() {
  const viewer = await getViewer();
  if (viewer.verified) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <AppHeader active="library" signedIn={false} />
      <main className="mx-auto flex max-w-[560px] flex-col gap-8 px-4 py-12 sm:px-8">
        <div className="flex flex-col gap-3">
          <h1 className="m-0 font-display text-[2rem] font-bold tracking-tight sm:text-[40px]">
            Sign in with Cursor
          </h1>
          <p className="m-0 text-[15px] leading-[1.55] text-soft">
            Chapterwise uses Cursor’s built-in sign-in. That login screen only
            appears when the app is not Public — set Access to{" "}
            <strong className="font-semibold text-ink">Private</strong>,{" "}
            <strong className="font-semibold text-ink">Team</strong>, or{" "}
            <strong className="font-semibold text-ink">People you invite</strong>,
            then reopen the app.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="https://cursor.com/dashboard/apps"
            className="inline-flex h-12 items-center justify-center rounded-chip bg-brand px-5 text-sm font-semibold text-white no-underline"
          >
            Open Apps dashboard
          </a>
          <a
            href="https://chapterwise.apps.grok.bot/"
            className="inline-flex h-12 items-center justify-center rounded-chip border border-line bg-white px-5 text-sm font-semibold text-ink no-underline"
          >
            I’ve set Private — open Chapterwise
          </a>
          <Link
            href="/"
            className="text-center text-sm font-medium text-soft no-underline hover:text-ink"
          >
            Back to library
          </Link>
        </div>

        <ol className="m-0 flex list-decimal flex-col gap-2 rounded-card border border-line bg-white p-6 pl-10 text-[15px] leading-[1.55] text-soft">
          <li>Open the Apps dashboard and select Chapterwise.</li>
          <li>
            Under Access → Who can access, choose Private, Team, or invite
            specific people (not Public).
          </li>
          <li>
            Open the app again — Cursor shows Sign in, then your private library
            loads.
          </li>
        </ol>
      </main>
    </div>
  );
}
