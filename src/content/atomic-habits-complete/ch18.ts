import type { Chapter } from "@/lib/types";

export const ch18: Omit<Chapter, "bankQuestions"> = {
  id: "ch-18-truth-about-talent",
  number: 18,
  title: "The Truth About Talent (When Genes Matter and When They Don’t)",
  shortTitle: "Talent",
  part: "Advanced tactics · From good to great",
  teaser: "Genes load the gun; habits pull the trigger — work with your nature.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Genes influence where you have an edge, but habits determine how fully you play the hand you are dealt. Choose games that fit your nature — then practice deliberately.",
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
          title: "Explore then exploit",
          body: "Try broadly, then double down where you show interest and progress.",
        },
        {
          title: "Personality and habits",
          body: "Build systems that fit who you are, not a copy of someone else’s routine.",
        },
        {
          title: "Specialized practice",
          body: "Once the field fits, habits of deliberate practice matter more than raw talent stories.",
        },
        {
          title: "Stop fighting your wiring",
          body: "A mismatched game makes every habit feel like friction.",
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
          title: "Fit the game",
          body: "Choose arenas that suit you.",
          icon: "focus",
        },
        {
          title: "Then grind",
          body: "Habits multiply the fit.",
          icon: "meaning",
        },
        {
          title: "Ignore myths",
          body: "Talent without practice stalls.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Play a game that favors your inclinations — then let atomic habits compound the advantage.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Name where effort feels unusually natural.",
        "Drop or redesign one habit fighting your wiring.",
        "Add deliberate practice in a high-fit area."
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
      id: "q18-scale-a",
      prompt: "Where do I have natural fit?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q18-text-a",
      prompt: "Which habit fights my nature?",
      type: "text",
    },
    {
      id: "q18-scale-b",
      prompt: "What game should I play more seriously?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q18-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q18-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
