import type { Chapter } from "@/lib/types";

export const ch15: Omit<Chapter, "bankQuestions"> = {
  id: "ch-15-plenty-of-space",
  number: 15,
  title: "Plenty of Space",
  shortTitle: "Expansion",
  part: "Part four · Taming your fear",
  teaser: "Expansion: notice fear, acknowledge it, make space for it, and widen awareness back to life.",
  readMinutes: 11,
  summary: [
    {
      type: "bigIdea",
      text: "You don’t have to win a war with fear sensations. Expansion teaches you to open around them so they can rise and fall without running your life.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Four expansion steps", color: "#155E75" },
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
          title: "Name your feelings",
          body: "Naming creates a little distance and clarity.",
        },
        {
          title: "Notice",
          body: "Map location, shape, temperature, movement, and texture of sensations.",
        },
        {
          title: "Acknowledge & make space",
          body: "Silently allow the feeling room instead of pushing it out.",
        },
        {
          title: "Expand awareness",
          body: "Keep the feeling in view while reconnecting to the world and your action.",
        },
        {
          title: "Troubleshooting",
          body: "Watch for hidden agendas, control illusions, fusion, mere tolerance, and forgetting the point.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Four expansion steps",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Notice",
          body: "Pay attention to the feeling in the body with curiosity.",
          icon: "focus",
        },
        {
          title: "Acknowledge",
          body: "Name it: “Here’s anxiety,” “Here’s fear.”",
          icon: "meaning",
        },
        {
          title: "Make space & expand",
          body: "Open around it, then include the world and your next move.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "If expansion becomes a sneaky control strategy to delete fear, fear often amplifies. The aim is willingness, not eradication.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Induce a mild fear memory and practice the four steps for two minutes.",
        "Use expansion once daily with any difficult feeling, not only fear.",
        "After expanding, take one small values-guided action while sensations remain.",
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
          title: "Hidden agenda",
          body: "Doing expansion only to make fear vanish turns it into another struggle.",
          icon: "warn",
        },
        {
          title: "Tolerance without purpose",
          body: "White-knuckling isn’t expansion; values give the why.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q15-1",
      prompt: "How often did I make space for fear instead of fighting it?",
      type: "scale",
      help: "Scale · 1 = fought it, 10 = made space",
    },
    {
      id: "q15-2",
      prompt: "What did I notice in my body when fear showed up?",
      type: "text",
    },
    {
      id: "q15-3",
      prompt: "After expanding, how able was I to re-engage with life?",
      type: "scale",
      help: "Scale · 1 = stuck inside, 10 = re-engaged",
    },
    {
      id: "q15-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q15-5",
      prompt: "In which situation will I practice expansion this week?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
