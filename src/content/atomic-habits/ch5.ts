import type { Chapter } from "@/lib/types";

export const ch5: Omit<Chapter, "bankQuestions"> = {
  id: "ch-5-make-it-attractive",
  number: 5,
  title: "Make It Attractive",
  shortTitle: "Make It Attractive",
  part: "The 2nd Law",
  teaser:
    "Temptation bundling and social norms pull habits forward — reframe the craving to want what helps you.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "The more attractive an opportunity is, the more likely it becomes habit-forming. Pair what you need to do with what you want to do — and join cultures where your desired behavior is normal.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "levers", label: "Attraction levers", color: "#155E75" },
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
          title: "Dopamine drives wanting",
          body: "Anticipation of reward fuels action. Design cues that make the good habit feel immediately appealing.",
        },
        {
          title: "Temptation bundling",
          body: "Only do [WANT] while doing [NEED]. Link a habit you should do with one you want to do.",
        },
        {
          title: "We imitate the close, the many, and the powerful",
          body: "Family, peer norms, and status figures shape what feels attractive. Choose your tribe carefully.",
        },
        {
          title: "Reframe the mindset",
          body: "Shift “I have to” into “I get to.” Highlight the benefit you are moving toward, not only the cost.",
        },
      ],
    },
    {
      type: "cards",
      id: "levers",
      title: "Attraction levers",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Bundle",
          body: "Attach a pleasure you already crave to the habit you are building.",
          icon: "meaning",
        },
        {
          title: "Belong",
          body: "Spend time where the identity you want is already normal.",
          icon: "focus",
        },
        {
          title: "Reframe",
          body: "Name the freedom, energy, or pride the habit creates — before you start.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Habits are attractive when we associate them with positive feelings. Make the cue for the habit something you look forward to noticing.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Design one temptation bundle for a habit you resist.",
        "Identify one person or group that normalizes the identity you want — schedule contact.",
        "Rewrite one “I have to” habit as an “I get to” sentence.",
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
          title: "Shame as fuel",
          body: "Trying to force habits through self-disgust — it rarely sustains attraction.",
          icon: "warn",
        },
        {
          title: "The wrong tribe",
          body: "Surroundings that celebrate the habits you are trying to quit.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q5-attractive",
      prompt: "How attractive does my key habit feel right now?",
      type: "scale",
      help: "Scale · 1 = dread, 10 = I look forward to it",
    },
    {
      id: "q5-bundle",
      prompt: "What temptation bundle or social cue will make it more appealing?",
      type: "text",
    },
    {
      id: "q5-reframe",
      prompt: "How often did I reframe “have to” as “get to” this week?",
      type: "scale",
      help: "Scale · 1 = never, 10 = consistently",
    },
    {
      id: "q5-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q5-commitment",
      prompt: "How will I make my habit more attractive this week?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
