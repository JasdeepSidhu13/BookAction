import type { Chapter } from "@/lib/types";

export const ch1: Omit<Chapter, "bankQuestions"> = {
  id: "ch-1-why-bother",
  number: 1,
  title: "Why Bother?",
  shortTitle: "Why Bother?",
  part: "Part one · Warming up",
  teaser: "Confidence is not the destination — clarify what you’d do differently if fear no longer ran the show.",
  readMinutes: 12,
  summary: [
    {
      type: "bigIdea",
      text: "We don’t want confidence for its own sake. We want it to change how we act. Rule one of the confidence game: the actions of confidence come first; the feelings of confidence come later.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "The Confidence Cycle", color: "#155E75" },
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
          title: "Confidence serves a purpose",
          body: "If you felt supremely confident but behaved exactly as before, you wouldn’t be satisfied. Confidence matters because of the life it unlocks.",
        },
        {
          title: "The confidence gap",
          body: "You’re stuck in the gap when you believe you can’t chase goals or be who you want until you feel more confident first.",
        },
        {
          title: "Two definitions",
          body: "Confidence can mean a feeling of certainty — or an act of trust and reliance. Genuine confidence grows from the second.",
        },
        {
          title: "Five common causes",
          body: "Excessive expectations, harsh self-judgment, preoccupation with fear, lack of experience, and lack of skill keep confidence low.",
        },
        {
          title: "The Confidence Cycle",
          body: "Practice the skills → apply them → assess results nonjudgmentally → modify as needed.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "The Confidence Cycle",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Practice the skills",
          body: "Learn the psychological moves: defusion, expansion, engagement, values, and committed action.",
          icon: "action",
        },
        {
          title: "Apply them effectively",
          body: "Use the skills in real challenges — not only while reading safely at home.",
          icon: "focus",
        },
        {
          title: "Assess and modify",
          body: "Ask what worked, what didn’t, and what to try differently — without harsh self-judgment.",
          icon: "meaning",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Instant confidence usually lasts an instant. Lasting confidence is built through committed action guided by what matters.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Complete a Life-Change List: how you’d act, treat others, treat yourself, and what you’d stand for with genuine confidence.",
        "Separate values (ongoing ways of being) from goals (outcomes you want to achieve).",
        "Name which of the five causes most fuels your low confidence right now.",
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
          title: "Waiting to feel ready",
          body: "Postponing action until confidence arrives first locks you in the gap.",
          icon: "warn",
        },
        {
          title: "Skipping the exercises",
          body: "Reading alone doesn’t build karate skills — or confidence skills.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q1-1",
      prompt: "How often this week did I act first instead of waiting to feel confident?",
      type: "scale",
      help: "Scale · 1 = always waiting, 10 = acting from values",
    },
    {
      id: "q1-2",
      prompt: "What is one item on my Life-Change List I moved toward this week?",
      type: "text",
    },
    {
      id: "q1-3",
      prompt: "How clearly am I connecting confidence to a purpose beyond feeling better?",
      type: "scale",
      help: "Scale · 1 = unclear, 10 = crystal clear",
    },
    {
      id: "q1-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q1-5",
      prompt: "What values-guided action am I committing to now?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
