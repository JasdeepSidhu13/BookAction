import type { Chapter } from "@/lib/types";

export const ch10: Omit<Chapter, "bankQuestions"> = {
  id: "ch-10-fix-bad-habits",
  number: 10,
  title: "How to Find and Fix the Causes of Your Bad Habits",
  shortTitle: "Fix Bad Habits",
  part: "The 2nd Law · Make It Attractive",
  teaser: "Reframe the craving — highlight the cost of bad habits and the benefit of good ones.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Every behavior has a surface craving and a deeper underlying motive. Make bad habits unattractive by reassociating them with their true costs — and good habits attractive by highlighting benefits you care about.",
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
          title: "Same motive, better behavior",
          body: "Conserve energy, seek status, connect, reduce uncertainty — meet the motive with a healthier response.",
        },
        {
          title: "Mindset shift",
          body: "“I have to” becomes “I get to.” Language changes attraction.",
        },
        {
          title: "Highlight the cost",
          body: "Before a bad habit, vividly name what it costs your future self.",
        },
        {
          title: "Create a motivation ritual",
          body: "A short phrase or visualization that reframes the habit before you begin.",
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
          title: "Unattractive bad",
          body: "See the full cost.",
          icon: "focus",
        },
        {
          title: "Attractive good",
          body: "See the real benefit.",
          icon: "meaning",
        },
        {
          title: "Ritual",
          body: "A 10-second reframe before action.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "You can make a habit more attractive without changing the habit — by changing the story you tell about it.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write the real cost of one bad habit in one sentence.",
        "Rewrite one “have to” as “get to.”",
        "Create a 10-second motivation ritual before your key habit."
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
      id: "q10-scale-a",
      prompt: "What motive is my bad habit really serving?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q10-text-a",
      prompt: "How will I reframe my key habit today?",
      type: "text",
    },
    {
      id: "q10-scale-b",
      prompt: "What cost will I make vivid before temptation?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q10-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q10-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
