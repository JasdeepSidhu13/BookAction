import type { Chapter } from "@/lib/types";

export const ch7: Omit<Chapter, "bankQuestions"> = {
  id: "ch-7-make-it-satisfying",
  number: 7,
  title: "Make It Satisfying",
  shortTitle: "Make It Satisfying",
  part: "The 4th Law",
  teaser:
    "The cardinal rule: what is immediately rewarded is repeated. Track it — and never miss twice.",
  readMinutes: 11,
  summary: [
    {
      type: "bigIdea",
      text: "The first mistake is never the one that ruins you — it is the spiral of repeated mistakes that follows. Missing once is an accident. Missing twice is the start of a new habit. Reclaim fast.",
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
          body: "What is immediately rewarded is repeated. What is immediately punished is avoided. Add a little pleasure now to habits whose payoff is delayed.",
        },
        {
          title: "Habit tracking",
          body: "Measuring progress is satisfying by itself. Make completion visible — calendar, jar, app — so the streak reinforces the loop.",
        },
        {
          title: "Never miss twice",
          body: "Anyone can have a bad day. Winners rebound on the next opportunity. Breaking a habit matters less when reclaiming it is fast.",
        },
        {
          title: "Accountability partner",
          body: "A habit contract or partner makes the cost of skipping social and immediate — raising the odds you follow through.",
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
          body: "Checkmark, note, or small treat that doesn’t undo the habit.",
          icon: "meaning",
        },
        {
          title: "Visible progress",
          body: "Don’t break the chain — and if you do, start the next one immediately.",
          icon: "focus",
        },
        {
          title: "Social cost",
          body: "Tell someone who will notice. Make inaction expensive.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The problem is not slipping up; the problem is thinking that if you can’t do something perfectly, then you shouldn’t do it at all.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Add one immediate reward to your key habit.",
        "Start a simple seven-day tracker — paper is fine.",
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
          body: "Relying only on distant outcomes with no near-term satisfaction.",
          icon: "warn",
        },
        {
          title: "All-or-nothing streaks",
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
