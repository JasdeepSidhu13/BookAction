import type { Chapter } from "@/lib/types";

export const ch4: Omit<Chapter, "bankQuestions"> = {
  id: "ch-4-it-aint-necessarily-so",
  number: 4,
  title: "It Ain’t Necessarily So",
  shortTitle: "Thoughts",
  part: "Part two · The double-edged sword",
  teaser: "Your mind is a double-edged sword — brilliant at problem-solving, relentless at generating doubt.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Negative thoughts are inevitable. The problem is not having them — it’s fusing with them so they dictate what you do. Thoughts are words and pictures, not commands.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Mind as double-edged sword", color: "#155E75" },
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
          title: "Thoughts never stop",
          body: "Your mind generates endless commentary: predictions, judgments, stories, and images.",
        },
        {
          title: "Pop-up thoughts",
          body: "Like completing familiar phrases, many thoughts appear automatically from learning and language.",
        },
        {
          title: "The “I can’t do it” story",
          body: "Almost everyone has a version of this story. You are not uniquely broken for having one.",
        },
        {
          title: "Fusion vs noticing",
          body: "Getting hooked means treating thoughts as literal truth and orders. Noticing creates space to choose.",
        },
        {
          title: "Workability over truth debates",
          body: "Ask whether letting a thought guide action helps you be who you want to be.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Mind as double-edged sword",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Outside the skin",
          body: "Problem-solving thoughts help you plan, invent, and stay safe.",
          icon: "focus",
        },
        {
          title: "Inside the skin",
          body: "The same machinery turns your life into a problem to fix — and confidence into a war.",
          icon: "warn",
        },
        {
          title: "The alternative",
          body: "Learn to see thoughts as mental events you can notice, name, and choose whether to follow.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "You can’t stop the mind from thinking any more than you can stop the ocean from waving — but you can stop treating every wave as an order.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Spend one minute noticing thoughts without trying to change them.",
        "Write your personal “I can’t do it” story in one paragraph.",
        "For one sticky thought, ask: if I let this guide me, does it help create the life I want?",
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
          title: "Arguing with thoughts",
          body: "Trying to prove negative thoughts false often deepens fusion.",
          icon: "warn",
        },
        {
          title: "Waiting for silence",
          body: "A quiet mind is not required for committed action.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q4-1",
      prompt: "How often did I notice thoughts as thoughts instead of obeying them?",
      type: "scale",
      help: "Scale · 1 = fused all week, 10 = frequently noticing",
    },
    {
      id: "q4-2",
      prompt: "What “I can’t do it” story showed up most this week?",
      type: "text",
    },
    {
      id: "q4-3",
      prompt: "When unhelpful thoughts appeared, how often did I check workability?",
      type: "scale",
      help: "Scale · 1 = never, 10 = consistently",
    },
    {
      id: "q4-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q4-5",
      prompt: "What valued action will I take even if the “I can’t” story shows up?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
