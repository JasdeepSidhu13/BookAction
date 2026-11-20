/**
 * Smoke test for upload heuristics — run: npx tsx scripts/smoke-generate.mjs
 */
import { generateBookFromText } from "../src/lib/generateBook.ts";

const sample = `
THE INNER GAME
Jane Author

Table of Contents
Chapter 1: Start Where You Are ........................ 1
Chapter 2: Build Momentum ............................. 12
Chapter 3: Stay the Course ............................ 28

Chapter 1: Start Where You Are

Most people wait for certainty before they begin. Waiting feels responsible, but it quietly trains you to distrust your own judgment. The first move is rarely the perfect move — it is the move that puts you in contact with reality.

Clarity comes from contact, not contemplation. When you take a small step, feedback arrives that no amount of planning could invent. That feedback is the raw material of better decisions.

START SMALL
Pick one domain where delay has become a habit. Name the smallest action that would make the delay visible — a phone call, a draft, a calendar block. Do it today, imperfectly.

Chapter 2: Build Momentum

Momentum is not motivation. Motivation is a feeling; momentum is a sequence of kept promises. When you keep a small promise daily, identity shifts from "I intend" to "I do."

FRICTION IS INFORMATION
Every stalled habit points to a design problem, not a character flaw. Reduce the number of steps between intention and action. Put the cue where your eyes already go.

The people who look disciplined usually redesigned their environment so the right action is the easy action.

Chapter 3: Stay the Course

Long efforts fail when the finish line is the only reward. Attach meaning to the practice itself. Ask: who am I becoming by showing up when it is boring?

When setbacks arrive — and they will — treat them as data. Adjust the plan without rewriting the identity you chose in chapter one.
`.trim();

const book = await generateBookFromText({
  text: sample,
  filename: "inner-game.pdf",
  titleHint: "The Inner Game",
});

const problems = [];
if (book.chapters.length < 3) {
  problems.push(`expected >= 3 chapters, got ${book.chapters.length}`);
}
if (book.chapters.some((c) => /^Section\s/i.test(c.title))) {
  problems.push("fell back to Section titles");
}
for (const ch of book.chapters) {
  const big = ch.summary.find((b) => b.type === "bigIdea");
  if (!big || big.text.length < 40) problems.push(`${ch.title}: weak bigIdea`);
  if (/This chapter invites you to notice/i.test(big?.text ?? "")) {
    problems.push(`${ch.title}: generic bigIdea`);
  }
  const key = ch.summary.find((b) => b.type === "keyIdeas");
  if (!key || key.ideas.length < 2) problems.push(`${ch.title}: too few key ideas`);
  if (key?.ideas.some((i) => /^Key point\s/i.test(i.title))) {
    problems.push(`${ch.title}: generic key point titles`);
  }
  const apply = ch.summary.find((b) => b.type === "apply");
  if (!apply || apply.items.length < 3) problems.push(`${ch.title}: weak apply items`);
  if (ch.bankQuestions.length < 5) problems.push(`${ch.title}: thin question bank`);
}

if (problems.length) {
  console.error("FAIL\n" + problems.join("\n"));
  console.error(
    JSON.stringify(
      book.chapters.map((c) => ({
        title: c.title,
        big: c.summary.find((b) => b.type === "bigIdea")?.text,
        keys: c.summary.find((b) => b.type === "keyIdeas")?.ideas?.map((i) => i.title),
        apply: c.summary.find((b) => b.type === "apply")?.items,
      })),
      null,
      2,
    ),
  );
  process.exit(1);
}

console.log("OK", book.title, book.chapters.map((c) => c.title).join(" | "));
