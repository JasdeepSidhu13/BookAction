import type { Chapter } from "@/lib/types";

export const ch2: Omit<Chapter, "bankQuestions"> = {
  id: "ch-2-the-good-old-days",
  number: 2,
  title: "The Good Old Days",
  shortTitle: "Good Old Days",
  part: "Part one · Warming up",
  teaser: "Fear is not a modern glitch — it’s an ancient survival system that still fires in today’s challenges.",
  readMinutes: 8,
  summary: [
    {
      type: "bigIdea",
      text: "Your nervous system evolved for saber-toothed threats. In modern life it still sounds the alarm for auditions, dates, meetings, and risks that matter — which is normal, not weakness.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "What fear learned to mean", color: "#B45309" },
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
          title: "Fight-or-flight is ancient",
          body: "A pounding heart and racing thoughts once helped us survive predators; the same hardware still activates under psychological threat.",
        },
        {
          title: "Messages about fear",
          body: "Growing up, many of us learned that fear means something is wrong with us — cowardice, weakness, or failure.",
        },
        {
          title: "Fear as information",
          body: "Fear often shows up precisely when we step toward something that matters.",
        },
        {
          title: "Wrong rules take root early",
          body: "Society, media, and well-meaning advice teach us to eliminate fear before we act.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "What fear learned to mean",
      accent: "#B45309",
      tone: "amber",
      items: [
        {
          title: "Fear = danger",
          body: "Useful for tigers; misleading for public speaking or asking someone out.",
          icon: "warn",
        },
        {
          title: "Fear = weakness",
          body: "A cultural story that fuels shame instead of skillful action.",
          icon: "warn",
        },
        {
          title: "Fear = stop sign",
          body: "Treating anxiety as a command to retreat keeps life small.",
          icon: "warn",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "You don’t need a broken past to lack confidence — you need a human nervous system plus the wrong rules for working with fear.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Recall one early message you received about feeling afraid.",
        "Name a current challenge where fight-or-flight shows up even though you’re physically safe.",
        "Thank your mind for trying to protect you — then note what values-guided move fear is guarding against.",
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
          title: "Pathologizing fear",
          body: "Assuming anxiety means you’re broken keeps you fighting yourself instead of learning new skills.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q2-1",
      prompt: "How much did I treat fear as a stop sign this week?",
      type: "scale",
      help: "Scale · 1 = never, 10 = constantly",
    },
    {
      id: "q2-2",
      prompt: "What old message about fear showed up for me recently?",
      type: "text",
    },
    {
      id: "q2-3",
      prompt: "How willing was I to feel fear while moving toward what matters?",
      type: "scale",
      help: "Scale · 1 = unwilling, 10 = fully willing",
    },
    {
      id: "q2-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q2-5",
      prompt: "Where will I deliberately step toward a valued challenge despite fear?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
