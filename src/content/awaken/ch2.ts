import type { Chapter } from "@/lib/types";

export const ch2: Chapter = {
  id: "ch-2-decisions",
  number: 2,
  title: "Decisions: The Pathway to Power",
  shortTitle: "Decisions",
  part: "Part one · Unleash your power",
  teaser:
    "Your destiny is shaped in moments of decision — decide what to focus on, what it means, and what to do.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "It is in your moments of decision that your destiny is shaped. A true decision means committing to a result and cutting yourself off from any other possibility.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "three", label: "Three destiny decisions", color: "#155E75" },
        { id: "formula", label: "Ultimate success formula", color: "#3730A3" },
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
          title: "Decision is the father of action",
          body: "Different actions produce different results — and action begins the moment you truly decide.",
        },
        {
          title: "Interest is not commitment",
          body: "If you don't set a baseline standard for what you'll accept, it's easy to slip below what you deserve.",
        },
        {
          title: "Make more decisions to make better ones",
          body: "Repetition is the mother of skill. Learn from every decision, including those that don't work short-term.",
        },
        {
          title: "Stay committed to the goal, flexible on the approach",
          body: "Hold the outcome steady. Change tactics whenever something isn't working.",
        },
        {
          title: "Long-term focus creates success",
          body: "Success and failure are not overnight. Small decisions — standards, contribution, what you feed your mind — compound.",
        },
      ],
    },
    {
      type: "cards",
      id: "three",
      title: "The three decisions that control your destiny",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "What to focus on",
          body: "Where you put your attention decides what you notice — and what you feel.",
          icon: "focus",
        },
        {
          title: "What it means",
          body: "The meaning you give an event shapes how you respond to it.",
          icon: "meaning",
        },
        {
          title: "What to do",
          body: "The action you take turns focus and meaning into results.",
          icon: "action",
        },
      ],
    },
    {
      type: "keyIdeas",
      id: "formula",
      title: "The ultimate success formula",
      accent: "#3730A3",
      ideas: [
        {
          title: "1 · Decide what you want",
          body: "Get clear on the outcome you're absolutely committed to achieving.",
        },
        {
          title: "2 · Take action",
          body: "Never leave the scene of a decision without a specific first action.",
        },
        {
          title: "3 · Notice what's working or not",
          body: "Evaluate honestly. Information is power when it's acted upon.",
        },
        {
          title: "4 · Change your approach until you achieve it",
          body: "Use whatever life gives you along the way. There are no failures — only references.",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "If you don't make decisions about how you're going to live, you've already decided — to be directed by the environment instead of shaping your destiny.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Answer: How will I live the next ten years? How will I live today to create that tomorrow? What will I stand for from now on?",
        "Make one easy decision and one harder decision you've been putting off — then take a first action on each within 24 hours.",
        "Each evening, note one decision you made and what it taught you.",
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
          title: "The Niagara Syndrome",
          body: "Jumping into the river of life without deciding where you want to end up — then getting swept by current events and fears.",
          icon: "warn",
        },
        {
          title: "Short-term fixes",
          body: "Failing to commit to long-term results. Small skipped follow-ups become the life experience we call failure.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q2-decide-consistently",
      prompt: "How consistently am I making decisions instead of putting them off?",
      type: "scale",
      help: "Scale · 1 = constantly deferring, 10 = deciding quickly and clearly",
    },
    {
      id: "q2-deferred-cost",
      prompt: "What is one decision I've been putting off, and what is it costing me?",
      type: "text",
    },
    {
      id: "q2-focus-deliberate",
      prompt: "How deliberately did I choose what to focus on this week?",
      type: "scale",
      help: "Scale · 1 = reacting all week, 10 = fully intentional",
    },
    {
      id: "q2-followed-through",
      prompt: "Did I take action within 24 hours on the decision I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q2-commitment",
      prompt: "What decision am I committing to now, and what is my first action?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
