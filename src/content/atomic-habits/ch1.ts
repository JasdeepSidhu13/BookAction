import type { Chapter } from "@/lib/types";

export const ch1: Omit<Chapter, "bankQuestions"> = {
  id: "ch-1-surprising-power",
  number: 1,
  title: "The Surprising Power of Atomic Habits",
  shortTitle: "Atomic Power",
  part: "The fundamentals",
  teaser:
    "Tiny 1% improvements compound. Habits are the compound interest of self-improvement.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Habits are the compound interest of self-improvement. Getting 1 percent better every day is a quiet force — small, easy to ignore, and transformative over time.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "compound", label: "Compound effect", color: "#155E75" },
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
          title: "Atomic means both tiny and powerful",
          body: "An atomic habit is a small practice that is also a building block of remarkable results — not a radical overhaul.",
        },
        {
          title: "Systems beat goals",
          body: "Goals are about the results you want. Systems are about the processes that lead to those results. You do not rise to the level of your goals; you fall to the level of your systems.",
        },
        {
          title: "Trajectory matters more than position",
          body: "Whether you are currently “ahead” or “behind” matters less than whether your habits point you in the right direction.",
        },
        {
          title: "Time magnifies whatever you feed it",
          body: "Good habits make time your ally. Bad habits make time your enemy.",
        },
      ],
    },
    {
      type: "cards",
      id: "compound",
      title: "Compound effect",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "1% better",
          body: "Tiny gains stack. Miss them day to day; notice them across months and years.",
          icon: "action",
        },
        {
          title: "1% worse",
          body: "Tiny slips also compound — into debt, clutter, distance, and regret.",
          icon: "focus",
        },
        {
          title: "Plateau of latent potential",
          body: "Results often lag effort. Keep going long enough for the curve to bend.",
          icon: "meaning",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Forget about goals for a moment. Focus on your system — the collection of daily habits that will carry you there.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Name one area where you want compounding (health, craft, relationships).",
        "Write the 1% version of progress in that area for tomorrow — almost too small to fail.",
        "Replace one outcome goal this week with a process habit you can repeat daily.",
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
          title: "All-or-nothing resets",
          body: "Waiting for Monday, January, or “when life calms down” instead of starting tiny now.",
          icon: "warn",
        },
        {
          title: "Goal obsession",
          body: "Celebrating the finish line while ignoring the system that would keep winning after the goal is hit.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q1-system",
      prompt: "How clearly is my daily system pointed at what I want?",
      type: "scale",
      help: "Scale · 1 = random effort, 10 = clear compounding system",
    },
    {
      id: "q1-one-percent",
      prompt: "What is my 1% better action for tomorrow?",
      type: "text",
    },
    {
      id: "q1-trajectory",
      prompt: "How satisfied am I with the direction my habits are taking me?",
      type: "scale",
      help: "Scale · 1 = wrong direction, 10 = strongly aligned",
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
      prompt: "Which tiny habit will I practice daily this week?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
