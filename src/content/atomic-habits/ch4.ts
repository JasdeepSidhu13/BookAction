import type { Chapter } from "@/lib/types";

export const ch4: Omit<Chapter, "bankQuestions"> = {
  id: "ch-4-make-it-obvious",
  number: 4,
  title: "Make It Obvious",
  shortTitle: "Make It Obvious",
  part: "The 1st Law",
  teaser:
    "Implementation intentions, habit stacking, and environment design beat vague motivation.",
  readMinutes: 11,
  summary: [
    {
      type: "bigIdea",
      text: "Many people think they lack motivation when what they lack is clarity. Make the cue for your habit so obvious that doing the right thing becomes the path of least attention.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "tools", label: "Cue tools", color: "#155E75" },
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
          title: "Pointing-and-calling awareness",
          body: "You cannot change what you do not notice. Score your habits honestly before you redesign them.",
        },
        {
          title: "Implementation intentions",
          body: "I will [BEHAVIOR] at [TIME] in [LOCATION]. Specificity removes negotiation.",
        },
        {
          title: "Habit stacking",
          body: "After [CURRENT HABIT], I will [NEW HABIT]. Attach the new cue to something you already do.",
        },
        {
          title: "Environment is the invisible hand",
          body: "Make cues for good habits visible and cues for bad habits invisible. Redesign spaces, not just willpower.",
        },
      ],
    },
    {
      type: "cards",
      id: "tools",
      title: "Cue tools",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Time + place",
          body: "Decide when and where before motivation has to invent a plan.",
          icon: "focus",
        },
        {
          title: "Stack on a stable habit",
          body: "Coffee, commute, brushing teeth — reliable anchors beat vague hopes.",
          icon: "action",
        },
        {
          title: "One space, one purpose",
          body: "Context matters. Mixing cues (bed = sleep + phone) confuses the brain.",
          icon: "meaning",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Motivation is overrated; environment often matters more. Self-control is a short-term strategy — design is a long-term one.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write one implementation intention: I will ___ at ___ in ___.",
        "Create one habit stack using a daily anchor you never skip.",
        "Remove or hide one cue for a bad habit in your primary environment.",
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
          title: "Vague intentions",
          body: "“Work out more” without time, place, or trigger.",
          icon: "warn",
        },
        {
          title: "Willpower as plan A",
          body: "Leaving tempting cues in plain sight and expecting discipline to win every time.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q4-clarity",
      prompt: "How clear is the cue for my most important habit?",
      type: "scale",
      help: "Scale · 1 = invisible/vague, 10 = unmistakable",
    },
    {
      id: "q4-stack",
      prompt: "What habit stack or implementation intention will I use?",
      type: "text",
    },
    {
      id: "q4-environment",
      prompt: "How well does my environment make the good habit obvious?",
      type: "scale",
      help: "Scale · 1 = fighting my space, 10 = space helps me",
    },
    {
      id: "q4-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q4-commitment",
      prompt: "What environment or cue change will I make today?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
