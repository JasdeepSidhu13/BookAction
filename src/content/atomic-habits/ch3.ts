import type { Chapter } from "@/lib/types";

export const ch3: Omit<Chapter, "bankQuestions"> = {
  id: "ch-3-four-laws",
  number: 3,
  title: "How to Build Better Habits in 4 Simple Steps",
  shortTitle: "Four Laws",
  part: "The fundamentals · Why tiny changes make a big difference",
  teaser:
    "Cue, craving, response, reward — the habit loop — and the Four Laws that build or break it.",
  readMinutes: 12,
  summary: [
    {
      type: "bigIdea",
      text: "Every habit runs cue → craving → response → reward. To build good habits: make them obvious, attractive, easy, and satisfying. To break bad ones, invert each law.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "laws", label: "Four Laws", color: "#155E75" },
        { id: "insight", label: "Key insight", color: "#B45309" },
        { id: "apply", label: "Apply it", color: "#166534" },
        { id: "watch", label: "Watch out for", color: "#BE123C" },
      ],
    },
    {
      type: "keyIdeas",
      id: "key",
      title: "The habit loop",
      accent: "#3730A3",
      ideas: [
        {
          title: "Cue",
          body: "A bit of information that predicts a reward — time, location, emotion, people, or a preceding action.",
        },
        {
          title: "Craving",
          body: "The motivational force. You don’t crave the habit itself; you crave the change in state it delivers.",
        },
        {
          title: "Response",
          body: "The thought or action — which only happens if you are motivated and able enough.",
        },
        {
          title: "Reward",
          body: "Satisfies the craving and teaches your brain which actions to remember next time.",
        },
      ],
    },
    {
      type: "cards",
      id: "laws",
      title: "The Four Laws of Behavior Change",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "1 · Make it obvious",
          body: "Design clear cues. Bad habits: make them invisible.",
          icon: "focus",
        },
        {
          title: "2 · Make it attractive",
          body: "Pair with want. Bad habits: make them unattractive.",
          icon: "meaning",
        },
        {
          title: "3 · Make it easy",
          body: "Reduce friction. Bad habits: increase friction.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The fourth law completes the set: make it satisfying — or, for bad habits, unsatisfying. Behavior that is rewarded gets repeated; behavior that is punished gets avoided.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Map one good habit through cue → craving → response → reward.",
        "Map one bad habit the same way — find the weakest link.",
        "Choose which of the Four Laws you will redesign first this week.",
      ],
    },
    {
      type: "cards",
      id: "watch",
      title: "Watch out for",
      accent: "#BE123C",
      tone: "rose",
      items: [
        {
          title: "Motivation-only plans",
          body: "Relying on craving without redesigning cue, ease, or reward.",
          icon: "warn",
        },
        {
          title: "Skipping the invert",
          body: "Building good habits while leaving bad-habit cues fully armed.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q3-loop",
      prompt: "How clearly can I see the cue–craving–response–reward loop in my key habit?",
      type: "scale",
      help: "Scale · 1 = opaque, 10 = fully mapped",
    },
    {
      id: "q3-law",
      prompt: "Which of the Four Laws will I redesign first — and for which habit?",
      type: "text",
    },
    {
      id: "q3-bad",
      prompt: "How intentional am I about inverting the laws for a bad habit?",
      type: "scale",
      help: "Scale · 1 = ignoring it, 10 = actively redesigning",
    },
    {
      id: "q3-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q3-commitment",
      prompt: "What one loop change will I make this week?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
