import type { Chapter } from "@/lib/types";

export const ch3: Omit<Chapter, "bankQuestions"> = {
  id: "ch-3-true-or-false",
  number: 3,
  title: "True or False?",
  shortTitle: "True or False?",
  part: "Part one · Warming up",
  teaser: "Popular myths about fear and confidence sound convincing — and keep you stuck.",
  readMinutes: 8,
  summary: [
    {
      type: "bigIdea",
      text: "Fear is not a sign of weakness, does not automatically impair performance, and genuine confidence is not the absence of fear. Holding those myths tightly is what holds you back.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Myths to drop", color: "#BE123C" },
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
          title: "Myth: fear = weakness",
          body: "High performers from athletes to actors routinely feel fear before they perform.",
        },
        {
          title: "Myth: fear impairs performance",
          body: "Arousal can sharpen focus when you relate to it skillfully instead of fighting it.",
        },
        {
          title: "Myth: fear holds you back",
          body: "Avoidance holds you back. Fear can travel with you while you act.",
        },
        {
          title: "Myth: confidence = no fear",
          body: "Genuine confidence includes fear and still chooses committed action.",
        },
        {
          title: "We’re all full of it",
          body: "Self-doubt and negative thoughts are part of having a human mind — not proof you’re uniquely flawed.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Myths to drop",
      accent: "#BE123C",
      tone: "rose",
      items: [
        {
          title: "Fear means I’m weak",
          body: "Fear means your alarm system is online.",
          icon: "warn",
        },
        {
          title: "I must feel calm first",
          body: "Waiting for calm is often another form of avoidance.",
          icon: "warn",
        },
        {
          title: "Positive affirmations fix it",
          body: "Affirmations can spark an inner argument when they clash with lived experience.",
          icon: "warn",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "You don’t need to get rid of fear to move forward — you need better rules for playing with it.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Pick one confidence myth you still buy into and write why it’s unworkable.",
        "Find one example from your life where you acted well while feeling afraid.",
        "Replace “I need to feel confident first” with “I can take a small values-based step with fear present.”",
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
          title: "Chasing calm as a prerequisite",
          body: "Making “no fear” the goal turns every flutter into failure.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q3-1",
      prompt: "How strongly did I believe “confidence means no fear” this week?",
      type: "scale",
      help: "Scale · 1 = not at all, 10 = completely",
    },
    {
      id: "q3-2",
      prompt: "Which confidence myth most influenced my choices this week?",
      type: "text",
    },
    {
      id: "q3-3",
      prompt: "How often did I act effectively while fear was present?",
      type: "scale",
      help: "Scale · 1 = never, 10 = often",
    },
    {
      id: "q3-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q3-5",
      prompt: "What myth am I dropping, and what action replaces it?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
