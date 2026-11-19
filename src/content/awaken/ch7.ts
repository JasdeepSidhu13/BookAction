import type { Chapter } from "@/lib/types";

export const ch7: Chapter = {
  id: "ch-7-what-you-really-want",
  number: 7,
  title: "How to Get What You Really Want",
  shortTitle: "What You Really Want",
  part: "Part one · Unleash your power",
  teaser:
    "Beneath every goal is a feeling — change your physiology and focus to create the states that produce results.",
  readMinutes: 12,
  summary: [
    {
      type: "bigIdea",
      text: "Emotion is created by motion. Change how you use your body and what you focus on, and you change your state — and with it, your performance and your life.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "levers", label: "Two levers of state", color: "#155E75" },
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
          title: "Ask what you really want to feel",
          body: "Money, recognition, or a home are vehicles. The destination is a feeling — freedom, love, contribution, certainty.",
        },
        {
          title: "State drives performance",
          body: "You can know what to do and still fail to access it in the wrong mental, emotional, or physical state.",
        },
        {
          title: "Focus becomes your idea of reality",
          body: "Like a camera at a party: one angle captures argument, another laughter. Each shapes the whole story.",
        },
        {
          title: "Questions direct focus",
          body: "\"Why is this person taking advantage of me?\" hunts for mistreatment. \"How can I turn this around?\" hunts for options.",
        },
        {
          title: "Submodalities change intensity",
          body: "Make a mental picture dimmer, smaller, farther — or brighter and closer — and the feeling shifts with it.",
        },
      ],
    },
    {
      type: "cards",
      id: "levers",
      title: "Two levers of state",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Physiology",
          body: "Posture, breath, gesture, face, movement, and voice. Motion creates emotion.",
          icon: "focus",
        },
        {
          title: "Focus",
          body: "What you replay, anticipate, and attend to — and how you represent it internally.",
          icon: "meaning",
        },
        {
          title: "Pleasure plan",
          body: "If you don't have a plan for pleasure, you will have pain. Build 15–25 clean ways to feel good.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Focus on where you want to go, not on what you fear. Redirecting attention guides your next action — even when the feeling catches up later.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Name a goal and the feeling underneath it: What do I want? Why? How do I expect it to make me feel?",
        "List every emotion you typically feel in a week — then list emotions you want more often.",
        "Build a pleasure menu of at least 15 healthy options and schedule one daily. Practice a one-minute grin in the mirror five times a day for a week.",
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
          title: "Achieving the vehicle, missing the feeling",
          body: "Outward success can leave the underlying emotional need unmet if you never train the state itself.",
          icon: "warn",
        },
        {
          title: "Replaying pain on loop",
          body: "Would you watch a film you hated hundreds of times? Stop rehearsing disasters and missing pieces.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q7-state-control",
      prompt: "How effectively did I shift my state when I needed to this week?",
      type: "scale",
      help: "Scale · 1 = stuck in whatever mood arrived, 10 = deliberately changed physiology/focus",
    },
    {
      id: "q7-real-want",
      prompt: "What do I truly want right now — and what feeling am I really after?",
      type: "text",
    },
    {
      id: "q7-focus-quality",
      prompt: "How often did I focus on where I want to go instead of what I fear?",
      type: "scale",
      help: "Scale · 1 = fear-focused, 10 = outcome-focused",
    },
    {
      id: "q7-followed-through",
      prompt: "Did I use my planned pleasure/state practices as committed?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q7-commitment",
      prompt: "What state will I create on purpose this week, and what's my first practice?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
