import type { Chapter } from "@/lib/types";

export const ch24: Omit<Chapter, "bankQuestions"> = {
  id: "ch-24-master-time",
  number: 24,
  title: "Master Your Time and Your Life — Day Six",
  shortTitle: "Master Your Time",
  part: "Part three · Seven days to shape your destiny",
  teaser:
    "Day Six: use time as an ally — focus, priority, and presence beat busyness.",
  readMinutes: 8,
  summary: [
    {
      type: "bigIdea",
      text: "Time mastery is life mastery. Learn to use time to your advantage rather than letting urgency, other people's agendas, or scattered focus steal your destiny.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Take time back", color: "#155E75" },
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
          title: "Time is a meaning we assign",
          body: "Pressure often comes from how we frame deadlines and identity — not only from the clock.",
        },
        {
          title: "Important over merely urgent",
          body: "Destiny work dies when every ping wins. Protect blocks for what matters.",
        },
        {
          title: "One thing at a time",
          body: "Concentration of power applies to hours as much as to life goals.",
        },
        {
          title: "Presence multiplies time",
          body: "Being fully where you are reduces rework, conflict, and the feeling of scarcity.",
        },
        {
          title: "Design the week on purpose",
          body: "If your calendar doesn't reflect your values and compelling future, rewrite the calendar.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Take time back",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Time audit",
          body: "Track two days in 30-minute blocks. Circle leaks that don't serve values.",
          icon: "focus",
        },
        {
          title: "Destiny blocks",
          body: "Schedule three non-negotiable blocks this week for top goals — treat them like flights.",
          icon: "meaning",
        },
        {
          title: "Presence rules",
          body: "Create device and interruption rules for deep work and for family time.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "You don't find time for your destiny — you assign it. Unassigned time gets colonized.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Identify your top three time leaks and cut or constrain them this week.",
        "Put destiny blocks on the calendar first, then fit the rest around them.",
        "Practice one fully present conversation daily with devices away.",
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
          title: "Busy as identity",
          body: "Exhaustion can become a status symbol that blocks real progress.",
          icon: "warn",
        },
        {
          title: "Saying yes by default",
          body: "Every unexamined yes is a no to your compelling future.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q24-mastery",
  prompt: "How well did I use time as an ally this week?",
  type: "scale",
  help: "Scale · 1 = reactive busyness, 10 = deliberate destiny time",
},
    {
  id: "q24-leaks",
  prompt: "What were my biggest time leaks — and what boundaries am I setting?",
  type: "text",
},
    {
  id: "q24-blocks",
  prompt: "What destiny blocks am I protecting on the calendar?",
  type: "text",
},
              {
            id: "q24-followed",
            prompt: "Did I honor my destiny blocks?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
followsCommitment: true,
          },
              {
            id: "q24-commitment",
            prompt: "What time-mastery rule will I keep next week?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
