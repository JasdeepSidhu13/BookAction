import type { Chapter } from "@/lib/types";

export const ch3: Omit<Chapter, "bankQuestions"> = {
  id: "ch-3-four-steps",
  number: 3,
  title: "How to Build Better Habits in 4 Simple Steps",
  shortTitle: "Four Steps",
  part: "The fundamentals · Why tiny changes make a big difference",
  teaser: "Cue, craving, response, reward — and the Four Laws that build or break habits.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Every habit runs cue → craving → response → reward. To build good habits: make them obvious, attractive, easy, and satisfying. To break bad ones, invert each law.",
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
          title: "Cue",
          body: "Information that predicts a reward — time, place, emotion, people, preceding action.",
        },
        {
          title: "Craving",
          body: "The motivational force. You crave the change in state, not the habit itself.",
        },
        {
          title: "Response",
          body: "The thought or action — only if you are motivated and able enough.",
        },
        {
          title: "Reward",
          body: "Satisfies the craving and teaches the brain what to repeat.",
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
          title: "Make it obvious",
          body: "Clear cues; hide bad ones.",
          icon: "focus",
        },
        {
          title: "Make it attractive",
          body: "Pair with want; reframe.",
          icon: "meaning",
        },
        {
          title: "Make it easy",
          body: "Cut friction; add friction to bad habits.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The fourth law: make it satisfying — or unsatisfying for bad habits. Rewarded behavior repeats.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Map one good habit through the four steps.",
        "Map one bad habit and find the weakest link.",
        "Pick which law to redesign first this week."
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
      id: "q3-scale-a",
      prompt: "How clear is my habit loop?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q3-text-a",
      prompt: "Which of the Four Laws will I redesign first?",
      type: "text",
    },
    {
      id: "q3-scale-b",
      prompt: "Am I inverting laws for a bad habit?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q3-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q3-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
