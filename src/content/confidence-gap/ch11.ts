import type { Chapter } from "@/lib/types";

export const ch11: Omit<Chapter, "bankQuestions"> = {
  id: "ch-11-fueling-up",
  number: 11,
  title: "Fueling Up",
  shortTitle: "Values",
  part: "Part three · What gets you going?",
  teaser: "Values are the fuel and compass — chosen qualities of action that guide you when motivation dips.",
  readMinutes: 11,
  summary: [
    {
      type: "bigIdea",
      text: "Values are not goals. They are ongoing directions for how you want to behave. Clarifying them gives guidance, motivation, and a reason to persist when the going gets rough.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "What values give you", color: "#155E75" },
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
          title: "Values vs goals",
          body: "Goals can be checked off; values are lived moment by moment.",
        },
        {
          title: "Guidance under pressure",
          body: "Values tell you how to show up when outcomes are uncertain.",
        },
        {
          title: "Inner compass",
          body: "Return to chosen qualities when the mind floods with doubt.",
        },
        {
          title: "Top values exercise",
          body: "Rank common values and notice gaps between caring and current behavior.",
        },
        {
          title: "Carry them with you",
          body: "Keep your top values visible and revisit them often.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "What values give you",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Motivation that lasts",
          body: "They fuel action even when feelings aren’t cooperative.",
          icon: "action",
        },
        {
          title: "Guidance",
          body: "They help you choose among hard options.",
          icon: "focus",
        },
        {
          title: "Meaning",
          body: "They connect effort to who you want to be.",
          icon: "meaning",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "A gap between values and actions is information — not a final verdict on your character.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Complete a values ranking and mark your top six.",
        "Write those six on a card and keep them with you for a month.",
        "Pick one value and take one consistent action today.",
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
          title: "Using values to beat yourself up",
          body: "Noticing a gap should invite committed action, not a shame spiral.",
          icon: "warn",
        },
        {
          title: "Treating values as rigid commandments",
          body: "Values can shift in prominence over time; stay flexible.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q11-1",
      prompt: "How often did my actions align with my top values this week?",
      type: "scale",
      help: "Scale · 1 = rarely, 10 = consistently",
    },
    {
      id: "q11-2",
      prompt: "Which value mattered most in a hard moment this week?",
      type: "text",
    },
    {
      id: "q11-3",
      prompt: "How clear are my top values right now?",
      type: "scale",
      help: "Scale · 1 = foggy, 10 = clear",
    },
    {
      id: "q11-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q11-5",
      prompt: "Which value will guide my next committed action?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
