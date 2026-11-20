import type { Chapter } from "@/lib/types";

export const ch7: Omit<Chapter, "bankQuestions"> = {
  id: "ch-7-make-it-satisfying",
  number: 7,
  title: "Make It Satisfying",
  shortTitle: "Make It Satisfying",
  part: "The 4th Law",
  teaser:
    "What is rewarded is repeated. Add immediate satisfaction — and never miss twice.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "We are more likely to repeat a behavior when the experience is satisfying. Because the brain prioritizes immediate rewards, give good habits a little pleasure now — and make bad habits feel costly now.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "reinforce", label: "Reinforcement", color: "#155E75" },
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
          title: "Cardinal rule of behavior change",
          body: "What is immediately rewarded is repeated. What is immediately punished is avoided.",
        },
        {
          title: "Habit tracking",
          body: "Measuring progress is often satisfying by itself. Don’t break the chain — and if you do, get back on track quickly.",
        },
        {
          title: "Never miss twice",
          body: "Missing once is an accident. Missing twice is the start of a new habit. Recover on the next opportunity.",
        },
        {
          title: "Accountability",
          body: "A habit contract or accountability partner makes the costs of skipping social and immediate.",
        },
      ],
    },
    {
      type: "cards",
      id: "reinforce",
      title: "Reinforcement",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Immediate reward",
          body: "Pair the habit with a small celebration, checkmark, or treat that doesn’t undo the habit.",
          icon: "meaning",
        },
        {
          title: "Visible progress",
          body: "Trackers, jars, calendars — make completion something you can see.",
          icon: "focus",
        },
        {
          title: "Social cost",
          body: "Tell someone who will notice. Habit contracts raise the price of inaction.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The first rule of compounding is never interrupt it unnecessarily. Missing a day hurts less than deciding the streak is over.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Add one immediate reward to your key habit (checkmark, note, short pleasure).",
        "Start a simple tracker for seven days — paper is fine.",
        "Write your “never miss twice” recovery plan before you need it.",
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
          title: "Delayed-only rewards",
          body: "Relying only on distant outcomes (fitness in six months) with no near-term satisfaction.",
          icon: "warn",
        },
        {
          title: "Streak perfectionism",
          body: "Quitting entirely after one miss instead of protecting the long-term compound.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q7-satisfying",
      prompt: "How satisfying does completing my key habit feel?",
      type: "scale",
      help: "Scale · 1 = empty, 10 = immediately rewarding",
    },
    {
      id: "q7-reward",
      prompt: "What immediate reward or tracker will I use?",
      type: "text",
    },
    {
      id: "q7-recover",
      prompt: "How quickly do I recover after missing a day?",
      type: "scale",
      help: "Scale · 1 = spiral, 10 = never miss twice",
    },
    {
      id: "q7-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q7-commitment",
      prompt: "How will I make my habit more satisfying this week?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
