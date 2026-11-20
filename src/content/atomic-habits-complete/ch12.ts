import type { Chapter } from "@/lib/types";

export const ch12: Omit<Chapter, "bankQuestions"> = {
  id: "ch-12-least-effort",
  number: 12,
  title: "The Law of Least Effort",
  shortTitle: "Least Effort",
  part: "The 3rd Law · Make It Easy",
  teaser: "Human behavior follows the path of least resistance — redesign friction.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Energy is precious. We naturally gravitate toward the option that requires the least work. Reduce friction for good habits; increase friction for bad ones.",
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
          title: "Least effort wins",
          body: "If two options deliver similar rewards, people pick the easier one.",
        },
        {
          title: "Environment reset",
          body: "Prep the kitchen, the gym bag, the document template — make the next action half-done.",
        },
        {
          title: "Addition by subtraction",
          body: "Remove steps, tools, and decisions that slow the good habit.",
        },
        {
          title: "Add steps to bad habits",
          body: "Distance, delay, and inconvenience are features.",
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
          title: "Reduce friction",
          body: "Fewer steps to start.",
          icon: "focus",
        },
        {
          title: "Increase friction",
          body: "More steps to slip.",
          icon: "meaning",
        },
        {
          title: "Prime",
          body: "Set the stage the night before.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Make doing the right thing as easy as possible, and doing the wrong thing as hard as possible.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Remove two minutes of setup from your key habit.",
        "Add two minutes of friction to a bad habit.",
        "Prime tomorrow’s environment before bed."
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
      id: "q12-scale-a",
      prompt: "How much friction blocks my good habit?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q12-text-a",
      prompt: "What friction will I add to a bad habit?",
      type: "text",
    },
    {
      id: "q12-scale-b",
      prompt: "What can I prime tonight?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q12-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q12-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
