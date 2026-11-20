import type { Chapter } from "@/lib/types";

export const ch9: Omit<Chapter, "bankQuestions"> = {
  id: "ch-9-family-and-friends",
  number: 9,
  title: "The Role of Family and Friends in Shaping Your Habits",
  shortTitle: "Social Habits",
  part: "The 2nd Law · Make It Attractive",
  teaser: "We imitate the close, the many, and the powerful — choose your culture.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "One of the most effective things you can do to build better habits is to join a culture where your desired behavior is the normal behavior.",
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
          title: "The close",
          body: "Family and friends set the default. Proximity shapes practice.",
        },
        {
          title: "The many",
          body: "We follow social norms — what “people like us” do.",
        },
        {
          title: "The powerful",
          body: "Status figures make behaviors look attractive and worth copying.",
        },
        {
          title: "Join the right room",
          body: "Nothing sustains motivation like belonging to a tribe that already runs your desired habit.",
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
          title: "Belong",
          body: "Find the tribe that normalizes your goal.",
          icon: "focus",
        },
        {
          title: "Distance",
          body: "Reduce time in cultures that celebrate the old habit.",
          icon: "meaning",
        },
        {
          title: "Signal",
          body: "Make your identity visible to people who reinforce it.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Surround yourself with people who have the habits you want. Their normal becomes your easy.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Name one person or group that normalizes your desired identity.",
        "Schedule contact with them this week.",
        "Reduce one social cue that reinforces a bad habit."
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
      id: "q9-scale-a",
      prompt: "Whose habits am I quietly copying?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q9-text-a",
      prompt: "Where is my desired behavior already normal?",
      type: "text",
    },
    {
      id: "q9-scale-b",
      prompt: "What social change will I make this week?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q9-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q9-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
