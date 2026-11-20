import type { Chapter } from "@/lib/types";

export const ch4: Omit<Chapter, "bankQuestions"> = {
  id: "ch-4-man-who-didnt-look-right",
  number: 4,
  title: "The Man Who Didn’t Look Right",
  shortTitle: "Awareness",
  part: "The 1st Law · Make It Obvious",
  teaser: "You can’t change what you don’t notice — point and call your habits into awareness.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Before you can build better habits, you must become aware of your current ones. Pointing-and-calling — and a habit scorecard — make the invisible visible.",
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
          title: "Nonconscious habits",
          body: "Much of daily behavior runs on autopilot. Awareness is the first intervention.",
        },
        {
          title: "Pointing-and-calling",
          body: "Name the cue and the action out loud (or on paper) to raise attention before you change it.",
        },
        {
          title: "Habits scorecard",
          body: "List daily habits and mark +, −, or = without judgment first — honesty before redesign.",
        },
        {
          title: "No blame, then change",
          body: "Observe neutrally. Then decide what to keep, drop, or redesign.",
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
          title: "Notice",
          body: "Catch autopilot in the act.",
          icon: "focus",
        },
        {
          title: "Name",
          body: "Say the cue and the habit.",
          icon: "meaning",
        },
        {
          title: "Score",
          body: "Mark helpful, harmful, or neutral.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The process of behavior change always starts with awareness. You need to know your habits before you can change them.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write a one-day habit scorecard tonight.",
        "Point-and-call one automatic habit tomorrow morning.",
        "Circle one − habit to redesign this week."
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
      id: "q4-scale-a",
      prompt: "How aware am I of my automatic habits?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q4-text-a",
      prompt: "What did my scorecard reveal?",
      type: "text",
    },
    {
      id: "q4-scale-b",
      prompt: "Which unnoticed habit costs me most?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q4-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q4-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
