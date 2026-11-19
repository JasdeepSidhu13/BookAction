import type { Chapter } from "@/lib/types";

export const ch1: Chapter = {
  id: "ch-1-dreams-of-destiny",
  number: 1,
  title: "Dreams of Destiny",
  shortTitle: "Dreams of Destiny",
  part: "Part one · Unleash your power",
  teaser:
    "Decide what you want, believe it is possible, and take massive action toward the life you intend to live.",
  readMinutes: 7,
  summary: [
    {
      type: "bigIdea",
      text: "You already have the resources to create lasting change. What is missing is a clear decision about the life you want — and the courage to pursue it with urgency.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "steps", label: "The awakening path", color: "#155E75" },
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
          title: "You are the creator of your experience",
          body: "Your current life is the product of decisions and patterns — which means a different set of decisions can produce a different life.",
        },
        {
          title: "Desire without decision stays a dream",
          body: "Wanting change is not enough. A decision turns desire into a line you will not cross backward.",
        },
        {
          title: "Raise your standards",
          body: "Lasting change begins when what you tolerate becomes unacceptable — and what you expect of yourself rises.",
        },
        {
          title: "Massive action beats perfect plans",
          body: "Clarity grows through movement. Take imperfect action, learn quickly, and adjust.",
        },
      ],
    },
    {
      type: "cards",
      id: "steps",
      title: "The awakening path",
      accent: "#155E75",
      tone: "teal",
      items: [
        { title: "Decide", body: "Name the outcome you will no longer postpone.", icon: "focus" },
        { title: "Believe", body: "Adopt the identity of someone who can create it.", icon: "meaning" },
        { title: "Act", body: "Take one concrete step that proves the decision is real.", icon: "action" },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Your destiny is shaped less by talent than by the standards you refuse to violate.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write a one-sentence vision for the next 12 months.",
        "List three standards you will raise this week.",
        "Choose one deferred dream and schedule a first action within 24 hours.",
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
          body: "Readiness often arrives after you begin, not before.",
          icon: "warn",
        },
        {
          title: "Confusing inspiration with change",
          body: "Insight without follow-through becomes entertainment.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q1-vision-clarity",
      prompt: "How clear is my long-term vision right now?",
      type: "scale",
      help: "Scale · 1 = vague wish, 10 = vivid and specific",
    },
    {
      id: "q1-standards",
      prompt: "What standard am I ready to raise this week?",
      type: "text",
    },
    {
      id: "q1-urgency",
      prompt: "How urgently am I pursuing what matters most?",
      type: "scale",
      help: "Scale · 1 = someday, 10 = unavoidable priority",
    },
    {
      id: "q1-followed-through",
      prompt: "Did I take action on last week's commitment within 24 hours?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q1-commitment",
      prompt: "What am I committing to now, and what is my first action?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
