import type { Chapter } from "@/lib/types";

export const ch19: Omit<Chapter, "bankQuestions"> = {
  id: "ch-19-the-motivation-trap",
  number: 19,
  title: "The Motivation Trap",
  shortTitle: "Motivation Trap",
  part: "Part five · Playing the game",
  teaser: "Don’t wait to feel motivated. Commitment means acting on values even when desire is low.",
  readMinutes: 9,
  summary: [
    {
      type: "bigIdea",
      text: "Motivation follows action more reliably than it precedes it. Let values drive; treat warm feelings as a bonus, not a requirement.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Two drives", color: "#B45309" },
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
          title: "Motivation vs commitment",
          body: "Commitment is a chosen action pattern, not a mood.",
        },
        {
          title: "Avoidance drive vs values drive",
          body: "Short-term comfort competes with long-term richness.",
        },
        {
          title: "Discipline myths",
          body: "Waiting for willpower is often waiting forever.",
        },
        {
          title: "Sneaky hooks",
          body: "“I’ll do it when I feel like it” keeps life small.",
        },
        {
          title: "ACT move",
          body: "Accept thoughts/feelings, choose a valued direction, take action.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Two drives",
      accent: "#B45309",
      tone: "amber",
      items: [
        {
          title: "Avoidance drive",
          body: "Do what feels good now; life drifts off course.",
          icon: "warn",
        },
        {
          title: "Values drive",
          body: "Do what enriches life long-term — feelings optional.",
          icon: "action",
        },
        {
          title: "Key questions",
          body: "If I let this desire dictate me, where does my life go?",
          icon: "focus",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Even though I don’t feel motivated, am I willing to do what will make my life richer?",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Catch one “I’ll wait until I feel like it” moment and act for five minutes anyway.",
        "Ask the three motivation questions before skipping a valued action.",
        "Schedule a values action at a time motivation is usually low.",
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
          title: "Bargaining with comfort",
          body: "Negotiating endless conditions recreates the trap.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q19-1",
      prompt: "How often did I wait for motivation before acting?",
      type: "scale",
      help: "Scale · 1 = never, 10 = always",
    },
    {
      id: "q19-2",
      prompt: "Where did values drive win over avoidance drive this week?",
      type: "text",
    },
    {
      id: "q19-3",
      prompt: "How strong was my commitment when desire was low?",
      type: "scale",
      help: "Scale · 1 = collapsed, 10 = steady",
    },
    {
      id: "q19-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q19-5",
      prompt: "What will I do next even if I don’t feel like it?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
