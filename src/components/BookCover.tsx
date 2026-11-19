export function BookCover({
  title,
  author,
  accent = "#F5B947",
  size = "md",
}: {
  title: string;
  author: string;
  accent?: string;
  size?: "sm" | "md" | "lg";
}) {
  if (size === "sm") {
    return (
      <span className="flex h-[62px] w-11 shrink-0 items-end rounded-[3px_6px_6px_3px] bg-brand-dark p-1.5">
        <span className="h-0.5 w-3.5 rounded-sm" style={{ background: accent }} />
      </span>
    );
  }

  const height = size === "lg" ? "h-[240px] w-[168px]" : "aspect-[7/10] w-full";
  return (
    <div
      className={`${height} flex shrink-0 flex-col justify-between rounded-[6px_12px_12px_6px] bg-brand-dark p-5 text-white shadow-cover`}
    >
      <span className="text-[11px] uppercase tracking-[0.12em] text-brand-mist">{author}</span>
      <span className="font-display text-[22px] font-bold leading-[1.15]">{title}</span>
      <span className="h-1 w-8 rounded-sm" style={{ background: accent }} />
    </div>
  );
}
