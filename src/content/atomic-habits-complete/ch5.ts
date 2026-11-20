import type { Chapter } from "@/lib/types";

export const ch5: Omit<Chapter, "bankQuestions"> = {
  id: "ch-5-best-way-to-start",
  number: 5,
  title: "The Best Way to Start a New Habit",
  shortTitle: "Implementation",
  part: "The 1st Law · Make It Obvious",
  teaser: "Implementation intentions and habit stacking beat vague motivation.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Many people think they lack motivation when what they lack is clarity. Decide beforehand: “I will [BEHAVIOR] at [TIME] in [LOCATION]” — or stack onto a habit you already do.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Focus", color: "#155E75" },
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
          title: "Implementation intentions",
          body: "When situation X arises, I will perform response Y. Time and place are the strongest common cues.",
        },
        {
          title: "Habit stacking",
          body: "After [CURRENT HABIT], I will [NEW HABIT]. Attach new behavior to a reliable anchor.",
        },
        {
          title: "Diderot effect warning",
          body: "One purchase or habit can cascade — stack intentionally, not impulsively.",
        },
        {
          title: "Specificity removes negotiation",
          body: "Vague plans invite delay. Exact cues invite action.",
        }
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Focus",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Time + place",
          body: "Lock both before the day begins.",
          icon: "focus",
        },
        {
          title: "Stable anchor",
          body: "Coffee, commute, brushing teeth.",
          icon: "meaning",
        },
        {
          title: "One stack",
          body: "One new habit per anchor at first.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Give your habits a time and a place — or a habit that already has both — and follow-through rises.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write one implementation intention for tomorrow.",
        "Create one habit stack on an unbreakable anchor.",
        "Remove one vague “I’ll try to…” from your plan."
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
          title: "Skipping the practice",
          body: "Collecting ideas without casting a vote in behavior today.",
          icon: "warn",
        },
        {
          title: "All-or-nothing",
          body: "Waiting for perfect conditions instead of a two-minute start.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q5-scale-a",
      prompt: "How specific is my next habit plan?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q5-text-a",
      prompt: "What stack will I use?",
      type: "text",
    },
    {
      id: "q5-scale-b",
      prompt: "Where am I still relying on vague intent?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q5-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q5-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
