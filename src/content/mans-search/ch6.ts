import type { Chapter } from "@/lib/types";

export const ch6: Omit<Chapter, "bankQuestions"> = {
  id: "ch-6-existential-vacuum",
  number: 6,
  title: "The Existential Vacuum",
  shortTitle: "Existential Vacuum",
  part: "Part two · Logotherapy in a nutshell",
  teaser:
    "When instinct and tradition no longer tell us what to do, emptiness shows up as boredom, conformism, or totalitarianism.",
  readMinutes: 11,
  summary: [
    {
      type: "bigIdea",
      text: "The existential vacuum is inner emptiness — a void where meaning should be. With instincts gone and traditions fading, people often copy others (conformism) or obey others (totalitarianism).",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "masks", label: "Masks of the vacuum", color: "#155E75" },
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
          title: "A modern epidemic",
          body: "Frankl saw the vacuum as widespread: no instinct tells us what we must do; no tradition firmly tells us what we ought to do.",
        },
        {
          title: "Sunday neurosis",
      body: "Depression that appears when the busy week stops and emptiness has nowhere to hide.",
        },
        {
          title: "Responsibleness",
          body: "Logotherapy makes the person aware of responsibility — then leaves them free to decide for what, to what, or to whom they are responsible.",
        },
        {
          title: "Techniques that reopen freedom",
          body: "Paradoxical intention invites you to intend what you fear; dereflection turns hyper-attention away from the self toward a proper object.",
        },
      ],
    },
    {
      type: "cards",
      id: "masks",
      title: "Masks of the vacuum",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Boredom",
          body: "The vacuum’s most common face when nothing seems worth willing.",
          icon: "focus",
        },
        {
          title: "Conformism",
          body: "Doing what others do because you cannot hear what you wish to do.",
          icon: "meaning",
        },
        {
          title: "Will to money / pleasure / power",
          body: "Compensatory pursuits that try to fill a meaning-shaped hole.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Fear brings about that which one is afraid of — and hyper-intention makes impossible what one wishes. Meaning returns when attention leaves the ego’s grip.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Notice one empty hour this week without immediately filling it with noise — ask what it is asking for.",
        "Where are you conforming or complying instead of responding? Name a freer response.",
        "Practice dereflection once: put full attention on a person or task instead of monitoring yourself.",
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
          title: "Hyper-intention",
          body: "Clutching happiness, sleep, or confidence so tightly that the thing itself slips away.",
          icon: "warn",
        },
        {
          title: "Filling the void with speed",
          body: "Using busyness, scrolling, or status to avoid hearing the vacuum’s question.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q6-vacuum",
      prompt: "How strongly do I feel an inner emptiness or boredom right now?",
      type: "scale",
      help: "Scale · 1 = overwhelming vacuum, 10 = meaning-filled",
    },
    {
      id: "q6-mask",
      prompt: "Which mask shows up most for me — boredom, conformism, or compulsive filling — and where?",
      type: "text",
    },
    {
      id: "q6-responsible",
      prompt: "How responsibly am I answering what life is asking of me?",
      type: "scale",
      help: "Scale · 1 = avoiding, 10 = answering",
    },
    {
      id: "q6-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q6-commitment",
      prompt: "What is one response to the vacuum I will practice this week?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
