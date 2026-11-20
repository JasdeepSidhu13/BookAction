import Link from "next/link";

type NavKey = "library" | "checkins" | "bank" | "progress";

const links: { key: NavKey; href: string; label: string }[] = [
  { key: "library", href: "/", label: "Library" },
  { key: "checkins", href: "/check-ins", label: "Check-ins" },
  { key: "bank", href: "/question-bank", label: "Question Bank" },
  { key: "progress", href: "/progress", label: "Progress" },
];

export function AppHeader({
  active,
  initial = "A",
  showAddBook = false,
  signedIn = true,
  viewerName,
}: {
  active: NavKey;
  initial?: string;
  showAddBook?: boolean;
  signedIn?: boolean;
  viewerName?: string;
}) {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-ink no-underline hover:text-ink">
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <rect width="28" height="28" rx="8" fill="#3730A3" />
            <path
              d="M8 8h5v12H8zM15 8h5v12h-5z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display text-lg font-bold tracking-tight">Chapterwise</span>
        </Link>

        <nav aria-label="Main" className="flex flex-wrap gap-1">
          {links.map((link) => {
            const isActive = link.key === active;
            return (
              <Link
                key={link.key}
                href={link.href}
                className={
                  isActive
                    ? "rounded-lg bg-brand-soft px-3.5 py-2.5 text-sm font-semibold text-brand no-underline"
                    : "rounded-lg px-3.5 py-2.5 text-sm font-medium text-soft no-underline hover:text-ink"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {showAddBook && signedIn ? (
            <Link
              href="/upload"
              className="inline-flex h-11 items-center rounded-chip border border-line bg-white px-4 text-sm font-medium text-ink no-underline"
            >
              + Add book
            </Link>
          ) : null}
          {signedIn ? (
            <div
              aria-label={viewerName ? `Signed in as ${viewerName}` : "Account"}
              title={viewerName}
              role="img"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white"
            >
              {initial}
            </div>
          ) : (
            <Link
              href="/signin"
              className="inline-flex h-11 items-center rounded-chip bg-brand px-4 text-sm font-semibold text-white no-underline"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
