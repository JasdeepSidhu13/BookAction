import type { Chapter } from "@/lib/types";

export const ch20: Omit<Chapter, "bankQuestions"> = {
  id: "ch-20-downside-of-habits",
  number: 20,
  title: "The Downside of Creating Good Habits",
  shortTitle: "Downside",
  part: "Advanced tactics · From good to great",
  teaser: "Habits build mastery — then can blind you. Stay sensitive to feedback.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Habits create the foundation for mastery, but automaticity has a cost. As a habit becomes automatic, you can become less sensitive to feedback and slide into mindless repetition.",
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
          title: "Habits free attention",
          body: "Once basics are automatic, you can focus on higher-level craft.",
        },
        {
          title: "Autopilot dulls feedback",
          body: "“Good enough” can hide little errors and false plateaus.",
        },
        {
          title: "Establish, then refine",
          body: "Build the habit, then bring conscious attention back with review and deliberate practice.",
        },
        {
          title: "Hold identity lightly",
          body: "When identity locks too tightly to a method, you stop adapting — keep a growth margin.",
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
          title: "Review",
          body: "Catch what autopilot misses.",
          icon: "focus",
        },
        {
          title: "Coach",
          body: "Outside eyes see drift.",
          icon: "meaning",
        },
        {
          title: "Learn edge",
          body: "Keep one variable conscious.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The upside of habits is efficiency; the downside is getting used to doing things a certain way and stopping improvement. Keep reflecting.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Audit one automatic habit for shortcuts.",
        "Add one deliberate-practice variable.",
        "Ask a trusted person what drift they notice."
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
      id: "q20-scale-a",
      prompt: "Where has autopilot replaced improvement?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q20-text-a",
      prompt: "What will I bring back under review?",
      type: "text",
    },
    {
      id: "q20-scale-b",
      prompt: "How flexible is my identity around methods?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q20-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q20-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
