"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import type { AnswerMap, Cadence, Question } from "@/lib/types";

type Props = {
  checkInId: number;
  bookId: string;
  chapterId: string;
  chapterTitle: string;
  checkInNumber: number;
  questions: Question[];
  initialAnswers: AnswerMap;
  previousAnswers: AnswerMap | null;
  firstAnswers: AnswerMap | null;
  previousDateLabel?: string | null;
  lastCommitment?: string | null;
  initialCadence: Cadence;
  chapterScore: number | null;
  chapterDelta: number | null;
  sparkline: number[];
  fromChapterNote: string;
  nextCheckInLabel: string;
};

export function CheckInForm(props: Props) {
  const router = useRouter();
  const [answers, setAnswers] = useState<AnswerMap>(props.initialAnswers);
  const [cadence, setCadence] = useState<Cadence>(props.initialCadence);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [pending, startTransition] = useTransition();
  const skipFirstAutosave = useRef(true);

  const answered = useMemo(() => {
    return props.questions.filter((q) => {
      const a = answers[q.id];
      if (!a) return false;
      if (q.type === "scale") return typeof a.valueNumber === "number";
      if (q.type === "choice") return Boolean(a.valueChoice);
      return Boolean(a.valueText?.trim());
    }).length;
  }, [answers, props.questions]);

  useEffect(() => {
    if (skipFirstAutosave.current) {
      skipFirstAutosave.current = false;
      return;
    }
    const timer = setTimeout(() => {
      void persist("draft", false);
    }, 700);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  async function persist(mode: "draft" | "submit", navigate: boolean) {
    setSaveState("saving");
    try {
      const res = await fetch("/api/check-ins", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          checkInId: props.checkInId,
          bookId: props.bookId,
          chapterId: props.chapterId,
          cadence,
          answers,
          mode,
        }),
      });
      if (!res.ok) throw new Error("save failed");
      setSaveState("saved");
      if (navigate) {
        startTransition(() => router.push("/progress"));
        router.refresh();
      }
    } catch {
      setSaveState("error");
    }
  }

  async function updateCadence(next: Cadence) {
    setCadence(next);
    await fetch("/api/check-ins", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        bookId: props.bookId,
        chapterId: props.chapterId,
        cadence: next,
      }),
    });
  }

  function setScale(questionId: string, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: { ...prev[questionId], valueNumber: value } }));
  }

  function setText(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: { ...prev[questionId], valueText: value } }));
  }

  function setChoice(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: { ...prev[questionId], valueChoice: value } }));
  }

  const progressPct = Math.round((answered / props.questions.length) * 100);

  return (
    <div className="flex flex-wrap gap-7 items-start">
      <form
        aria-label="Check-in questions"
        className="flex min-w-0 flex-[999_1_600px] flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          void persist("submit", true);
        }}
      >
        <div className="flex items-center gap-4 rounded-tile border border-line bg-white px-6 py-[18px]">
          <span className="whitespace-nowrap text-sm font-semibold">
            {answered} of {props.questions.length} answered
          </span>
          <div className="h-2 flex-1 overflow-hidden rounded bg-wash">
            <div className="h-full rounded bg-brand transition-all" style={{ width: `${progressPct}%` }} />
          </div>
          <span
            className={`whitespace-nowrap text-[13px] text-muted ${saveState === "saved" ? "autosaved-pulse" : ""}`}
          >
            {saveState === "saving"
              ? "Saving…"
              : saveState === "error"
                ? "Save failed"
                : saveState === "saved"
                  ? "Autosaved"
                  : "Ready"}
          </span>
        </div>

        {props.questions.map((q, index) => {
          const answer = answers[q.id] ?? {};
          const prev = props.previousAnswers?.[q.id];
          const first = props.firstAnswers?.[q.id];

          if (q.type === "scale") {
            return (
              <fieldset
                key={q.id}
                className="m-0 flex flex-col gap-[18px] rounded-panel border border-line bg-white p-7"
              >
                <legend className="sr-only">Question {index + 1}</legend>
                <div className="flex items-start gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-chip bg-brand-soft font-display text-sm font-bold text-brand">
                    {index + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-semibold leading-[1.4]">{q.prompt}</span>
                    {q.help ? <span className="text-sm text-muted">{q.help}</span> : null}
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
                    const pressed = answer.valueNumber === n;
                    return (
                      <button
                        key={n}
                        type="button"
                        aria-pressed={pressed}
                        aria-label={`Score ${n}`}
                        onPointerDown={(e) => {
                          e.preventDefault();
                          setScale(q.id, n);
                        }}
                        onClick={() => setScale(q.id, n)}
                        className={
                          pressed
                            ? "h-12 cursor-pointer rounded-chip border border-brand bg-brand text-[15px] font-semibold text-white"
                            : "h-12 cursor-pointer rounded-chip border border-[#E0DFD9] bg-white text-[15px] font-semibold text-[#3F3F46] hover:border-brand/40"
                        }
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-4 text-[13px] text-soft">
                  {typeof prev?.valueNumber === "number" ? (
                    <span>
                      Last check-in: <strong className="text-ink">{prev.valueNumber}</strong>
                    </span>
                  ) : null}
                  {typeof first?.valueNumber === "number" ? (
                    <span>
                      First check-in: <strong className="text-ink">{first.valueNumber}</strong>
                    </span>
                  ) : null}
                </div>
              </fieldset>
            );
          }

          if (q.type === "text") {
            return (
              <div key={q.id} className="flex flex-col gap-4 rounded-panel border border-line bg-white p-7">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-chip bg-brand-soft font-display text-sm font-bold text-brand">
                    {index + 1}
                  </span>
                  <label htmlFor={q.id} className="text-lg font-semibold leading-[1.4]">
                    {q.prompt}
                  </label>
                </div>
                <textarea
                  id={q.id}
                  rows={q.tracksCommitment ? 3 : 4}
                  placeholder={
                    q.tracksCommitment
                      ? "I've decided to… My first step, within 24 hours, is…"
                      : "Write freely — this is just for you."
                  }
                  value={answer.valueText ?? ""}
                  onChange={(e) => setText(q.id, e.target.value)}
                  className="w-full resize-y rounded-control border border-line2 bg-[#FCFCFA] px-4 py-3.5 text-base leading-[1.6] text-ink"
                />
                {prev?.valueText ? (
                  <div className="flex flex-col gap-1 rounded-control bg-canvas px-4 py-3.5">
                    <span className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">
                      Your answer{props.previousDateLabel ? ` · ${props.previousDateLabel}` : ""}
                    </span>
                    <span className="text-sm leading-[1.55] text-[#3F3F46]">{prev.valueText}</span>
                  </div>
                ) : null}
                {q.tracksCommitment ? (
                  <span className="text-[13px] text-soft">
                    This becomes the follow-up question in your next check-in.
                  </span>
                ) : null}
              </div>
            );
          }

          return (
            <fieldset
              key={q.id}
              className="m-0 flex flex-col gap-[18px] rounded-panel border border-line bg-white p-7"
            >
              <legend className="sr-only">Question {index + 1}</legend>
              <div className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-chip bg-brand-soft font-display text-sm font-bold text-brand">
                  {index + 1}
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-lg font-semibold leading-[1.4]">{q.prompt}</span>
                  {q.followsCommitment && props.lastCommitment ? (
                    <span className="text-sm text-muted">Last commitment: &quot;{props.lastCommitment}&quot;</span>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {(q.choices ?? []).map((choice) => {
                  const pressed = answer.valueChoice === choice;
                  const yesStyle =
                    choice === "Yes" && pressed
                      ? "border-success bg-success-soft text-success"
                      : pressed
                        ? "border-brand bg-brand-soft text-brand"
                        : "border-[#E0DFD9] bg-white text-[#3F3F46]";
                  return (
                    <button
                      key={choice}
                      type="button"
                      aria-pressed={pressed}
                      onPointerDown={(e) => {
                        e.preventDefault();
                        setChoice(q.id, choice);
                      }}
                      onClick={() => setChoice(q.id, choice)}
                      className={`h-11 min-w-24 cursor-pointer rounded-full border-[1.5px] px-5 text-[15px] font-semibold ${yesStyle}`}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          );
        })}

        <div className="flex flex-wrap justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => void persist("draft", false)}
            className="h-12 rounded-control border border-line2 bg-white px-[22px] text-[15px] font-semibold text-ink"
          >
            Save draft
          </button>
          <button
            type="submit"
            disabled={pending || answered === 0}
            className="inline-flex h-12 items-center rounded-control bg-brand px-[26px] text-[15px] font-semibold text-white disabled:opacity-60"
          >
            Submit check-in
          </button>
        </div>
      </form>

      <aside aria-label="Chapter progress" className="flex min-w-0 flex-[1_1_300px] flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span id="cad" className="text-[13px] font-medium text-soft">
            Repeat this check-in
          </span>
          <div
            role="radiogroup"
            aria-labelledby="cad"
            className="inline-flex gap-1 self-start rounded-control bg-track p-1"
          >
            {(["weekly", "monthly", "quarterly"] as Cadence[]).map((c) => {
              const checked = cadence === c;
              return (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  onClick={() => void updateCadence(c)}
                  className={
                    checked
                      ? "h-10 rounded-[9px] bg-white px-[18px] text-sm font-semibold text-ink shadow-tab"
                      : "h-10 rounded-[9px] bg-transparent px-[18px] text-sm font-medium text-soft"
                  }
                >
                  {c[0].toUpperCase() + c.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3.5 rounded-panel border border-line bg-white p-6">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted">Chapter score</span>
          <div className="flex items-baseline gap-2.5">
            <span className="font-display text-[40px] font-bold">
              {props.chapterScore != null ? props.chapterScore.toFixed(1) : "—"}
            </span>
            {props.chapterScore != null && props.chapterDelta != null && props.chapterDelta !== 0 ? (
              <span className="text-sm font-semibold text-success">
                {props.chapterDelta > 0 ? "▲" : "▼"} {Math.abs(props.chapterDelta).toFixed(1)} over time
              </span>
            ) : props.chapterScore != null ? (
              <span className="text-sm text-muted">Latest chapter average</span>
            ) : (
              <span className="text-sm text-muted">Complete a check-in to track</span>
            )}
          </div>
          <Sparkline values={props.sparkline} />
        </div>

        <div className="flex flex-col gap-2.5 rounded-panel bg-brand-soft p-6">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand">From the chapter</span>
          <p className="m-0 text-[15px] leading-[1.6] text-brand-dark">{props.fromChapterNote}</p>
        </div>

        <div className="flex flex-col gap-1.5 rounded-panel border border-line bg-white p-6">
          <span className="text-[13px] font-medium text-muted">Next check-in</span>
          <span className="text-[17px] font-semibold">{props.nextCheckInLabel}</span>
          <span className="text-[13px] text-soft">Based on your {cadence} cadence.</span>
        </div>
      </aside>
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2) {
    return (
      <div className="flex h-20 items-center text-[13px] text-muted">Score trend appears after 2 check-ins.</div>
    );
  }
  const min = Math.min(...values) - 0.5;
  const max = Math.max(...values) + 0.5;
  const w = 260;
  const h = 80;
  const points = values
    .map((v, i) => {
      const x = 10 + (i * (w - 20)) / (values.length - 1);
      const y = h - 10 - ((v - min) / (max - min)) * (h - 20);
      return `${x},${y}`;
    })
    .join(" ");
  const lastX = 10 + ((values.length - 1) * (w - 20)) / (values.length - 1);
  const lastY = h - 10 - ((values[values.length - 1] - min) / (max - min)) * (h - 20);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="80" role="img" aria-label="Chapter score over time">
      <line x1="0" y1="79" x2="260" y2="79" stroke="#E6E5E0" />
      <polyline
        points={points}
        fill="none"
        stroke="#3730A3"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={lastX} cy={lastY} r="4.5" fill="#3730A3" />
    </svg>
  );
}
