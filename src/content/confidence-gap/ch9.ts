import type { Chapter } from "@/lib/types";

export const ch9: Omit<Chapter, "bankQuestions"> = {
  id: "ch-9-smell-the-roses",
  number: 9,
  title: "Smell the Roses",
  shortTitle: "Smell the Roses",
  part: "Part two · The double-edged sword",
  teaser: "Bring engagement into ordinary life — mornings, chores, and pleasures — through the five senses.",
  readMinutes: 8,
  summary: [
    {
      type: "bigIdea",
      text: "You don’t need a retreat to practice mindfulness. Engage through what you can see, hear, touch, taste, and smell in the life you’re already living.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Four engagement arenas", color: "#166534" },
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
          title: "Busy-person mindfulness",
          body: "Informal practice compounds when woven into routines.",
        },
        {
          title: "Morning routine",
          body: "Notice water temperature, sounds, smells, and movement instead of living on autopilot.",
        },
        {
          title: "Chores as training",
          body: "Dishes, laundry, and commuting become reps for presence.",
        },
        {
          title: "Pleasurable activities",
          body: "Savoring multiplies satisfaction when attention is actually there.",
        },
        {
          title: "Anything and everything",
          body: "Engagement is portable: any moment can be practice.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Four engagement arenas",
      accent: "#166534",
      tone: "green",
      items: [
        {
          title: "Morning routine",
          body: "Wake up into your senses before the mental to-do list takes over.",
          icon: "focus",
        },
        {
          title: "Chores",
          body: "Treat ordinary tasks as mindfulness gym time.",
          icon: "action",
        },
        {
          title: "Pleasure",
          body: "Actually taste the coffee; actually hear the song.",
          icon: "meaning",
        },
        {
          title: "Anything",
          body: "Use transitions and waiting as micro-practices.",
          icon: "focus",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "“Stop and smell the roses” only works if you actually stop — and smell.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Pick one morning action to do fully through the five senses.",
        "Do one chore today as engagement practice.",
        "During one pleasurable activity, drop multitasking and savor for two minutes.",
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
          title: "Saving mindfulness for later",
          body: "Waiting for free time often means practice never happens.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q9-1",
      prompt: "How often did I engage my senses during ordinary activities?",
      type: "scale",
      help: "Scale · 1 = never, 10 = often",
    },
    {
      id: "q9-2",
      prompt: "Which routine did I practice engaging in this week?",
      type: "text",
    },
    {
      id: "q9-3",
      prompt: "How much did savoring improve a moment of pleasure?",
      type: "scale",
      help: "Scale · 1 = not at all, 10 = a lot",
    },
    {
      id: "q9-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q9-5",
      prompt: "Which daily activity will I designate as my engagement gym?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
