import type { Chapter } from "@/lib/types";

export const ch1: Omit<Chapter, "bankQuestions"> = {
  id: "ch-1-surprising-power",
  number: 1,
  title: "The Surprising Power of Atomic Habits",
  shortTitle: "Atomic Power",
  part: "The fundamentals · Why tiny changes make a big difference",
  teaser: "British Cycling’s aggregation of marginal gains — and why 1% better compounds.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "You do not rise to the level of your goals. You fall to the level of your systems. Atomic habits are tiny changes that are also the building blocks of remarkable results.",
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
          title: "Aggregation of marginal gains",
          body: "Dave Brailsford transformed British Cycling by hunting a 1% improvement in everything — seats, sleep, hygiene, even the truck paint.",
        },
        {
          title: "Habits are compound interest",
          body: "Getting 1% better every day is a quiet force. Time magnifies whatever you feed it — good or bad.",
        },
        {
          title: "Systems over goals",
          body: "Goals are results you want. Systems are the processes that lead there. Winners and losers often share goals; systems separate them.",
        },
        {
          title: "Plateau of latent potential",
          body: "Results often lag effort. Keep going long enough for the curve to bend.",
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
          title: "1% better",
          body: "Tiny gains stack across months and years.",
          icon: "focus",
        },
        {
          title: "1% worse",
          body: "Tiny slips compound into debt, clutter, and regret.",
          icon: "meaning",
        },
        {
          title: "Breakthrough lag",
          body: "Progress looks sudden only from the outside.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Forget about goals for a moment. Focus on your system — the daily habits that will carry you there.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Name one domain for marginal gains this month.",
        "Write a 1% action for tomorrow — almost too small to fail.",
        "Replace one outcome goal with a daily process habit."
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
      id: "q1-scale-a",
      prompt: "How clear is my compounding system?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q1-text-a",
      prompt: "What is my 1% better action for tomorrow?",
      type: "text",
    },
    {
      id: "q1-scale-b",
      prompt: "How aligned is my habit trajectory?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q1-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q1-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
