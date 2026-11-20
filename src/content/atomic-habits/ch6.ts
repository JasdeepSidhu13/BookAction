import type { Chapter } from "@/lib/types";

export const ch6: Omit<Chapter, "bankQuestions"> = {
  id: "ch-6-make-it-easy",
  number: 6,
  title: "Make It Easy",
  shortTitle: "Make It Easy",
  part: "The 3rd Law",
  teaser:
    "Reduce friction. Use the Two-Minute Rule so starting is so easy you cannot talk yourself out of it.",
  readMinutes: 11,
  summary: [
    {
      type: "bigIdea",
      text: "Human behavior follows the Law of Least Effort. Make the good habit the easy option — and the bad habit the hard one. Master the art of showing up with the Two-Minute Rule.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "easy", label: "Ease tactics", color: "#155E75" },
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
          title: "Motion vs action",
          body: "Planning, researching, and outlining can be motion. Action is the behavior that delivers an outcome.",
        },
        {
          title: "Reduce friction",
          body: "Prep the environment so the next action requires almost no setup — gym bag by the door, book on the pillow.",
        },
        {
          title: "Increase friction for bad habits",
          body: "Add steps, delays, and distance. Make the unwanted behavior inconvenient.",
        },
        {
          title: "Two-Minute Rule",
          body: "When you start a new habit, it should take less than two minutes to do. Scale down until starting is automatic.",
        },
      ],
    },
    {
      type: "cards",
      id: "easy",
      title: "Ease tactics",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Gateway habit",
          body: "“Read before bed” becomes “read one page.” Start so small you always begin.",
          icon: "action",
        },
        {
          title: "Prime the environment",
          body: "Set out tools in advance so the habit is already half done.",
          icon: "focus",
        },
        {
          title: "Commitment devices",
          body: "Future-proof good behavior — auto-pay, blocked sites, a packed lunch waiting.",
          icon: "meaning",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Standardize before you optimize. You have to standardize a habit before you can improve it — walk before you run.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Shrink your key habit to a two-minute version for the next seven days.",
        "Remove two minutes of friction from that habit’s setup.",
        "Add two minutes of friction to one bad habit you want less of.",
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
          title: "Optimizing too early",
          body: "Buying gear and perfecting plans before you have a reliable start ritual.",
          icon: "warn",
        },
        {
          title: "Staying tiny forever",
          body: "Using the Two-Minute Rule as a permanent ceiling instead of a gateway.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q6-easy",
      prompt: "How easy is it to start my key habit right now?",
      type: "scale",
      help: "Scale · 1 = high friction, 10 = nearly effortless to begin",
    },
    {
      id: "q6-two-min",
      prompt: "What is the two-minute version of the habit I want?",
      type: "text",
    },
    {
      id: "q6-friction",
      prompt: "How well did I manage friction (down for good, up for bad) this week?",
      type: "scale",
      help: "Scale · 1 = not at all, 10 = deliberately designed",
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
      prompt: "What friction change will I make today?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
