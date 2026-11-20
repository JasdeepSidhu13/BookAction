import type { Chapter } from "@/lib/types";

export const ch20: Omit<Chapter, "bankQuestions"> = {
  id: "ch-20-physical-destiny",
  number: 20,
  title: "Physical Destiny: Prison of Pain or Palace of Pleasure — Day Two",
  shortTitle: "Physical Destiny",
  part: "Part three · Seven days to shape your destiny",
  teaser:
    "Day Two: condition your body into a palace of pleasure — energy, strength, and vitality you can feel.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Your body is either a prison of pain or a palace of pleasure. Day Two is deciding to train movement, breathing, and fuel so your physiology serves your emotions and dreams.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Train the vessel", color: "#155E75" },
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
          title: "Physiology drives state",
          body: "Emotion follows the body. Condition the body and emotional destiny gets easier.",
        },
        {
          title: "Motion creates emotion",
          body: "Exercise is not only health — it is a direct technology for changing how you feel now.",
        },
        {
          title: "Breath is a control dial",
          body: "Breathing patterns alter energy and anxiety within minutes when practiced deliberately.",
        },
        {
          title: "Food is information",
          body: "What you eat trains alertness, mood, and long-term destiny — not just weight.",
        },
        {
          title: "Make it identity-level",
          body: "\"I am an athlete in training for life\" beats \"I should work out.\"",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Train the vessel",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Daily movement minimum",
          body: "Set a non-negotiable movement practice — even 15 focused minutes beats intention without motion.",
          icon: "focus",
        },
        {
          title: "Breath breaks",
          body: "Schedule two breathing resets during the workday to reclaim state.",
          icon: "meaning",
        },
        {
          title: "Fuel rules",
          body: "Write three nutrition rules that increase vitality (not perfection theater).",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Physical destiny is emotional destiny's hardware. Neglect the hardware and software upgrades fail under load.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Define your physical minimum viable day (move, breathe, fuel).",
        "Complete today's movement session before negotiation with yourself.",
        "Replace one depleting food/drink pattern for the next seven days.",
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
          title: "All-or-nothing fitness",
          body: "Missing the perfect workout is not permission to do nothing.",
          icon: "warn",
        },
        {
          title: "Punishing the body",
          body: "Train for vitality and pleasure, not self-attack — pain prisons form either way.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q20-vitality",
  prompt: "How vital and capable did my body feel this week?",
  type: "scale",
  help: "Scale · 1 = prison of pain, 10 = palace of pleasure",
},
    {
  id: "q20-practice",
  prompt: "What is my daily movement, breath, and fuel standard?",
  type: "text",
},
    {
  id: "q20-blockers",
  prompt: "What usually knocks me off physical destiny — and my preempt?",
  type: "text",
},
              {
            id: "q20-followed",
            prompt: "Did I hit my physical minimum today/this week?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
followsCommitment: true,
          },
              {
            id: "q20-commitment",
            prompt: "What physical destiny habit will I lock for the next 30 days?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
