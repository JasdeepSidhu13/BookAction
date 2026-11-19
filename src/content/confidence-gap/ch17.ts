import type { Chapter } from "@/lib/types";

export const ch17: Omit<Chapter, "bankQuestions"> = {
  id: "ch-17-throw-off-the-bowlines",
  number: 17,
  title: "Throw Off the Bowlines",
  shortTitle: "Bowlines",
  part: "Part five · Playing the game",
  teaser: "Values aren’t enough — set goals, specify actions, and start your daring adventure.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Throw off the bowlines: pick a life domain, clarify values, set goals, specify actions, and get moving. Confidence grows on the voyage, not at the dock.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Launch sequence", color: "#155E75" },
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
          title: "Joe Simpson’s lessons",
          body: "Purpose, tiny steps, willingness, persistence, and present-moment focus keep you moving through pain.",
        },
        {
          title: "Five-step launch",
          body: "Domain → values → goals → actions → movement.",
        },
        {
          title: "First smallest step",
          body: "Ask for the simplest action you could take today.",
        },
        {
          title: "Not enough confidence",
          body: "That’s expected — act anyway with your skills.",
        },
        {
          title: "The big choice",
          body: "A daring adventure, or nothing.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Launch sequence",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Clarify",
          body: "Choose a domain and the qualities you want to stand for.",
          icon: "meaning",
        },
        {
          title: "Aim",
          body: "Set short-, medium-, and long-term goals.",
          icon: "focus",
        },
        {
          title: "Move",
          body: "Specify the next action and take it today.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "You don’t have to cross oceans — but you do have to leave the harbor of your comfort zone.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Pick one domain for a daring adventure this month.",
        "Write short-, medium-, and long-term goals in that domain.",
        "Take the simplest first step within 24 hours.",
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
          title: "Planning forever",
          body: "Perfect plans at the dock are still not a voyage.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q17-1",
      prompt: "How boldly did I leave my comfort harbor this week?",
      type: "scale",
      help: "Scale · 1 = stayed docked, 10 = sailing",
    },
    {
      id: "q17-2",
      prompt: "What daring adventure am I currently on — even a small one?",
      type: "text",
    },
    {
      id: "q17-3",
      prompt: "How clear is my next concrete action?",
      type: "scale",
      help: "Scale · 1 = unclear, 10 = crystal clear",
    },
    {
      id: "q17-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q17-5",
      prompt: "What is my simplest next step, and when will I take it?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
