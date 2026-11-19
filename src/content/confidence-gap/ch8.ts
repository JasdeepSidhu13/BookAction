import type { Chapter } from "@/lib/types";

export const ch8: Omit<Chapter, "bankQuestions"> = {
  id: "ch-8-the-rules-of-engagement",
  number: 8,
  title: "The Rules of Engagement",
  shortTitle: "Engagement",
  part: "Part two · The double-edged sword",
  teaser: "Engagement is being psychologically present — fully in the moment instead of lost in commentary.",
  readMinutes: 11,
  summary: [
    {
      type: "bigIdea",
      text: "When you’re fused with thoughts, you miss the stage show of life. Engagement brings attention back to seeing, hearing, touching, tasting, smelling — and to the task at hand.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Engagement basics", color: "#155E75" },
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
          title: "Cotton-wool living",
          body: "Fusion muffles experience the way cotton muffles music.",
        },
        {
          title: "Stage show of life",
          body: "You can spotlight thoughts, body sensations, or the outer world — and learn to shift flexibly.",
        },
        {
          title: "Mindful breathing",
          body: "A foundational practice for returning when the mind hooks you.",
        },
        {
          title: "Getting hooked is normal",
          body: "Beginners often last seconds; each return is the skill.",
        },
        {
          title: "Anytime practice",
          body: "Build informal reps while waiting, walking, or transitioning between tasks.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Engagement basics",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Be there",
          body: "Don’t just do something — inhabit what you’re doing.",
          icon: "focus",
        },
        {
          title: "Use the breath",
          body: "Anchor attention, notice hooks, return without drama.",
          icon: "action",
        },
        {
          title: "Expand the spotlight",
          body: "Include the world around you, not only inner commentary.",
          icon: "meaning",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Performance and fulfillment both require contact with the present — not a mind stuck in rehearsal and review.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Practice five minutes of mindful breathing; restart kindly each time you’re hooked.",
        "Take 30–60 seconds to notice sounds, then sights, then body sensations.",
        "Schedule two informal engagement reps today (waiting in line, walking, washing dishes).",
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
          title: "Turning mindfulness into a calm-chasing tool",
          body: "If success means “feeling zen,” you’ll judge ordinary distraction as failure.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q8-1",
      prompt: "How present was I during important tasks this week?",
      type: "scale",
      help: "Scale · 1 = lost in thought, 10 = deeply engaged",
    },
    {
      id: "q8-2",
      prompt: "Where did fusion pull me out of the moment most often?",
      type: "text",
    },
    {
      id: "q8-3",
      prompt: "How consistent was my mindful breathing or engagement practice?",
      type: "scale",
      help: "Scale · 1 = none, 10 = daily",
    },
    {
      id: "q8-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q8-5",
      prompt: "When and where will I practice engagement in a real challenge?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
