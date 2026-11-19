import type { Chapter } from "@/lib/types";

export const ch10: Omit<Chapter, "bankQuestions"> = {
  id: "ch-10-psychological-smog",
  number: 10,
  title: "Psychological Smog",
  shortTitle: "Smog",
  part: "Part two · The double-edged sword",
  teaser: "Worry creates psychological smog. Defusion and engagement clear enough space to move.",
  readMinutes: 9,
  summary: [
    {
      type: "bigIdea",
      text: "Worrying isn’t having thoughts about the future — it’s fusing with them, replaying them, and living inside them. Clear the smog with mindfulness skills, then take care through action.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Five steps out of smog", color: "#B45309" },
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
          title: "Worry vs thoughts",
          body: "Thoughts appear; worrying means gripping and looping.",
        },
        {
          title: "Costs of worrying",
          body: "Time, energy, presence, sleep, and opportunities get taxed.",
        },
        {
          title: "Unhook from reasons to worry",
          body: "“I should worry or I’m irresponsible” is often another hook.",
        },
        {
          title: "Distinguish worry from taking care",
          body: "Planning and acting differ from mental spinning.",
        },
        {
          title: "Defuse from worrying itself",
          body: "Name the process: “Here’s worrying,” then return to now.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Five steps out of smog",
      accent: "#B45309",
      tone: "amber",
      items: [
        {
          title: "Know what worry is",
          body: "Fusion with future-threat thoughts, not mere awareness.",
          icon: "focus",
        },
        {
          title: "See the costs",
          body: "Inventory what worrying steals from your life.",
          icon: "warn",
        },
        {
          title: "Unhook & act",
          body: "Defuse, then take care through concrete next steps.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "If your skills are “good enough,” smog — not capability — may be what’s blocking confidence in motion.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "List three costs worrying has created in the last month.",
        "Separate one worry loop from one concrete “taking care” action.",
        "When worrying starts, name it and shift into a 60-second engagement practice.",
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
          title: "Worry as fake preparation",
          body: "Mental rehearsal can feel responsible while postponing real preparation.",
          icon: "warn",
        },
        {
          title: "Not practicing skills",
          body: "Reading about mindfulness without reps leaves the smog intact.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q10-1",
      prompt: "How much did worry smog reduce my presence this week?",
      type: "scale",
      help: "Scale · 1 = not at all, 10 = heavily",
    },
    {
      id: "q10-2",
      prompt: "What did worrying cost me this week (time, sleep, connection, action)?",
      type: "text",
    },
    {
      id: "q10-3",
      prompt: "How often did I convert worry into concrete taking-care actions?",
      type: "scale",
      help: "Scale · 1 = never, 10 = often",
    },
    {
      id: "q10-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q10-5",
      prompt: "What worry will I defuse from, and what care-taking action replaces it?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
