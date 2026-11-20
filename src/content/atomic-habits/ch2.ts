import type { Chapter } from "@/lib/types";

export const ch2: Omit<Chapter, "bankQuestions"> = {
  id: "ch-2-identity-habits",
  number: 2,
  title: "How Your Habits Shape Your Identity",
  shortTitle: "Identity Habits",
  part: "The fundamentals · Why tiny changes make a big difference",
  teaser:
    "Every action is a vote for the person you wish to become — change what you do to change who you are.",
  readMinutes: 11,
  summary: [
    {
      type: "bigIdea",
      text: "Every action you take is a vote for the type of person you wish to become. No single instance transforms your beliefs — but as the votes build up, so does the evidence of your new identity.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "layers", label: "Three layers", color: "#155E75" },
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
          title: "Start with who, not what",
          body: "Outcome goals ask what you want. Identity asks who you wish to become — “I am a runner” before “I want to run a marathon.”",
        },
        {
          title: "Votes, not proofs",
          body: "Each page makes you a writer. Each workout makes you an athlete. Meaningful change does not require radical change — small habits provide evidence.",
        },
        {
          title: "Two-step process",
          body: "Decide the type of person you want to be. Prove it to yourself with small wins until the story you tell yourself updates.",
        },
        {
          title: "Trust compounds too",
          body: "Habits don’t only get results — they teach you to trust yourself. That belief is what keeps the next vote coming.",
        },
      ],
    },
    {
      type: "cards",
      id: "layers",
      title: "Three layers of behavior change",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Outcomes",
          body: "What you get — weight, money, titles.",
          icon: "focus",
        },
        {
          title: "Processes",
          body: "What you do — routines and systems.",
          icon: "action",
        },
        {
          title: "Identity",
          body: "What you believe — the story of who you are.",
          icon: "meaning",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The most practical way to change who you are is to change what you do. True behavior change is identity change.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Complete: “I want to become the type of person who…”",
        "List three tiny votes that would prove that identity this week.",
        "Rewrite one limiting identity (“I’m not a morning person”) as a becoming statement.",
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
          title: "Outcome-only goals",
          body: "Chasing a result while keeping an identity that fights the required habits.",
          icon: "warn",
        },
        {
          title: "Identity as a cage",
          body: "Using “that’s just who I am” to protect a habit you no longer want.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q2-identity",
      prompt: "How clearly do I know the type of person I am becoming?",
      type: "scale",
      help: "Scale · 1 = unclear, 10 = crystal clear",
    },
    {
      id: "q2-votes",
      prompt: "What identity am I casting votes for with my current habits?",
      type: "text",
    },
    {
      id: "q2-evidence",
      prompt: "How strong is the evidence this week for the identity I want?",
      type: "scale",
      help: "Scale · 1 = no votes, 10 = many clear votes",
    },
    {
      id: "q2-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q2-commitment",
      prompt: "What identity vote will I cast tomorrow?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
