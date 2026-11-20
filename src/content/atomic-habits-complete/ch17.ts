import type { Chapter } from "@/lib/types";

export const ch17: Omit<Chapter, "bankQuestions"> = {
  id: "ch-17-accountability-partner",
  number: 17,
  title: "How an Accountability Partner Can Change Everything",
  shortTitle: "Accountability",
  part: "The 4th Law · Make It Satisfying",
  teaser: "A habit contract makes the cost of skipping social and immediate.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "We care deeply about what others think. An accountability partner — or a habit contract — makes the consequences of skipping immediate, social, and costly.",
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
          title: "Social cost",
          body: "Knowing someone will check raises follow-through.",
        },
        {
          title: "Habit contracts",
          body: "A written agreement with stakes — reputation, money, or favors.",
        },
        {
          title: "Good pain",
          body: "A small, clear penalty for missing beats vague guilt.",
        },
        {
          title: "Choose carefully",
          body: "Partners should notice and care — not nag vaguely.",
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
          title: "Partner",
          body: "Someone who will ask.",
          icon: "focus",
        },
        {
          title: "Contract",
          body: "Stakes in writing.",
          icon: "meaning",
        },
        {
          title: "Public",
          body: "A light social commitment.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Make the cost of inaction public and immediate, and consistency rises.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Ask one person to be your accountability check this month.",
        "Write a simple habit contract with a stake.",
        "Schedule a weekly check-in message."
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
      id: "q17-scale-a",
      prompt: "Who could hold me accountable?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q17-text-a",
      prompt: "What stake would make skipping costly?",
      type: "text",
    },
    {
      id: "q17-scale-b",
      prompt: "How public is my commitment?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q17-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q17-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
