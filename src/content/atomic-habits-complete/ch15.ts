import type { Chapter } from "@/lib/types";

export const ch15: Omit<Chapter, "bankQuestions"> = {
  id: "ch-15-cardinal-rule",
  number: 15,
  title: "The Cardinal Rule of Behavior Change",
  shortTitle: "Cardinal Rule",
  part: "The 4th Law · Make It Satisfying",
  teaser: "What is immediately rewarded is repeated; what is immediately punished is avoided.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "What is immediately rewarded is repeated. What is immediately punished is avoided. Because the brain prioritizes immediate outcomes, add a little pleasure now to habits whose payoff is delayed.",
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
          title: "Immediate vs delayed",
          body: "Good habits often punish now and reward later; bad habits reverse that. Bridge the gap.",
        },
        {
          title: "Make it satisfying now",
          body: "A checkmark, a small treat, a visible win — without undoing the habit.",
        },
        {
          title: "Incentives that fit",
          body: "Rewards should reinforce identity, not sabotage it (don’t “reward” a run with a binge).",
        },
        {
          title: "Ending on a good note",
          body: "Finish the habit with a moment you look forward to.",
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
          title: "Reward now",
          body: "Close the loop today.",
          icon: "focus",
        },
        {
          title: "Align rewards",
          body: "Don’t undo the habit.",
          icon: "meaning",
        },
        {
          title: "Feel the win",
          body: "Make completion visceral.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The first three laws increase the odds you will perform a behavior. The fourth law increases the odds you will repeat it.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Add one immediate reward to your key habit.",
        "Remove one reward that sabotages a good habit.",
        "Design a satisfying ending ritual."
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
      id: "q15-scale-a",
      prompt: "Is my habit immediately satisfying?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q15-text-a",
      prompt: "What reward will I add that fits my identity?",
      type: "text",
    },
    {
      id: "q15-scale-b",
      prompt: "Where do delayed payoffs lose to instant junk?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q15-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q15-commitment",
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
