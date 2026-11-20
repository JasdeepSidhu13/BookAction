import type { Chapter } from "@/lib/types";

export const ch9: Omit<Chapter, "bankQuestions"> = {
  id: "ch-9-downside-of-habits",
  number: 9,
  title: "The Downside of Creating Good Habits",
  shortTitle: "Downside of Habits",
  part: "Advanced tactics · From good to great",
  teaser:
    "Habits build mastery — then can blind you. Stay sensitive to feedback as routines go automatic.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Habits create the foundation for mastery — but the upside of doing things without thinking has a cost. As a habit becomes automatic, you become less sensitive to feedback and can slide into mindless repetition.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "balance", label: "Stay sharp", color: "#155E75" },
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
          title: "Habits free attention",
          body: "In chess, only after basic moves are automatic can a player focus on the next level. Habits open mental space for advanced detail.",
        },
        {
          title: "Autopilot dulls feedback",
          body: "When “good enough” runs on autopilot, little errors slide. You assume you are still improving when you have plateaued.",
        },
        {
          title: "Establish, then refine",
          body: "Build the habit first. Then periodically bring conscious attention back — deliberate practice on top of automatic skill.",
        },
        {
          title: "Hold identity lightly",
          body: "When a habit locks your identity too tightly, you stop adapting. Keep a growth margin.",
        },
      ],
    },
    {
      type: "cards",
      id: "balance",
      title: "Stay sharp",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Review on a cadence",
          body: "Scheduled reflection catches the errors autopilot misses.",
          icon: "focus",
        },
        {
          title: "Seek a coach or peer",
          body: "Outside eyes notice drift you have stopped seeing.",
          icon: "meaning",
        },
        {
          title: "Keep one learning edge",
          body: "Always have a variable you are still consciously improving.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The upside of habits is efficiency; the downside is that you get used to doing things a certain way and stop paying attention to little errors.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Pick one established habit and audit it for “good enough” shortcuts.",
        "Add one deliberate-practice variable to that habit this week.",
        "Ask a trusted person what drift they notice in your routine.",
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
          title: "Mindless mastery",
          body: "Confusing years of repetition with years of improvement.",
          icon: "warn",
        },
        {
          title: "Identity rigidity",
          body: "Defending “this is who I am” when the method needs a rewrite.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q9-feedback",
      prompt: "How sensitive am I still to feedback on my established habits?",
      type: "scale",
      help: "Scale · 1 = full autopilot, 10 = actively refining",
    },
    {
      id: "q9-drift",
      prompt: "Where has “good enough” replaced deliberate improvement?",
      type: "text",
    },
    {
      id: "q9-review",
      prompt: "How often do I consciously review a habit that already feels automatic?",
      type: "scale",
      help: "Scale · 1 = never, 10 = regularly",
    },
    {
      id: "q9-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q9-commitment",
      prompt: "What habit will I bring back under conscious review this week?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
