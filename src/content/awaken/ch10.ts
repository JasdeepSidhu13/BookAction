import type { Chapter } from "@/lib/types";

export const ch10: Omit<Chapter, "bankQuestions"> = {
  id: "ch-10-life-metaphors",
  number: 10,
  title: "The Power of Life Metaphors",
  shortTitle: "Life Metaphors",
  part: "Part one · Unleash your power",
  teaser:
    "The metaphors you live by — life as a battle, a test, a dance — quietly script how you feel and act.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Metaphors are not decoration. They are compressed belief systems. Change a global metaphor and you can change how you feel and behave across many areas of life at once.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Rewrite your metaphors", color: "#155E75" },
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
          title: "Words that carry a whole world",
          body: "Saying \"I'm drowning,\" \"I'm at a dead end,\" or \"I'm floating on air\" does more than describe — it loads your nervous system with a scene.",
        },
        {
          title: "Metaphors teach by analogy",
          body: "When something is unfamiliar, a metaphor links it to what you already understand — electricity as water pressure, learning as play.",
        },
        {
          title: "Global metaphors shape everything",
          body: "If life is a \"test,\" stress rises. If life is a \"dance,\" relationship and work feel different. One pivot can recolor many domains.",
        },
        {
          title: "Context matters",
          body: "A metaphor that works at work (air traffic controller calm detachment) can devastate intimacy at home if it never turns off.",
        },
        {
          title: "Choose empowering stories",
          body: "The stonecutter who keeps striking the boulder reminds you: progress can be invisible until the crack finally opens.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Rewrite your metaphors",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Inventory life metaphors",
          body: "List metaphors you use for life, work, learning, money, and health. Note which empower and which drain you.",
          icon: "focus",
        },
        {
          title: "Inventory relationship metaphors",
          body: "Is marriage a \"battlefield,\" a \"garden,\" a \"team,\" or a \"prison\"? Conscious awareness alone often breaks toxic ones.",
          icon: "meaning",
        },
        {
          title: "Install one new global metaphor",
          body: "Pick a metaphor that creates the emotions and actions you want — then use it out loud for 10 days.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Toxic metaphors are debilitating because they become the default filter for every new experience. Swap the filter and the same facts can produce a different life.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write five metaphors you currently use for life or work and rate each as empowering or disempowering.",
        "Replace your worst metaphor with a more useful one (e.g., \"life is a test\" → \"life is an adventure\").",
        "Ask three people what metaphors they hear you use — awareness accelerates change.",
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
          title: "Importing job metaphors into love",
          body: "Professional roles (judge, officer, director) can poison close relationships if they stay on after hours.",
          icon: "warn",
        },
        {
          title: "Collecting metaphors unconsciously",
          body: "Most people never chose their metaphors — they absorbed them. What you don't choose still runs you.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q10-metaphor-awareness",
  prompt: "How aware am I of the metaphors I live by?",
  type: "scale",
  help: "Scale · 1 = never notice them, 10 = catching them in real time",
},
    {
  id: "q10-current-metaphors",
  prompt: "What metaphors do I use for life, work, and relationships — and which are toxic?",
  type: "text",
},
    {
  id: "q10-new-metaphor",
  prompt: "Which new global metaphor am I installing, and what feeling should it create?",
  type: "text",
},
              {
            id: "q10-followed",
            prompt: "Did I catch and replace an old metaphor this week?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
followsCommitment: true,
          },
              {
            id: "q10-commitment",
            prompt: "What metaphor practice will I run for the next 10 days?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
