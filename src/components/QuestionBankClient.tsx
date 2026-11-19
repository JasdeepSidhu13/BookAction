"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { BankAnswerRow, BankQuestion, CustomQuestionRow } from "@/lib/types";

type ChapterOption = {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  bankCount: number;
};

type Props = {
  bookId: string;
  bookTitle: string;
  chapters: ChapterOption[];
  selectedChapterId: string;
  catalog: BankQuestion[];
  custom: CustomQuestionRow[];
  latestByKey: Record<string, { answerText: string | null; valueNumber: number | null; updatedAt: string }>;
  history: BankAnswerRow[];
  insights: {
    totalAnswers: number;
    chaptersTouched: number;
    answersLast7Days: number;
    chapterActivity: {
      chapterId: string;
      number: number;
      title: string;
      answerCount: number;
      uniqueQuestions: number;
    }[];
  };
};

export function QuestionBankClient(props: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [filter, setFilter] = useState("");
  const [section, setSection] = useState<string>("all");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [customPrompt, setCustomPrompt] = useState("");
  const [status, setStatus] = useState<string>("");
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const sections = useMemo(() => {
    const set = new Set<string>();
    for (const q of props.catalog) if (q.section) set.add(q.section);
    return ["all", ...Array.from(set)];
  }, [props.catalog]);

  const visible = props.catalog.filter((q) => {
    if (section !== "all" && q.section !== section) return false;
    if (!filter.trim()) return true;
    return q.prompt.toLowerCase().includes(filter.trim().toLowerCase());
  });

  const answeredCount = props.catalog.filter((q) => props.latestByKey[q.id]?.answerText).length;

  function selectChapter(chapterId: string) {
    startTransition(() => {
      router.push(`/question-bank?book=${props.bookId}&chapter=${chapterId}`);
    });
  }

  async function saveAnswer(input: {
    key: string;
    questionId?: string | null;
    questionText: string;
    source: "catalog" | "custom";
  }) {
    const text = drafts[input.key] ?? props.latestByKey[input.key]?.answerText ?? "";
    if (!text.trim()) {
      setStatus("Write an answer before saving.");
      return;
    }
    setSavingKey(input.key);
    setStatus("Saving…");
    try {
      const res = await fetch("/api/question-bank", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "answer",
          bookId: props.bookId,
          chapterId: props.selectedChapterId,
          questionId: input.questionId,
          questionText: input.questionText,
          answerText: text,
          source: input.source,
        }),
      });
      if (!res.ok) throw new Error("save failed");
      setStatus("Saved — logged for progress & insights.");
      router.refresh();
    } catch {
      setStatus("Save failed. Try again.");
    } finally {
      setSavingKey(null);
    }
  }

  async function addCustom() {
    if (!customPrompt.trim()) return;
    setStatus("Adding question…");
    const res = await fetch("/api/question-bank", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        action: "add_question",
        bookId: props.bookId,
        chapterId: props.selectedChapterId,
        prompt: customPrompt,
      }),
    });
    if (!res.ok) {
      setStatus("Could not add question.");
      return;
    }
    setCustomPrompt("");
    setStatus("Question added to this chapter’s bank.");
    router.refresh();
  }

  const selected = props.chapters.find((c) => c.id === props.selectedChapterId);

  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-10 sm:px-8 sm:pb-20">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand">
            {props.bookTitle}
          </span>
          <h1 className="m-0 font-display text-4xl font-bold tracking-tight">Question Bank</h1>
          <p className="m-0 max-w-2xl text-[15px] leading-[1.6] text-soft">
            Answer the full set of chapter questions, add your own, and build a history we use for
            progress tracking and insights.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Stat label="Answers logged" value={String(props.insights.totalAnswers)} />
          <Stat label="Chapters touched" value={String(props.insights.chaptersTouched)} />
          <Stat label="Last 7 days" value={String(props.insights.answersLast7Days)} />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 items-start">
        <aside className="flex min-w-0 flex-[1_1_260px] max-w-[320px] flex-col gap-3 rounded-card border border-line bg-white p-5">
          <h2 className="m-0 font-display text-lg font-bold">Chapters</h2>
          {props.chapters.map((ch) => {
            const active = ch.id === props.selectedChapterId;
            const activity = props.insights.chapterActivity.find((a) => a.chapterId === ch.id);
            return (
              <button
                key={ch.id}
                type="button"
                disabled={pending}
                onClick={() => selectChapter(ch.id)}
                className={
                  active
                    ? "rounded-chip bg-brand-soft px-3 py-3 text-left text-sm font-semibold text-brand"
                    : "rounded-chip px-3 py-3 text-left text-sm text-ink hover:bg-canvas"
                }
              >
                <span className="block">
                  {ch.number} · {ch.shortTitle}
                </span>
                <span className="mt-1 block text-[12px] font-medium text-muted">
                  {ch.bankCount} catalog · {activity?.answerCount ?? 0} answers
                </span>
              </button>
            );
          })}
        </aside>

        <section className="flex min-w-0 flex-[999_1_560px] flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-panel border border-line bg-white p-5">
            <div>
              <h2 className="m-0 font-display text-xl font-bold">
                Chapter {selected?.number}: {selected?.title}
              </h2>
              <p className="mt-1 mb-0 text-sm text-muted">
                {answeredCount} of {props.catalog.length} catalog questions answered
                {props.custom.length ? ` · ${props.custom.length} custom` : ""}
              </p>
            </div>
            <Link
              href={`/books/${props.bookId}/chapters/${props.selectedChapterId}/action`}
              className="inline-flex h-11 items-center rounded-chip bg-brand-soft px-4 text-sm font-semibold text-brand no-underline"
            >
              Open check-in →
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter questions…"
              className="h-11 min-w-[200px] flex-1 rounded-chip border border-line2 bg-white px-4 text-sm"
            />
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="h-11 rounded-chip border border-line2 bg-white px-3 text-sm font-medium"
            >
              {sections.map((s) => (
                <option key={s} value={s}>
                  {s === "all" ? "All sections" : s}
                </option>
              ))}
            </select>
          </div>

          {status ? <p className="m-0 text-sm font-medium text-brand">{status}</p> : null}

          <div className="flex flex-col gap-4">
            {visible.map((question, index) => {
              const latest = props.latestByKey[question.id];
              const value = drafts[question.id] ?? latest?.answerText ?? "";
              return (
                <article
                  key={question.id}
                  className="flex flex-col gap-3 rounded-panel border border-line bg-white p-6"
                >
                  <div className="flex flex-wrap items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-chip bg-brand-soft font-display text-sm font-bold text-brand">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      {question.section ? (
                        <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-muted">
                          {question.section}
                        </span>
                      ) : null}
                      <p className="m-0 text-[17px] font-semibold leading-[1.4]">{question.prompt}</p>
                      {latest?.updatedAt ? (
                        <p className="mt-1 mb-0 text-[12px] text-muted">
                          Last answered{" "}
                          {new Date(latest.updatedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <textarea
                    rows={3}
                    value={value}
                    onChange={(e) =>
                      setDrafts((prev) => ({ ...prev, [question.id]: e.target.value }))
                    }
                    placeholder="Write your answer…"
                    className="w-full resize-y rounded-control border border-line2 bg-[#FCFCFA] px-4 py-3 text-base leading-[1.6]"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={savingKey === question.id}
                      onClick={() =>
                        void saveAnswer({
                          key: question.id,
                          questionId: question.id,
                          questionText: question.prompt,
                          source: "catalog",
                        })
                      }
                      className="h-11 rounded-chip bg-brand px-5 text-sm font-semibold text-white disabled:opacity-60"
                    >
                      {savingKey === question.id ? "Saving…" : "Save answer"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <section className="flex flex-col gap-4 rounded-card border border-line bg-white p-6">
            <h3 className="m-0 font-display text-lg font-bold">Your questions for this chapter</h3>
            <p className="m-0 text-sm text-soft">
              Add a question you want to revisit over time. Answers are linked to this chapter and
              feed the same insight history.
            </p>
            <div className="flex flex-wrap gap-3">
              <input
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Type a new question…"
                className="h-11 min-w-[240px] flex-1 rounded-chip border border-line2 px-4 text-sm"
              />
              <button
                type="button"
                onClick={() => void addCustom()}
                className="h-11 rounded-chip border border-line bg-canvas px-4 text-sm font-semibold"
              >
                + Add question
              </button>
            </div>
            {props.custom.map((cq) => {
              const key = `custom:${cq.id}`;
              const latest = props.latestByKey[key];
              const value = drafts[key] ?? latest?.answerText ?? "";
              return (
                <article key={cq.id} className="flex flex-col gap-3 rounded-tile border border-line p-5">
                  <p className="m-0 text-[16px] font-semibold">{cq.prompt}</p>
                  <textarea
                    rows={3}
                    value={value}
                    onChange={(e) => setDrafts((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="w-full resize-y rounded-control border border-line2 bg-[#FCFCFA] px-4 py-3 text-base"
                    placeholder="Your answer…"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        void saveAnswer({
                          key,
                          questionId: key,
                          questionText: cq.prompt,
                          source: "custom",
                        })
                      }
                      className="h-10 rounded-chip bg-brand px-4 text-sm font-semibold text-white"
                    >
                      Save answer
                    </button>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="flex flex-col gap-3 rounded-card border border-line bg-white p-6">
            <h3 className="m-0 font-display text-lg font-bold">Recent answers</h3>
            {props.history.length === 0 ? (
              <p className="m-0 text-sm text-muted">No answers yet for this chapter.</p>
            ) : (
              props.history.slice(0, 12).map((h) => (
                <div key={h.id} className="border-b border-wash py-3 last:border-0">
                  <p className="m-0 text-[13px] font-semibold text-muted">
                    {new Date(h.updated_at).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="mt-1 mb-0 text-sm font-semibold">{h.question_text}</p>
                  <p className="mt-1 mb-0 text-sm leading-[1.55] text-soft">{h.answer_text}</p>
                </div>
              ))
            )}
          </section>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-[100px] rounded-tile border border-line bg-white px-4 py-3">
      <div className="text-[12px] font-medium text-muted">{label}</div>
      <div className="font-display text-2xl font-bold">{value}</div>
    </div>
  );
}
