"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";

type Insight = {
  kind: "progress" | "attention" | "pattern" | "focus";
  title: string;
  body: string;
  href?: string;
  cta?: string;
  commitmentId?: number;
};

type Props = {
  books: { id: string; title: string }[];
  selectedBookId: string;
  range: string;
  growthPoints: { date: string; score: number }[];
  chapterStats: {
    chapterId: string;
    number: number;
    title: string;
    latest: number | null;
    delta: number | null;
  }[];
  heatmap: number[];
  insights: Insight[];
  questionChanges: {
    label: string;
    chapterNumber: number;
    first: number;
    latest: number;
    change: number;
  }[];
  kpis: {
    growthIndex: number | null;
    growthDelta: number | null;
    followThrough: number | null;
    streak: number;
    openCommitments: number;
    overdueCount: number;
    overdueDays: number;
  };
};

export function ProgressClient(props: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function updateQuery(next: Record<string, string>) {
    const params = new URLSearchParams({
      book: props.selectedBookId,
      range: props.range,
      ...next,
    });
    startTransition(() => router.push(`/progress?${params.toString()}`));
  }

  async function markDone(id: number) {
    await fetch("/api/commitments", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  }

  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-7 px-4 py-10 sm:px-8 sm:pb-20">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand">
            {props.books.find((b) => b.id === props.selectedBookId)?.title}
          </span>
          <h1 className="m-0 font-display text-4xl font-bold tracking-tight sm:text-[40px]">Your progress</h1>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <label className="flex flex-col gap-1 text-xs font-medium text-soft">
            Book
            <select
              className="h-11 rounded-chip border border-line2 bg-white px-3.5 text-sm font-medium text-ink"
              value={props.selectedBookId}
              onChange={(e) => updateQuery({ book: e.target.value })}
              disabled={pending}
            >
              {props.books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-soft">
            Range
            <select
              className="h-11 rounded-chip border border-line2 bg-white px-3.5 text-sm font-medium text-ink"
              value={props.range}
              onChange={(e) => updateQuery({ range: e.target.value })}
              disabled={pending}
            >
              <option value="8">Last 8 weeks</option>
              <option value="12">Last quarter</option>
              <option value="52">All time</option>
            </select>
          </label>
        </div>
      </div>

      <section aria-label="Key measures" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          label="Growth index"
          value={
            props.kpis.growthIndex != null ? (
              <>
                {props.kpis.growthIndex.toFixed(1)}
                <span className="text-base font-semibold text-muted"> / 10</span>
              </>
            ) : (
              "—"
            )
          }
          hint={
            props.kpis.growthDelta != null
              ? `${props.kpis.growthDelta >= 0 ? "▲" : "▼"} ${Math.abs(props.kpis.growthDelta).toFixed(1)} since first check-in`
              : "Complete check-ins to measure"
          }
          hintClass={props.kpis.growthDelta != null && props.kpis.growthDelta >= 0 ? "text-success font-semibold" : "text-soft"}
        />
        <Kpi
          label="Follow-through"
          value={props.kpis.followThrough != null ? `${props.kpis.followThrough}%` : "—"}
          hint="Committed actions completed"
        />
        <Kpi
          label="Check-in streak"
          value={
            <>
              {props.kpis.streak}
              <span className="text-base font-semibold text-muted"> weeks</span>
            </>
          }
          hint="Active weeks with submissions"
        />
        <Kpi
          label="Open commitments"
          value={String(props.kpis.openCommitments)}
          hint={
            props.kpis.overdueCount > 0
              ? `${props.kpis.overdueCount} overdue by ${props.kpis.overdueDays} day${props.kpis.overdueDays === 1 ? "" : "s"}`
              : "None overdue"
          }
          hintClass={props.kpis.overdueCount > 0 ? "text-rose-ink font-semibold" : "text-soft"}
        />
      </section>

      <div className="flex flex-wrap items-stretch gap-5">
        <section
          aria-labelledby="trend"
          className="flex min-w-0 flex-[999_1_560px] flex-col gap-4 rounded-card border border-line bg-white p-7"
        >
          <div className="flex flex-wrap justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h2 id="trend" className="m-0 font-display text-lg font-bold">
                Growth index over time
              </h2>
              <span className="text-[13px] text-muted">Average of all scale answers, per check-in</span>
            </div>
            <div className="flex items-center gap-4 text-[13px] text-soft">
              <span className="flex items-center gap-1.5">
                <span className="h-[3px] w-3.5 rounded-sm bg-brand" />
                Your score
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 border-t-2 border-dashed border-amber" />
                Your goal
              </span>
            </div>
          </div>
          <GrowthChart points={props.growthPoints} />
        </section>

        <section
          aria-labelledby="ch"
          className="flex min-w-0 flex-[1_1_320px] flex-col gap-5 rounded-card border border-line bg-white p-7"
        >
          <div className="flex flex-col gap-1">
            <h2 id="ch" className="m-0 font-display text-lg font-bold">
              By chapter
            </h2>
            <span className="text-[13px] text-muted">Latest score and change since first check-in</span>
          </div>
          {props.chapterStats.length === 0 ? (
            <p className="m-0 text-sm text-muted">No chapter scores yet.</p>
          ) : (
            props.chapterStats.map((ch) => (
              <div key={ch.chapterId} className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">
                    {ch.number} · {ch.title}
                  </span>
                  <span>
                    <strong>{ch.latest != null ? ch.latest.toFixed(1) : "—"}</strong>{" "}
                    {ch.delta != null ? (
                      <span className={ch.delta >= 0.3 ? "font-semibold text-success" : "font-semibold text-muted"}>
                        {ch.delta >= 0 ? "+" : ""}
                        {ch.delta.toFixed(1)}
                      </span>
                    ) : null}
                  </span>
                </div>
                <div className="h-2.5 rounded-[5px] bg-wash">
                  <div
                    className="h-full rounded-[5px]"
                    style={{
                      width: `${Math.min(100, ((ch.latest ?? 0) / 10) * 100)}%`,
                      background: (ch.latest ?? 0) >= 6 ? "#3730A3" : "#8B87D6",
                    }}
                  />
                </div>
              </div>
            ))
          )}
          <div className="mt-auto flex flex-col gap-2.5 border-t border-wash pt-4">
            <span className="text-[13px] font-medium text-soft">Check-ins, last 12 weeks</span>
            <div
              role="img"
              aria-label="Check-in activity heatmap"
              className="grid grid-cols-12 gap-[5px]"
            >
              {props.heatmap.map((count, i) => (
                <span
                  key={i}
                  className="aspect-square rounded"
                  style={{
                    background:
                      count === 0 ? "#EEEEEA" : count === 1 ? "#C7C9F5" : count === 2 ? "#8B87D6" : "#3730A3",
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      <section aria-labelledby="intel" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="intel" className="m-0 font-display text-2xl font-bold">
            Insights & next actions
          </h2>
          <span className="text-[13px] text-muted">Updated after each check-in</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {props.insights.map((insight) => (
            <InsightCard key={`${insight.kind}-${insight.title}`} insight={insight} onDone={markDone} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="movers"
        className="flex flex-col gap-4 rounded-card border border-line bg-white p-7"
      >
        <h2 id="movers" className="m-0 font-display text-lg font-bold">
          Question-level changes
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.06em] text-muted">
                <th className="border-b border-line px-3 py-2.5 font-semibold">Question</th>
                <th className="border-b border-line px-3 py-2.5 font-semibold">Chapter</th>
                <th className="border-b border-line px-3 py-2.5 text-right font-semibold">First</th>
                <th className="border-b border-line px-3 py-2.5 text-right font-semibold">Latest</th>
                <th className="border-b border-line px-3 py-2.5 text-right font-semibold">Change</th>
              </tr>
            </thead>
            <tbody>
              {props.questionChanges.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-4 text-muted">
                    Submit check-ins with scale questions to see changes.
                  </td>
                </tr>
              ) : (
                props.questionChanges.map((row) => (
                  <tr key={`${row.chapterNumber}-${row.label}`}>
                    <td className="border-b border-wash px-3 py-3.5">{row.label}</td>
                    <td className="border-b border-wash px-3 py-3.5 text-soft">Ch {row.chapterNumber}</td>
                    <td className="border-b border-wash px-3 py-3.5 text-right">{row.first}</td>
                    <td className="border-b border-wash px-3 py-3.5 text-right font-semibold">{row.latest}</td>
                    <td
                      className={`border-b border-wash px-3 py-3.5 text-right font-semibold ${
                        row.change > 0 ? "text-success" : row.change < 0 ? "text-rose-ink" : "text-muted"
                      }`}
                    >
                      {row.change > 0 ? "+" : ""}
                      {row.change}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function Kpi({
  label,
  value,
  hint,
  hintClass = "text-soft",
}: {
  label: string;
  value: ReactNode;
  hint: string;
  hintClass?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-tile border border-line bg-white p-[22px]">
      <span className="text-[13px] font-medium text-muted">{label}</span>
      <span className="font-display text-[34px] font-bold">{value}</span>
      <span className={`text-[13px] ${hintClass}`}>{hint}</span>
    </div>
  );
}

function InsightCard({
  insight,
  onDone,
}: {
  insight: Insight;
  onDone: (id: number) => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);
  if (insight.kind === "focus") {
    return (
      <div className="flex flex-col gap-3 rounded-panel bg-brand-dark p-6 text-white">
        <span className="self-start rounded-full bg-[#312E81] px-2.5 py-1 text-xs font-semibold text-brand-pale">
          This week&apos;s focus
        </span>
        <h3 className="m-0 text-[17px] font-semibold leading-[1.35]">{insight.title}</h3>
        <p className="m-0 text-sm leading-[1.6] text-brand-pale">{insight.body}</p>
        {insight.commitmentId ? (
          <button
            type="button"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              await onDone(insight.commitmentId!);
              setBusy(false);
            }}
            className="mt-auto h-11 self-start rounded-chip bg-white px-[18px] text-sm font-semibold text-brand-dark disabled:opacity-60"
          >
            {busy ? "Saving…" : insight.cta ?? "Mark as done"}
          </button>
        ) : null}
      </div>
    );
  }

  const tag =
    insight.kind === "progress"
      ? "bg-success-soft text-success"
      : insight.kind === "attention"
        ? "bg-rose-soft text-rose-ink"
        : "bg-amber-soft text-amber-ink";
  const tagLabel =
    insight.kind === "progress" ? "Progress" : insight.kind === "attention" ? "Needs attention" : "Pattern";

  return (
    <div className="flex flex-col gap-3 rounded-panel border border-line bg-white p-6">
      <span className={`self-start rounded-full px-2.5 py-1 text-xs font-semibold ${tag}`}>{tagLabel}</span>
      <h3 className="m-0 text-[17px] font-semibold leading-[1.35]">{insight.title}</h3>
      <p className="m-0 text-sm leading-[1.6] text-soft">{insight.body}</p>
      {insight.href && insight.cta ? (
        <Link href={insight.href} className="mt-auto text-sm font-semibold no-underline">
          {insight.cta}
        </Link>
      ) : null}
    </div>
  );
}

function GrowthChart({ points }: { points: { date: string; score: number }[] }) {
  if (points.length === 0) {
    return (
      <div className="flex h-[220px] items-center justify-center rounded-tile bg-canvas text-sm text-muted">
        Your growth chart will appear after you submit check-ins.
      </div>
    );
  }

  const width = 720;
  const height = 270;
  const left = 40;
  const right = 710;
  const topY = 30;
  const bottomY = 230;
  const min = 4;
  const max = 8;
  const goal = 8;

  const xs = points.map((_, i) => {
    if (points.length === 1) return (left + right) / 2;
    return left + 20 + (i * (right - left - 40)) / (points.length - 1);
  });
  const ys = points.map((p) => topY + ((max - p.score) / (max - min)) * (bottomY - topY));
  const poly = xs.map((x, i) => `${x},${ys[i]}`).join(" ");
  const goalY = topY + ((max - goal) / (max - min)) * (bottomY - topY);
  const last = points.length - 1;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img" aria-label="Growth index over time">
      <g fontFamily="Inter, sans-serif" fontSize="12" fill="#6B6B73">
        {[8, 7, 6, 5, 4].map((n, i) => {
          const y = topY + i * 50;
          return (
            <g key={n}>
              <line x1={left} y1={y} x2={right} y2={y} stroke={n === 4 ? "#D9D8D2" : "#EEEEEA"} />
              <text x="28" y={y + 4} textAnchor="end">
                {n}
              </text>
            </g>
          );
        })}
        {points.map((p, i) => (
          <text key={p.date} x={xs[i]} y="256" textAnchor="middle">
            {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </text>
        ))}
      </g>
      <line
        x1={left}
        y1={goalY}
        x2={right}
        y2={goalY}
        stroke="#B45309"
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <polyline
        points={poly}
        fill="none"
        stroke="#3730A3"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {xs.map((x, i) =>
        i === last ? null : (
          <circle key={x} cx={x} cy={ys[i]} r="4.5" fill="#FFFFFF" stroke="#3730A3" strokeWidth="2.5" />
        ),
      )}
      <circle cx={xs[last]} cy={ys[last]} r="6" fill="#3730A3" />
      <rect x={xs[last] - 32} y={ys[last] - 32} width="64" height="24" rx="6" fill="#1E1B4B" />
      <text
        x={xs[last]}
        y={ys[last] - 16}
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="12"
        fontWeight="600"
        fill="#FFFFFF"
      >
        {points[last].score.toFixed(1)}
      </text>
    </svg>
  );
}
