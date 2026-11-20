import type { Chapter } from "@/lib/types";

export const ch26: Omit<Chapter, "bankQuestions"> = {
  id: "ch-26-ultimate-challenge",
  number: 26,
  title: "The Ultimate Challenge: What One Person Can Do",
  shortTitle: "Ultimate Challenge",
  part: "Part four · A lesson in destiny",
  teaser:
    "A mighty flame follows a tiny spark — decide how your life will contribute beyond yourself.",
  readMinutes: 11,
  summary: [
    {
      type: "bigIdea",
      text: "The ultimate challenge is contribution: what one committed person can do to improve the quality of life for others. Your giant is not fully awake until it serves.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Answer the challenge", color: "#155E75" },
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
          title: "One person can move systems",
          body: "Sam LaBudde's risky footage helped spark a tuna boycott that changed major canners' practices — proof that focused courage scales.",
        },
        {
          title: "Tiny sparks, mighty flames",
          body: "You don't need perfect conditions. You need a decision, a stand, and consistent action.",
        },
        {
          title: "Contribution completes the path",
          body: "Personal power without service becomes self-absorption. Awakening includes lifting others.",
        },
        {
          title: "Choose your cause with emotion",
          body: "Pick problems that anger or move you — emotion fuels persistence when the work is hard.",
        },
        {
          title: "Make it practical",
          body: "Translate care into a specific project, habit of giving, or leadership role you will sustain.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Answer the challenge",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Find the spark",
          body: "What injustice or unmet need won't leave you alone? Write it in one sentence.",
          icon: "focus",
        },
        {
          title: "Define one person impact",
          body: "What could you uniquely do in the next 90 days that helps real humans?",
          icon: "meaning",
        },
        {
          title: "Commit publicly",
          body: "Tell someone your contribution commitment and the first action date.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The technologies in this book are not only for private success — they are tools for becoming the kind of person whose life leaves people and systems better.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Choose one contribution focus for the next 90 days.",
        "Take a first concrete action within 48 hours (research, donate time, organize, create, advocate).",
        "Schedule a recurring contribution block on your calendar.",
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
          title: "Inspiration without incarnation",
          body: "Moved by stories but unchanged in calendar is still asleep.",
          icon: "warn",
        },
        {
          title: "Saving the world, neglecting the home",
          body: "Start where you have leverage — including your family and community — then expand.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q26-contribution",
  prompt: "How alive is contribution in my weekly life?",
  type: "scale",
  help: "Scale · 1 = absent, 10 = central",
},
    {
  id: "q26-cause",
  prompt: "What cause or contribution focus am I taking on?",
  type: "text",
},
    {
  id: "q26-action",
  prompt: "What first (or next) concrete action will I take within 48 hours?",
  type: "text",
},
              {
            id: "q26-followed",
            prompt: "Did I keep a contribution action this week?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
followsCommitment: true,
          },
              {
            id: "q26-commitment",
            prompt: "What is my ongoing Ultimate Challenge commitment?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
