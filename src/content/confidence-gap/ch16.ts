import type { Chapter } from "@/lib/types";

export const ch16: Omit<Chapter, "bankQuestions"> = {
  id: "ch-16-riding-a-wild-stallion",
  number: 16,
  title: "Riding a Wild Stallion",
  shortTitle: "Fear-Whispering",
  part: "Part four · Taming your fear",
  teaser: "Befriend fear like a wild stallion: allow it, befriend it, and channel its energy into valued action.",
  readMinutes: 8,
  summary: [
    {
      type: "bigIdea",
      text: "Fear-whispering means changing your relationship with fear — allowing and befriending it, then directing its energy into what matters.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "ABC of fear-whispering", color: "#B45309" },
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
          title: "Allow it",
          body: "Stop the war. Let the feeling be present without obeying or banishing it.",
        },
        {
          title: "Befriend it",
          body: "Treat fear as a protective (if overeager) ally rather than an enemy.",
        },
        {
          title: "Channel it",
          body: "Ask how to use the energy in values-guided activity.",
        },
        {
          title: "ABC of fear-whispering",
          body: "Allow → Befriend → Channel.",
        },
        {
          title: "Humor and warmth",
          body: "A lighter stance often reduces struggle faster than force.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "ABC of fear-whispering",
      accent: "#B45309",
      tone: "amber",
      items: [
        {
          title: "Allow",
          body: "Make room; drop the fight.",
          icon: "focus",
        },
        {
          title: "Befriend",
          body: "Speak to fear with respect: it’s trying to protect you.",
          icon: "meaning",
        },
        {
          title: "Channel",
          body: "Pour the energy into a values-guided move.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "If befriending fear helps you live your values, the effort is worth it — even when you don’t like the feeling.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "When fear shows up, silently say “I see you” and breathe into the sensation.",
        "Ask: how can I make use of this energy right now?",
        "Channel fear into one concrete values activity today.",
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
          title: "Forcing friendliness",
          body: "Fake cheerfulness isn’t befriending; honest allowance is.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q16-1",
      prompt: "How often did I allow fear instead of fighting it?",
      type: "scale",
      help: "Scale · 1 = fought, 10 = allowed",
    },
    {
      id: "q16-2",
      prompt: "How did I try to befriend or channel fear this week?",
      type: "text",
    },
    {
      id: "q16-3",
      prompt: "How effectively did I put fear’s energy into valued action?",
      type: "scale",
      help: "Scale · 1 = not at all, 10 = very",
    },
    {
      id: "q16-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q16-5",
      prompt: "Where will I practice Allow–Befriend–Channel next?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
