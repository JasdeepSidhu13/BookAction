import type { Chapter } from "@/lib/types";

export const ch11: Omit<Chapter, "bankQuestions"> = {
  id: "ch-11-walk-slowly",
  number: 11,
  title: "Walk Slowly, but Never Backward",
  shortTitle: "Never Backward",
  part: "The 3rd Law · Make It Easy",
  teaser: "Motion feels productive; action delivers outcomes. Start small and keep moving forward.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Motion is planning and preparing. Action is the behavior that delivers an outcome. Walk slowly if you must — but never backward. Take the next real step.",
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
          title: "Motion vs action",
          body: "Researching, outlining, and “getting ready” can hide avoidance. Action produces a result.",
        },
        {
          title: "Repetition builds automaticity",
          body: "Habits form through frequency more than through perfect intensity.",
        },
        {
          title: "Gateway habits",
          body: "Scale the behavior down until you can show up even on hard days.",
        },
        {
          title: "Standardize before optimize",
          body: "Get consistent first; improve the habit after it exists.",
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
          title: "Act",
          body: "Produce one outcome today.",
          icon: "focus",
        },
        {
          title: "Repeat",
          body: "Frequency beats intensity early on.",
          icon: "meaning",
        },
        {
          title: "Shrink",
          body: "Make the first step undeniable.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The most effective form of learning is practice, not planning. Put reps on the board.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Convert one “motion” task into an action with an output.",
        "Shrink your key habit so you can do it today.",
        "Count reps this week, not perfect sessions."
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
      id: "q11-scale-a",
      prompt: "Where am I stuck in motion?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q11-text-a",
      prompt: "What action will produce an outcome today?",
      type: "text",
    },
    {
      id: "q11-scale-b",
      prompt: "Am I standardizing before optimizing?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q11-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q11-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
