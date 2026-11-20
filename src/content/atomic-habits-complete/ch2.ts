import type { Chapter } from "@/lib/types";

export const ch2: Omit<Chapter, "bankQuestions"> = {
  id: "ch-2-identity-habits",
  number: 2,
  title: "How Your Habits Shape Your Identity (and Vice Versa)",
  shortTitle: "Identity Habits",
  part: "The fundamentals · Why tiny changes make a big difference",
  teaser: "Every action is a vote for the person you wish to become.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Every action you take is a vote for the type of person you wish to become. Small habits provide evidence of a new identity — meaningful change does not require radical change.",
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
          title: "Three layers of change",
          body: "Outcomes (what you get), processes (what you do), identity (what you believe). Lasting change is identity change.",
        },
        {
          title: "Start with who",
          body: "“I am a runner” before “I want to run a marathon.” Habits embody the identity.",
        },
        {
          title: "Votes, not proofs",
          body: "Each page makes you a writer. Each workout makes you an athlete. Evidence accumulates.",
        },
        {
          title: "Two-step process",
          body: "Decide who you want to be. Prove it with small wins until your self-story updates.",
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
          title: "Outcomes",
          body: "Weight, money, titles.",
          icon: "focus",
        },
        {
          title: "Processes",
          body: "Routines and systems.",
          icon: "meaning",
        },
        {
          title: "Identity",
          body: "The story of who you are.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The most practical way to change who you are is to change what you do.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Complete: “I want to become the type of person who…”",
        "List three tiny identity votes for this week.",
        "Rewrite one limiting identity as a becoming statement."
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
      id: "q2-scale-a",
      prompt: "How clear is the person I am becoming?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q2-text-a",
      prompt: "What identity do my habits vote for now?",
      type: "text",
    },
    {
      id: "q2-scale-b",
      prompt: "How strong is this week’s evidence?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q2-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q2-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
