import type { Chapter } from "@/lib/types";

export const ch13: Omit<Chapter, "bankQuestions"> = {
  id: "ch-13-two-minute-rule",
  number: 13,
  title: "How to Stop Procrastinating by Using the Two-Minute Rule",
  shortTitle: "Two-Minute Rule",
  part: "The 3rd Law · Make It Easy",
  teaser: "When you start a new habit, it should take less than two minutes to do.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "When you start a new habit, it should take less than two minutes to do. “Read before bed” becomes “read one page.” “Run three miles” becomes “tie my running shoes.”",
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
          title: "Gateway, not ceiling",
          body: "Two minutes gets you to start. Continuation can be harder — starting should not be.",
        },
        {
          title: "Ritualize the beginning",
          body: "The first two minutes become the habit; the rest becomes a bonus.",
        },
        {
          title: "Overcome “too big”",
          body: "Excitement makes people start oversized. Scale down until refusal is silly.",
        },
        {
          title: "Anyone can begin",
          body: "One page, one mat, one note opened — then let momentum work.",
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
          title: "Read one page",
          body: "Gateway to reading.",
          icon: "focus",
        },
        {
          title: "Tie your shoes",
          body: "Gateway to training.",
          icon: "meaning",
        },
        {
          title: "Open the notes",
          body: "Gateway to deep work.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "A new habit should not feel like a challenge. The actions that follow can be challenging — the first two minutes should be easy.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write the two-minute version of your key habit.",
        "Practice only the gateway for three days.",
        "Then allow yourself to continue past two minutes."
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
      id: "q13-scale-a",
      prompt: "What is my two-minute version?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q13-text-a",
      prompt: "Am I starting too big?",
      type: "text",
    },
    {
      id: "q13-scale-b",
      prompt: "Did I complete the gateway today?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q13-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q13-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
