import type { Chapter } from "@/lib/types";

export const ch1: Omit<Chapter, "bankQuestions"> = {
  id: "ch-1-surprising-power",
  number: 1,
  title: "The Surprising Power of Atomic Habits",
  shortTitle: "Atomic Power",
  part: "The fundamentals · Why tiny changes make a big difference",
  teaser:
    "British Cycling’s aggregation of marginal gains — and why 1% better compounds into remarkable results.",
  readMinutes: 12,
  summary: [
    {
      type: "bigIdea",
      text: "You do not rise to the level of your goals. You fall to the level of your systems. Atomic habits are tiny changes that are also the building blocks of remarkable results — small and mighty at once.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "gains", label: "Marginal gains", color: "#155E75" },
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
          body: "Dave Brailsford transformed British Cycling by hunting a 1% improvement in everything — bike seats, pillows, handwashing, paint color in the truck. Tiny edges stacked into dominance.",
        },
        {
          title: "Habits are compound interest",
          body: "Getting 1% better every day is a quiet force. Time magnifies whatever you feed it — good or bad.",
        },
        {
          title: "Systems over goals",
          body: "Goals are the results you want. Systems are the processes that lead there. Winners and losers often share the same goals; systems separate them.",
        },
        {
          title: "Plateau of latent potential",
          body: "Results often lag effort. Keep going long enough for the curve to bend — breakthroughs look sudden only from the outside.",
        },
      ],
    },
    {
      type: "cards",
      id: "gains",
      title: "What “atomic” means",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Tiny unit",
          body: "An extremely small amount — the single irreducible piece of a larger system.",
          icon: "focus",
        },
        {
          title: "Source of power",
          body: "Not just small: the source of immense energy when those units compound.",
          icon: "meaning",
        },
        {
          title: "Building block",
          body: "Like atoms forming molecules, atomic habits form the system of compound growth.",
          icon: "action",
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
        "Name one domain where you will hunt marginal gains this month (health, craft, relationships).",
        "Write the 1% version of progress for tomorrow — almost too small to fail.",
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
          title: "Goal obsession",
          body: "Celebrating the finish line while ignoring the system that would keep winning after the goal is hit.",
          icon: "warn",
        },
        {
          title: "Quitting on the plateau",
          body: "Stopping because results are invisible while the compound is still loading.",
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
      prompt: "What is my 1% better action for tomorrow — my marginal gain?",
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
