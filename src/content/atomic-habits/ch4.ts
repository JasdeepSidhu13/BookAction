import type { Chapter } from "@/lib/types";

export const ch4: Omit<Chapter, "bankQuestions"> = {
  id: "ch-4-make-it-obvious",
  number: 4,
  title: "Make It Obvious",
  shortTitle: "Make It Obvious",
  part: "The 1st Law",
  teaser:
    "Implementation intentions, habit stacking, and environment design — clarity beats vague motivation.",
  readMinutes: 12,
  summary: [
    {
      type: "bigIdea",
      text: "Many people think they lack motivation when what they lack is clarity. Decide the when and where beforehand — “When situation X arises, I will perform response Y” — and design an environment where the good cue is hard to miss.",
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
          title: "Awareness before change",
          body: "Pointing-and-calling (and a habit scorecard) make invisible routines visible. You can’t improve what you don’t notice.",
        },
        {
          title: "Implementation intentions",
          body: "I will [BEHAVIOR] at [TIME] in [LOCATION]. Time and place are the two most common cues — lock both in advance.",
        },
        {
          title: "Habit stacking",
          body: "After [CURRENT HABIT], I will [NEW HABIT]. Tie the new cue to something you already do reliably — coffee, commute, brushing teeth.",
        },
        {
          title: "Environment is the invisible hand",
          body: "Motivation is overrated; environment often matters more. Make good cues obvious and bad cues invisible. One space, one use.",
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
          body: "Reliable anchors beat vague hopes every time.",
          icon: "action",
        },
        {
          title: "Self-control by design",
          body: "The secret of self-control is often fewer tempting cues — not more willpower in the moment.",
          icon: "meaning",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Self-control is a short-term strategy. Design is a long-term one. People with great self-control tend to spend less time in tempting situations in the first place.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write one implementation intention: I will ___ at ___ in ___.",
        "Create one habit stack using a daily anchor you never skip.",
        "Hide or remove one cue for a bad habit in your primary environment.",
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
          body: "“Work out more” with no time, place, or trigger.",
          icon: "warn",
        },
        {
          title: "Willpower as plan A",
          body: "Leaving tempting cues in plain sight and expecting discipline to win every round.",
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
