import type { Chapter } from "@/lib/types";

export const ch18: Omit<Chapter, "bankQuestions"> = {
  id: "ch-18-whats-stopping-you",
  number: 18,
  title: "What’s Stopping You?",
  shortTitle: "What’s Stopping You?",
  part: "Part five · Playing the game",
  teaser: "Use FEAR to diagnose stuckness — and move with defusion, acceptance, realistic goals, and values.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Stuckness usually comes from fusion, excessive goals, avoidance of discomfort, or remoteness from values. Name the barrier, then take a workable next step.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "How to get unstuck", color: "#BE123C" },
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
          title: "Fusion stories",
          body: "Ask: what story am I fusing with?",
        },
        {
          title: "Excessive goals",
          body: "Too much too soon guarantees failure; scale to resources.",
        },
        {
          title: "Avoidance of discomfort",
          body: "Leaving the comfort zone always includes discomfort.",
        },
        {
          title: "Remoteness from values",
          body: "Without a why, discomfort feels pointless.",
        },
        {
          title: "Reality gap",
          body: "Life includes a gap between ideals and reality; respond with values anyway.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "How to get unstuck",
      accent: "#BE123C",
      tone: "rose",
      items: [
        {
          title: "Defusion",
          body: "Unhook from the stuck story.",
          icon: "focus",
        },
        {
          title: "Accept discomfort",
          body: "Make room for sensations and feelings that travel with growth.",
          icon: "meaning",
        },
        {
          title: "Realistic goals + values",
          body: "Shrink the step; reconnect to what matters.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The question isn’t whether you’ll feel discomfort — it’s which pain you choose: the pain of growth or the pain of a waiting life.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Diagnose your current stuck point with FEAR (fusion, excessive goals, avoidance, remoteness).",
        "Rewrite one excessive goal into a realistic next mouthful.",
        "Answer: am I willing to make room for discomfort to live this value?",
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
          title: "The Waiting Place",
          body: "Waiting for the “right” feelings can become a permanent address.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q18-1",
      prompt: "How stuck did I feel acting on my values this week?",
      type: "scale",
      help: "Scale · 1 = free, 10 = fully stuck",
    },
    {
      id: "q18-2",
      prompt: "What primarily stopped me: fusion, excessive goals, avoidance, or remoteness from values?",
      type: "text",
    },
    {
      id: "q18-3",
      prompt: "How willing was I to make room for discomfort?",
      type: "scale",
      help: "Scale · 1 = unwilling, 10 = willing",
    },
    {
      id: "q18-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q18-5",
      prompt: "What realistic next step will unstick me, and what discomfort will I allow?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
