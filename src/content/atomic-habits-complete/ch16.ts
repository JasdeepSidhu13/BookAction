import type { Chapter } from "@/lib/types";

export const ch16: Omit<Chapter, "bankQuestions"> = {
  id: "ch-16-stick-every-day",
  number: 16,
  title: "How to Stick with Good Habits Every Day",
  shortTitle: "Stick With It",
  part: "The 4th Law · Make It Satisfying",
  teaser: "Habit tracking and “never miss twice” protect the compound.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Missing once is an accident. Missing twice is the start of a new habit. Track the streak — and when you break it, reclaim the next opportunity fast.",
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
          title: "Habit tracking",
          body: "Measuring is often satisfying by itself. Make completion visible.",
        },
        {
          title: "Don’t break the chain",
          body: "A visual streak reinforces the loop — then restart immediately if it breaks.",
        },
        {
          title: "Never miss twice",
          body: "The spiral after the first miss is what ruins you. Rebound on the next slot.",
        },
        {
          title: "Avoid all-or-nothing",
          body: "A short session still counts. Perfect is the enemy of consistent.",
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
          title: "Track",
          body: "Paper or app — see the chain.",
          icon: "focus",
        },
        {
          title: "Recover",
          body: "Next opportunity, not next Monday.",
          icon: "meaning",
        },
        {
          title: "Partial counts",
          body: "Show up small rather than skip.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The first mistake never ruins you. The repeated mistakes that follow do. Get back on track quickly.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Start a seven-day tracker today.",
        "Write your never-miss-twice recovery plan.",
        "Define what a “minimum viable” session looks like."
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
      id: "q16-scale-a",
      prompt: "How visible is my streak?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q16-text-a",
      prompt: "What is my recovery plan after a miss?",
      type: "text",
    },
    {
      id: "q16-scale-b",
      prompt: "Did I never-miss-twice this week?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q16-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q16-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
