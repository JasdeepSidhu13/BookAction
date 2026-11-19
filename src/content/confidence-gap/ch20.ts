import type { Chapter } from "@/lib/types";

export const ch20: Omit<Chapter, "bankQuestions"> = {
  id: "ch-20-the-power-of-self-acceptance",
  number: 20,
  title: "The Power of Self-Acceptance",
  shortTitle: "Self-Acceptance",
  part: "Part five · Playing the game",
  teaser: "Failure is part of learning. Rebound with unhooking, kindness, usefulness, and taking a stand.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Change your relationship with failure. Unhook from harsh commentary, make space for pain, be kind, appreciate what worked, find the lesson, and take a stand.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Six steps for rebounding", color: "#166534" },
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
          title: "Failure feels bad",
          body: "That’s why people avoid the learning hidden inside it.",
        },
        {
          title: "Values-focused success",
          body: "Effort aligned with values isn’t erased by mixed outcomes.",
        },
        {
          title: "Six rebound steps",
          body: "Unhook → make space → be kind → appreciate → find usefulness → take a stand.",
        },
        {
          title: "Friend test",
          body: "Ask how you’d treat a friend in the same circumstances.",
        },
        {
          title: "Pride in response",
          body: "Ten years from now, how do you want to remember how you responded?",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Six steps for rebounding",
      accent: "#166534",
      tone: "green",
      items: [
        {
          title: "Unhook & make space",
          body: "Notice harsh thoughts; allow the sting without the war.",
          icon: "focus",
        },
        {
          title: "Be kind & appreciate",
          body: "Offer compassion; notice what still worked.",
          icon: "meaning",
        },
        {
          title: "Learn & stand",
          body: "Extract the lesson; choose what you stand for next.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Failure provides the opportunity to begin again, more intelligently — if you don’t fuse with “I am a failure.”",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Pick a recent miss and walk it through the six rebound steps.",
        "Write three kind sentences you’d say to a friend in your situation — then say them to yourself.",
        "Answer: what do I want to stand for in the face of this reality gap?",
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
          title: "Global identity from one outcome",
          body: "“I failed” is a moment; “I am a failure” is fusion.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q20-1",
      prompt: "How kindly did I treat myself after setbacks this week?",
      type: "scale",
      help: "Scale · 1 = harshly, 10 = kindly",
    },
    {
      id: "q20-2",
      prompt: "What useful lesson did I extract from a miss?",
      type: "text",
    },
    {
      id: "q20-3",
      prompt: "How quickly did I rebound into values-based action?",
      type: "scale",
      help: "Scale · 1 = stayed down, 10 = rebounded fast",
    },
    {
      id: "q20-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q20-5",
      prompt: "What stand will I take after my next imperfect attempt?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
