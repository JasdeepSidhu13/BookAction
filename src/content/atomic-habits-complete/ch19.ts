import type { Chapter } from "@/lib/types";

export const ch19: Omit<Chapter, "bankQuestions"> = {
  id: "ch-19-goldilocks-rule",
  number: 19,
  title: "The Goldilocks Rule: How to Stay Motivated in Life and Work",
  shortTitle: "Goldilocks",
  part: "Advanced tactics · From good to great",
  teaser: "Peak motivation lives at just-manageable difficulty — not too hard, not too easy.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "The Goldilocks Rule: humans experience peak motivation when working on tasks right on the edge of their current abilities — not too hard, not too easy, just right.",
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
          title: "Just-manageable difficulty",
          body: "Steve Martin grew his act a minute or two at a time — enough wins, enough stretch.",
        },
        {
          title: "Yerkes–Dodson",
          body: "Optimal arousal sits between boredom and anxiety.",
        },
        {
          title: "Establish, then advance",
          body: "Keep new habits easy (3rd Law). Once established, raise challenge so boredom doesn’t kill them.",
        },
        {
          title: "Fall in love with boredom",
          body: "Pros keep going when it stops being novel.",
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
          title: "Too easy",
          body: "Add challenge.",
          icon: "focus",
        },
        {
          title: "Too hard",
          body: "Shrink the step.",
          icon: "meaning",
        },
        {
          title: "Just right",
          body: "Stay on the edge.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Maximum motivation occurs at the midpoint between boredom and anxiety. Design your next step to live there.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Rate your key habit: too easy, too hard, or Goldilocks.",
        "Adjust one notch this week.",
        "Practice showing up once when it feels boring."
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
      id: "q19-scale-a",
      prompt: "Is my habit in the Goldilocks Zone?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q19-text-a",
      prompt: "What will I make slightly harder or easier?",
      type: "text",
    },
    {
      id: "q19-scale-b",
      prompt: "Can I work when it’s boring?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q19-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q19-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
