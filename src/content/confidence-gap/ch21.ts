import type { Chapter } from "@/lib/types";

export const ch21: Omit<Chapter, "bankQuestions"> = {
  id: "ch-21-getting-better",
  number: 21,
  title: "Getting Better",
  shortTitle: "Getting Better",
  part: "Part five · Playing the game",
  teaser: "Improve through mindfulness, reflection, and honest feedback — better beats perfect.",
  readMinutes: 9,
  summary: [
    {
      type: "bigIdea",
      text: "Self-awareness grows from mindfulness, reflection, and trustworthy feedback. Ask what worked, what didn’t, and what to try differently — then keep going.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Self-awareness loop", color: "#155E75" },
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
          title: "Three pillars",
          body: "Mindfulness + reflection + feedback.",
        },
        {
          title: "Workability questions",
          body: "What worked? What didn’t? What could I do differently?",
        },
        {
          title: "Feedback quality",
          body: "Seek honest, practical, respectful input — not hatchet jobs or empty praise.",
        },
        {
          title: "Self-doubt vs awareness",
          body: "Doubt comments; awareness observes data.",
        },
        {
          title: "Better or best",
          body: "Continuous improvement beats perfectionism’s freeze.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Self-awareness loop",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Mindfulness",
          body: "Notice habitual thinking, feeling, and acting patterns.",
          icon: "focus",
        },
        {
          title: "Reflection",
          body: "Assess workability without self-attack.",
          icon: "meaning",
        },
        {
          title: "Feedback",
          body: "Invite competent, compassionate outside eyes.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "You don’t need to be the best to get better — and getting better is a values practice you can renew daily.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "After your next attempt, write answers to the three reflection questions.",
        "Identify one trusted person who can give useful feedback.",
        "Choose “better” over “best” for one perfectionism hotspot.",
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
          title: "Using reflection as self-attack",
          body: "If review becomes a beating, you’ll avoid reviewing.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q21-1",
      prompt: "How consistently did I reflect with the three questions?",
      type: "scale",
      help: "Scale · 1 = never, 10 = consistently",
    },
    {
      id: "q21-2",
      prompt: "What feedback did I seek or receive, and what did I learn?",
      type: "text",
    },
    {
      id: "q21-3",
      prompt: "Did I aim for better — or freeze chasing best?",
      type: "scale",
      help: "Scale · 1 = froze, 10 = improved iteratively",
    },
    {
      id: "q21-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q21-5",
      prompt: "What skill will I improve with one mindful practice block this week?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
