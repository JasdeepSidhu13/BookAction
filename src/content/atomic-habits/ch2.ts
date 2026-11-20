import type { Chapter } from "@/lib/types";

export const ch2: Omit<Chapter, "bankQuestions"> = {
  id: "ch-2-identity-habits",
  number: 2,
  title: "Identity-Based Habits",
  shortTitle: "Identity Habits",
  part: "The fundamentals",
  teaser:
    "The most effective way to change your habits is to focus on who you wish to become — not only what you want to achieve.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "There are three layers of behavior change: outcomes, processes, and identity. Lasting change is identity change — every action is a vote for the type of person you wish to become.",
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
          title: "Start with identity",
          body: "Instead of “I want to run a marathon,” begin with “I am a runner.” Habits are how you embody that identity.",
        },
        {
          title: "Votes, not proofs",
          body: "You do not need a perfect streak. You need enough evidence that the new identity is true.",
        },
        {
          title: "Belief follows behavior",
          body: "Act like the person you want to be in small ways, and your self-image updates to match.",
        },
        {
          title: "Two-step process",
          body: "Decide the type of person you want to be. Prove it to yourself with small wins.",
        },
      ],
    },
    {
      type: "cards",
      id: "layers",
      title: "Three layers of change",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Outcomes",
          body: "What you get — weight, money, grades, titles.",
          icon: "focus",
        },
        {
          title: "Processes",
          body: "What you do — routines, systems, habits.",
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
      text: "The ultimate form of intrinsic motivation is when a habit becomes part of your identity. True behavior change is identity change.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Complete: “I want to become the type of person who…”",
        "List three tiny votes that would prove that identity this week.",
        "Catch one identity statement that blocks you (“I’m not a morning person”) and rewrite it as a becoming statement.",
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
          body: "Chasing a result while keeping an identity that fights the habits required.",
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
