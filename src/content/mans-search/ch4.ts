import type { Chapter } from "@/lib/types";

export const ch4: Omit<Chapter, "bankQuestions"> = {
  id: "ch-4-liberation",
  number: 4,
  title: "Liberation and the Psychology After",
  shortTitle: "Liberation",
  part: "Part one · Experiences in a concentration camp",
  teaser:
    "After release comes another test: bitterness, moral decompression, and learning to say yes to life again.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Liberation is not an instant return to wholeness. The released prisoner must pass through depersonalization, bitterness, and moral danger before becoming a human being again.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "phases", label: "After the gate", color: "#155E75" },
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
          title: "Apathy had been armor",
          body: "In camp, initiative felt dangerous and fate seemed master. That psychic armor does not vanish the day the gates open.",
        },
        {
          title: "Depersonalization",
          body: "Freedom can feel unreal — like a dream — until the person slowly trusts the world again.",
        },
        {
          title: "Bitterness and disillusionment",
          body: "Coming home can wound again: indifference from others, or discovering that what one suffered for is gone.",
        },
        {
          title: "Moral decompression",
          body: "Sudden freedom without renewed responsibility can release cruelty — unless conscience is reclaimed.",
        },
      ],
    },
    {
      type: "cards",
      id: "phases",
      title: "After the gate",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Leave bitterness",
          body: "Suffering does not entitle anyone to become what they hated.",
          icon: "meaning",
        },
        {
          title: "Reclaim initiative",
          body: "Practice small decisions again — fate is not your permanent master.",
          icon: "action",
        },
        {
          title: "Re-enter meaning",
          body: "Ask again what life expects of you now that survival is no longer the only task.",
          icon: "focus",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "No one has the right to do wrong, not even if wrong has been done to them.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Name one bitterness you are still carrying — and one boundary between justice and revenge.",
        "Make one decision this week you have been leaving to “fate.”",
        "Write what life is asking of you now that a hard season has eased.",
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
          title: "Victim license",
          body: "Using past harm as permission to harm — or to stay forever passive.",
          icon: "warn",
        },
        {
          title: "Rushing recovery",
          body: "Expecting yourself or others to feel “normal” the moment conditions improve.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q4-bitterness",
      prompt: "How much is bitterness still steering my choices this week?",
      type: "scale",
      help: "Scale · 1 = fully steered by it, 10 = free of its grip",
    },
    {
      id: "q4-initiative",
      prompt: "Where am I still waiting for fate instead of deciding?",
      type: "text",
    },
    {
      id: "q4-responsibility",
      prompt: "How responsibly am I using whatever freedom I have right now?",
      type: "scale",
      help: "Scale · 1 = drifting, 10 = owning it",
    },
    {
      id: "q4-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q4-commitment",
      prompt: "What decision will I reclaim from fate this week?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
