import type { SummaryBlock } from "@/lib/types";

function SectionAccent({ color }: { color: string }) {
  return <span className="h-6 w-1 rounded-sm" style={{ background: color }} />;
}

function IdeaIcon({ kind }: { kind?: string }) {
  if (kind === "focus") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#155E75" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  if (kind === "meaning") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#155E75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 6h16M4 12h10M4 18h6" />
      </svg>
    );
  }
  if (kind === "action") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#155E75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    );
  }
  return null;
}

const toneClasses = {
  teal: {
    card: "bg-teal-soft",
    title: "text-teal-ink",
    body: "text-teal-mid",
  },
  rose: {
    card: "bg-rose-soft",
    title: "text-rose-deep",
    body: "text-rose-mid",
  },
  amber: {
    card: "bg-amber-soft",
    title: "text-amber-ink",
    body: "text-amber-mid",
  },
  green: {
    card: "bg-success-soft",
    title: "text-success-ink",
    body: "text-success",
  },
} as const;

export function SummaryBlocks({ blocks }: { blocks: SummaryBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "bigIdea") {
          return (
            <section
              key={`big-${index}`}
              aria-labelledby="big"
              className="flex flex-col gap-3.5 rounded-card bg-brand-dark p-7 text-white sm:p-9"
            >
              <span id="big" className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-mist">
                The big idea
              </span>
              <p className="m-0 font-display text-[1.5rem] font-semibold leading-[1.35] tracking-tight sm:text-[28px]">
                {block.text}
              </p>
            </section>
          );
        }

        if (block.type === "toc") {
          return (
            <section
              key={`toc-${index}`}
              aria-labelledby="toc"
              className="flex flex-col gap-3.5 rounded-tile border border-line bg-white px-6 py-6"
            >
              <h2 id="toc" className="m-0 text-[13px] font-semibold uppercase tracking-[0.08em] text-muted">
                In this chapter
              </h2>
              <div className="grid grid-cols-1 gap-2.5 text-[15px] sm:grid-cols-2 sm:gap-x-7">
                {block.items.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="flex items-center gap-2.5 text-ink no-underline">
                    <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: item.color }} />
                    {item.label}
                  </a>
                ))}
              </div>
            </section>
          );
        }

        if (block.type === "keyIdeas") {
          return (
            <section id={block.id} key={block.id} aria-labelledby={`${block.id}-h`} className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <SectionAccent color={block.accent} />
                <h2 id={`${block.id}-h`} className="m-0 font-display text-[26px] font-bold">
                  {block.title}
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {block.ideas.map((idea, i) => (
                  <div
                    key={idea.title}
                    className="flex gap-4 rounded-tile border border-line bg-white px-5 py-5 sm:gap-5 sm:px-6 sm:py-[22px]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-brand-soft font-display text-[15px] font-bold text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="m-0 text-[17px] font-semibold">{idea.title}</h3>
                      <p className="m-0 text-base leading-[1.65] text-[#3F3F46]">{idea.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        if (block.type === "cards") {
          const tone = toneClasses[block.tone];
          return (
            <section id={block.id} key={block.id} aria-labelledby={`${block.id}-h`} className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <SectionAccent color={block.accent} />
                <h2 id={`${block.id}-h`} className="m-0 font-display text-[26px] font-bold">
                  {block.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {block.items.map((item) => (
                  <div key={item.title} className={`flex flex-col gap-2.5 rounded-tile p-5 sm:p-6 ${tone.card}`}>
                    {block.tone === "teal" ? <IdeaIcon kind={item.icon} /> : null}
                    <h3 className={`m-0 text-lg font-semibold ${tone.title}`}>{item.title}</h3>
                    <p className={`m-0 text-[15px] leading-[1.6] ${tone.body}`}>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        if (block.type === "insight") {
          return (
            <section
              id={block.id}
              key={block.id}
              aria-labelledby={`${block.id}-h`}
              className="flex gap-5 rounded-card bg-amber-soft p-7 sm:p-8"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B45309"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="shrink-0"
              >
                <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z" />
              </svg>
              <div className="flex flex-col gap-2.5">
                <h2 id={`${block.id}-h`} className="m-0 text-[13px] font-semibold uppercase tracking-[0.08em] text-amber-ink">
                  Key insight
                </h2>
                <p className="m-0 font-display text-[22px] font-semibold leading-[1.45] text-amber-deep">{block.text}</p>
              </div>
            </section>
          );
        }

        if (block.type === "apply") {
          return (
            <section id={block.id} key={block.id} aria-labelledby={`${block.id}-h`} className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <SectionAccent color={block.accent} />
                <h2 id={`${block.id}-h`} className="m-0 font-display text-[26px] font-bold">
                  {block.title}
                </h2>
              </div>
              <ul className="m-0 flex list-none flex-col rounded-tile bg-success-soft p-2">
                {block.items.map((item, i) => (
                  <li
                    key={item}
                    className={`flex gap-3.5 px-4 py-3.5 text-base leading-[1.55] text-success-ink ${
                      i > 0 ? "border-t border-[#D3EBDB]" : ""
                    }`}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          );
        }

        return null;
      })}
    </>
  );
}
