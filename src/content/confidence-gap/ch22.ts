import type { Chapter } from "@/lib/types";

export const ch22: Omit<Chapter, "bankQuestions"> = {
  id: "ch-22-reach-the-peak",
  number: 22,
  title: "Reach the Peak",
  shortTitle: "Peak",
  part: "Part five · Playing the game",
  teaser: "Peak performance has pre, during, and post phases — and a healthy life balance around the climb.",
  readMinutes: 9,
  summary: [
    {
      type: "bigIdea",
      text: "Prepare mindfully, engage fully during performance, then reflect with openness afterward. Excellence has costs — choose them consciously across love, work, play, and health.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Three performance phases", color: "#B45309" },
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
          title: "Pre-performance",
          body: "Defuse, expand, connect to values, and focus on process.",
        },
        {
          title: "During",
          body: "Engage with the task; let commentary come and go.",
        },
        {
          title: "Post-performance",
          body: "Celebrate or learn without fusion into identity.",
        },
        {
          title: "Flow isn’t forced",
          body: "Chasing “the zone” can recreate struggle; presence is trainable.",
        },
        {
          title: "Healthy balance",
          body: "Weekly check-ins across life domains prevent success from hollowing out your life.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Three performance phases",
      accent: "#B45309",
      tone: "amber",
      items: [
        {
          title: "Before",
          body: "Warm up psychologically: values, willingness, focus cues.",
          icon: "focus",
        },
        {
          title: "During",
          body: "Stay with the task; notice hooks; return.",
          icon: "action",
        },
        {
          title: "After",
          body: "Reflect: what worked, what didn’t, what’s next — then rebalance life.",
          icon: "meaning",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Ask honestly: am I content to be competent here, or is excellence worth the sacrifice — and what am I unwilling to sacrifice?",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Create a 3-step pre-performance ritual using defusion + values + focus.",
        "After your next performance, run the three reflection questions within 24 hours.",
        "Once this week, spend five minutes reviewing love, work, play, and health balance.",
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
          title: "Excellence without inventory",
          body: "Climbing one peak while the rest of life collapses isn’t winning the confidence game.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q22-1",
      prompt: "How mindful was my pre-performance preparation?",
      type: "scale",
      help: "Scale · 1 = chaotic, 10 = deliberate",
    },
    {
      id: "q22-2",
      prompt: "How present was I during my key performance this week?",
      type: "text",
    },
    {
      id: "q22-3",
      prompt: "How balanced are love, work, play, and health right now?",
      type: "scale",
      help: "Scale · 1 = collapsed, 10 = healthy",
    },
    {
      id: "q22-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q22-5",
      prompt: "What balance adjustment and performance practice am I committing to?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
