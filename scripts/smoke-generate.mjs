/**
 * Smoke test for upload heuristics — run: npm run test:generate
 */
import { generateBookFromText } from "../src/lib/generateBook.ts";

const chaptered = `
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

// Mimics books like Man's Search for Meaning: few/no "Chapter N" markers,
// long continuous parts, meaning/suffering/freedom vocabulary.
const franklLike = `
MAN'S SEARCH FOR PURPOSE
A. Narrator

Preface
This book is about how a person may keep an inner freedom even when outer freedom is taken away. It is not a complete history. It is a record of choices under pressure.

PART ONE
Experiences Under Extreme Pressure

In the camp, the question that haunted people was not "what do I expect from life?" but "what does life expect from me?" Suffering ceased to be a meaningless burden when it was turned into a task. Those who could find a why could bear almost any how.

Love was the highest goal a person could aspire to. I understood how a person who has nothing left may still know bliss in the contemplation of someone beloved. The salvation of man is through love and in love.

The last of the human freedoms is to choose one's attitude in any given set of circumstances. Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom.

Humor was another of the soul's weapons in the fight for self-preservation. It is well known that humor can afford an aloofness and an ability to rise above any situation. The attempt to develop a sense of humor and to see things in a humorous light is some kind of trick learned while mastering the art of living.

PART TWO
A Therapy of Meaning

Logotherapy focuses on the future, on the meanings to be fulfilled by the patient. What man actually needs is not a tensionless state but rather the striving and struggling for a worthwhile goal. What he needs is not the discharge of tension at any cost, but the call of a potential meaning waiting to be fulfilled.

Man's search for meaning is the primary motivation in his life. This meaning is unique and specific in that it must and can be fulfilled by him alone. Only then does it achieve a significance which will satisfy his own will to meaning.

There are three main avenues on which one arrives at meaning in life: by creating a work or doing a deed; by experiencing something or encountering someone; and by the attitude we take toward unavoidable suffering. Suffering ceases to be suffering at the moment it finds a meaning.

POSTSCRIPT
Tragic Optimism

Tragic optimism means that one is, and remains, optimistic in spite of the tragic triad of pain, guilt, and death. Saying yes to life in spite of everything presupposes that life is potentially meaningful under any conditions.
`.repeat(3); // lengthen so 5–7 section split engages

function assertBook(label, book, opts = {}) {
  const problems = [];
  const minCh = opts.minChapters ?? 3;
  if (book.chapters.length < minCh) {
    problems.push(`${label}: expected >= ${minCh} chapters, got ${book.chapters.length}`);
  }
  if (opts.maxChapters && book.chapters.length > opts.maxChapters) {
    problems.push(`${label}: expected <= ${opts.maxChapters} chapters, got ${book.chapters.length}`);
  }
  for (const ch of book.chapters) {
    const big = ch.summary.find((b) => b.type === "bigIdea");
    if (!big || big.text.length < 40) problems.push(`${label}/${ch.title}: weak bigIdea`);
    if (/This chapter (invites|asks) you/i.test(big?.text ?? "")) {
      problems.push(`${label}/${ch.title}: generic bigIdea`);
    }
    if (/Return to this (chapter|idea) when you notice yourself waiting/i.test(
      ch.summary.find((b) => b.type === "insight")?.text ?? "",
    )) {
      problems.push(`${label}/${ch.title}: generic insight`);
    }
    const key = ch.summary.find((b) => b.type === "keyIdeas");
    if (!key || key.ideas.length < 2) problems.push(`${label}/${ch.title}: too few key ideas`);
    const apply = ch.summary.find((b) => b.type === "apply");
    if (!apply || apply.items.length < 3) problems.push(`${label}/${ch.title}: weak apply`);
    if (ch.bankQuestions.length < 5) problems.push(`${label}/${ch.title}: thin bank`);
    if (opts.requireTerms) {
      const blob = [
        big?.text,
        ...((key?.ideas || []).map((i) => `${i.title} ${i.body}`)),
        ...ch.bankQuestions.map((q) => q.prompt),
      ]
        .join(" ")
        .toLowerCase();
      const hit = opts.requireTerms.some((t) => blob.includes(t.toLowerCase()));
      if (!hit) {
        problems.push(
          `${label}/${ch.title}: missing required terms (${opts.requireTerms.join(", ")})`,
        );
      }
    }
  }
  return problems;
}

const book1 = await generateBookFromText({
  text: chaptered,
  filename: "inner-game.pdf",
  titleHint: "The Inner Game",
});
const book2 = await generateBookFromText({
  text: franklLike,
  filename: "mans-search-for-purpose.pdf",
  titleHint: "Man's Search for Purpose",
  authorHint: "A. Narrator",
});

const problems = [
  ...assertBook("chaptered", book1, { minChapters: 3 }),
  ...assertBook("frankl-like", book2, {
    minChapters: 5,
    maxChapters: 7,
  }),
];

const franklBlob = book2.chapters
  .map((c) => {
    const big = c.summary.find((b) => b.type === "bigIdea")?.text ?? "";
    const keys = (c.summary.find((b) => b.type === "keyIdeas")?.ideas || [])
      .map((i) => `${i.title} ${i.body}`)
      .join(" ");
    const bank = c.bankQuestions.map((q) => q.prompt).join(" ");
    return `${c.title} ${big} ${keys} ${bank}`;
  })
  .join(" ")
  .toLowerCase();
const need = ["meaning", "freedom", "suffer", "love", "attitude"];
const missingTerms = need.filter((t) => !franklBlob.includes(t));
if (missingTerms.length) {
  problems.push(`frankl-like: book text missing themes: ${missingTerms.join(", ")}`);
}
if (book2.chapters.some((c) => /^Untitled/i.test(c.title) || /^Section\s/i.test(c.title))) {
  problems.push("frankl-like: weak section titles");
}

if (problems.length) {
  console.error("FAIL\n" + problems.join("\n"));
  console.error(
    "frankl chapters:",
    book2.chapters.map((c) => c.title),
  );
  console.error(
    JSON.stringify(
      book2.chapters.slice(0, 2).map((c) => ({
        title: c.title,
        big: c.summary.find((b) => b.type === "bigIdea")?.text,
        keys: c.summary.find((b) => b.type === "keyIdeas")?.ideas?.map((i) => i.title),
        bank: c.bankQuestions.slice(0, 3).map((q) => q.prompt),
      })),
      null,
      2,
    ),
  );
  process.exit(1);
}

console.log(
  "OK",
  `chaptered=${book1.chapters.length}`,
  `frankl-like=${book2.chapters.length}`,
  book2.chapters.map((c) => c.title).join(" | "),
);
