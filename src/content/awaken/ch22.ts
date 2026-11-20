import type { Chapter } from "@/lib/types";

export const ch22: Omit<Chapter, "bankQuestions"> = {
  id: "ch-22-financial-destiny",
  number: 22,
  title: "Financial Destiny: Small Steps to a Small (or Large) Fortune — Day Four",
  shortTitle: "Financial Destiny",
  part: "Part three · Seven days to shape your destiny",
  teaser:
    "Day Four: master the foundations of wealth — value creation, spending less than you earn, investing, protection, and tithing.",
  readMinutes: 12,
  summary: [
    {
      type: "bigIdea",
      text: "Creating wealth is simple, but holes in the foundation — conflicting values, scarcity beliefs, no plan — guarantee stress. Build the fundamentals and take control of your financial future.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Five wealth foundations", color: "#155E75" },
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
          title: "Earn by adding value",
          body: "Income follows the measurable value you create for others. Expand skills, distribution, and impact.",
        },
        {
          title: "Kill scarcity storytelling",
          body: "Zero-sum beliefs create fear and poor decisions. Abundance comes from creating and delivering value at scale.",
        },
        {
          title: "Spend less than you earn",
          body: "Decide categories in advance. Living beyond your means is a system for disaster.",
        },
        {
          title: "Invest with a plan",
          body: "Without a clear investment plan and education, most investors fail over time — goals and process matter.",
        },
        {
          title: "Protect and give",
          body: "Legal protection of assets and consistent tithing/giving teach your brain you have more than enough.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Five wealth foundations",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Value upgrade",
          body: "Ask: How could I touch more lives, more deeply, with better quality — without only working more hours?",
          icon: "focus",
        },
        {
          title: "Cashflow rules",
          body: "Set spending categories and a save/invest percentage you will not violate.",
          icon: "meaning",
        },
        {
          title: "Learning + giving",
          body: "Schedule financial education time and a consistent giving practice that creates joy.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "True wealth is also an emotion — a sense of absolute abundance — supported by practical foundations, not by hope alone.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write one way to add 10× more value in your work over the next year.",
        "Create a simple monthly spending and investing plan with your partner if you have one.",
        "Automate a giving percentage that feels meaningful and sustainable.",
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
          title: "Waiting to tithe \"when I have more\"",
          body: "Giving is easier to learn at smaller amounts — delay trains scarcity.",
          icon: "warn",
        },
        {
          title: "No plan investing",
          body: "Tips without a written plan recreate the statistic of long-term investor failure.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q22-foundation",
  prompt: "How solid are my financial foundations right now?",
  type: "scale",
  help: "Scale · 1 = holes everywhere, 10 = clear plan and practices",
},
    {
  id: "q22-value",
  prompt: "How will I add more value — and increase earning power — this quarter?",
  type: "text",
},
    {
  id: "q22-plan",
  prompt: "What are my spending, saving/investing, and giving rules?",
  type: "text",
},
              {
            id: "q22-followed",
            prompt: "Did I follow my financial plan this week?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
followsCommitment: true,
          },
              {
            id: "q22-commitment",
            prompt: "What financial destiny action will I take in the next 7 days?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
