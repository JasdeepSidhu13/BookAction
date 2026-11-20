import type { Chapter } from "@/lib/types";

export const ch7: Omit<Chapter, "bankQuestions"> = {
  id: "ch-7-secret-self-control",
  number: 7,
  title: "The Secret to Self-Control",
  shortTitle: "Self-Control",
  part: "The 1st Law · Make It Obvious",
  teaser: "People with great self-control structure life to need less of it.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Self-control is a short-term strategy; design is a long-term one. People with high self-control tend to spend less time in tempting situations in the first place.",
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
          title: "Cue-induced wanting",
          body: "Once a craving is triggered, resisting is hard. Cut the cue instead.",
        },
        {
          title: "Discipline as environment",
          body: "The “disciplined” often look that way because their world has fewer traps.",
        },
        {
          title: "Invert Make It Obvious",
          body: "For bad habits: make them invisible. Reduce exposure, not just willpower.",
        },
        {
          title: "Protect attention",
          body: "You can’t white-knuckle every cue all day. Redesign the defaults.",
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
          title: "Fewer traps",
          body: "Leave tempting rooms and feeds.",
          icon: "focus",
        },
        {
          title: "Faster exits",
          body: "Make leaving easy when cues hit.",
          icon: "meaning",
        },
        {
          title: "Invisible bad habits",
          body: "Hide, unfollow, uninstall.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The secret of self-control is often fewer tempting cues — not more grit in the moment.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "List your top three temptation cues.",
        "Remove or distance one of them today.",
        "Plan an exit script for when the craving still hits."
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
      id: "q7-scale-a",
      prompt: "Where am I overusing willpower?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q7-text-a",
      prompt: "Which temptation cue will I cut first?",
      type: "text",
    },
    {
      id: "q7-scale-b",
      prompt: "How cue-light is my default day?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
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
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
