import type { Chapter } from "@/lib/types";

export const ch8: Omit<Chapter, "bankQuestions"> = {
  id: "ch-8-habit-irresistible",
  number: 8,
  title: "How to Make a Habit Irresistible",
  shortTitle: "Irresistible",
  part: "The 2nd Law · Make It Attractive",
  teaser: "Dopamine, anticipation, and temptation bundling make habits magnetic.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "The more attractive an opportunity, the more likely it becomes habit-forming. It is the anticipation of reward — not only the reward itself — that fuels action.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Focus", color: "#155E75" },
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
          title: "Dopamine and wanting",
          body: "Dopamine rises with anticipation. Design cues that make the habit feel immediately appealing.",
        },
        {
          title: "Supernormal stimuli",
          body: "Modern cues (feeds, sugar, games) are engineered to be extra attractive — compete on design, not grit alone.",
        },
        {
          title: "Temptation bundling",
          body: "Only do [WANT] while doing [NEED]. Link pleasure to the habit you should do.",
        },
        {
          title: "Premack principle",
          body: "More-probable behaviors can reinforce less-probable ones when paired.",
        }
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Focus",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Bundle",
          body: "Pair need with want.",
          icon: "focus",
        },
        {
          title: "Anticipate",
          body: "Highlight the feeling before you start.",
          icon: "meaning",
        },
        {
          title: "Compete",
          body: "Make the good cue as vivid as the junk cue.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Habits are attractive when we associate them with positive feelings. Engineer the association on purpose.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Design one temptation bundle this week.",
        "Name the feeling you want before starting the habit.",
        "Make the good cue more vivid than a competing distraction."
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
          title: "Skipping the practice",
          body: "Collecting ideas without casting a vote in behavior today.",
          icon: "warn",
        },
        {
          title: "All-or-nothing",
          body: "Waiting for perfect conditions instead of a two-minute start.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q8-scale-a",
      prompt: "How attractive does my key habit feel?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q8-text-a",
      prompt: "What bundle will I use?",
      type: "text",
    },
    {
      id: "q8-scale-b",
      prompt: "What feeling will I anticipate on purpose?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q8-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q8-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
