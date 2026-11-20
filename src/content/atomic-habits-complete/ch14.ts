import type { Chapter } from "@/lib/types";

export const ch14: Omit<Chapter, "bankQuestions"> = {
  id: "ch-14-inevitable-habits",
  number: 14,
  title: "How to Make Good Habits Inevitable and Bad Habits Impossible",
  shortTitle: "Inevitable",
  part: "The 3rd Law · Make It Easy",
  teaser: "Commitment devices lock future behavior before temptation arrives.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "The best way to break a bad habit is to make it impractical to do. The best way to build a good habit is to make it hard to avoid — with commitment devices decided in advance.",
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
          title: "Commitment devices",
          body: "Choices you make now that control your actions later — auto-pay, blockers, packed lunches, public plans.",
        },
        {
          title: "One-time decisions",
          body: "A single setup (unsubscribe, move the TV, buy a smaller plate) pays forever.",
        },
        {
          title: "Make bad habits impossible",
          body: "Increase the steps until the habit is no longer worth it.",
        },
        {
          title: "Make good habits inevitable",
          body: "Defaults, automation, and social locks that fire without fresh motivation.",
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
          title: "Automate",
          body: "Default the good path.",
          icon: "focus",
        },
        {
          title: "Block",
          body: "Cut off the bad path.",
          icon: "meaning",
        },
        {
          title: "Decide once",
          body: "Solve tomorrow’s temptation today.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Future you is often tired and tempted. Design constraints that make the right action the path of least resistance.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Install one commitment device for a good habit.",
        "Add one blocker for a bad habit.",
        "Make one one-time decision that remakes a default."
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
      id: "q14-scale-a",
      prompt: "What commitment device will I install?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q14-text-a",
      prompt: "How can I make a bad habit impractical?",
      type: "text",
    },
    {
      id: "q14-scale-b",
      prompt: "What one-time decision would help forever?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q14-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q14-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
