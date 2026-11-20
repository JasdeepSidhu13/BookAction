import type { Chapter } from "@/lib/types";

export const ch3: Omit<Chapter, "bankQuestions"> = {
  id: "ch-3-four-laws",
  number: 3,
  title: "How to Build Better Habits in 4 Simple Steps",
  shortTitle: "Four Laws",
  part: "The fundamentals",
  teaser:
    "Cue, craving, response, reward — and the Four Laws that make habits stick or break.",
  readMinutes: 11,
  summary: [
    {
      type: "bigIdea",
      text: "Every habit follows a four-step loop: cue, craving, response, reward. To build good habits, make them obvious, attractive, easy, and satisfying. To break bad ones, invert the laws.",
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
      title: "Key ideas",
      accent: "#3730A3",
      ideas: [
        {
          title: "Cue",
          body: "A bit of information that predicts a reward — time, place, emotion, people, preceding action.",
        },
        {
          title: "Craving",
          body: "The motivational force. You do not crave the habit itself; you crave the change in state it delivers.",
        },
        {
          title: "Response",
          body: "The actual habit — a thought or action — which only happens if you are motivated and able enough.",
        },
        {
          title: "Reward",
          body: "The end goal of every habit. Rewards satisfy and teach us which actions to repeat.",
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
          body: "Design clear cues. For bad habits: make them invisible.",
          icon: "focus",
        },
        {
          title: "2 · Make it attractive",
          body: "Pair with want. For bad habits: make them unattractive.",
          icon: "meaning",
        },
        {
          title: "3 · Make it easy",
          body: "Reduce friction. For bad habits: increase friction.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The fourth law completes the set: make it satisfying (or, for bad habits, make it unsatisfying). Behavior that is rewarded gets repeated.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Map one good habit through cue → craving → response → reward.",
        "Map one bad habit the same way — find the weakest link to break.",
        "Pick which of the Four Laws you will redesign first this week.",
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
          body: "Building good habits while leaving bad-habit cues fully armed in your environment.",
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
