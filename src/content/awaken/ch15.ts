import type { Chapter } from "@/lib/types";

export const ch15: Omit<Chapter, "bankQuestions"> = {
  id: "ch-15-life-values",
  number: 15,
  title: "Life Values: Your Personal Compass",
  shortTitle: "Life Values",
  part: "Part two · Taking control",
  teaser:
    "Values decide what you move toward and away from — clarify them or stay lost in circumstance.",
  readMinutes: 12,
  summary: [
    {
      type: "bigIdea",
      text: "Values are your personal compass. When they are clear and prioritized, decisions simplify. When they conflict or stay unconscious, you feel torn no matter how hard you work.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Clarify toward & away", color: "#155E75" },
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
          title: "Values drive courage and will",
          body: "Stories like Perot's rescue mission show values — loyalty, courage, commitment — creating strength of will under risk.",
        },
        {
          title: "Toward and away-from values",
          body: "You move toward what you treasure (love, success, freedom) and away from what you reject (rejection, failure, humiliation).",
        },
        {
          title: "Hierarchy matters",
          body: "If freedom ranks above intimacy — or security above growth — your conflicts make sense. Order is destiny.",
        },
        {
          title: "Means vs. ends",
          body: "Money, career titles, and even relationships can be means values. Ends values are the emotional states you ultimately want.",
        },
        {
          title: "Align rules to values",
          body: "A value without supportive rules stays aspirational. Upcoming chapters turn compass into daily happiness.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Clarify toward & away",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "List toward values",
          body: "What emotions and outcomes must you move toward? Rank your top 5–10.",
          icon: "focus",
        },
        {
          title: "List away-from values",
          body: "What must you avoid? Notice if avoiding pain blocks the life you want.",
          icon: "meaning",
        },
        {
          title: "Resolve conflicts",
          body: "Where two values fight (security vs. adventure), decide a conscious hierarchy and supporting rules.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Most suffering labeled \"I don't know what I want\" is actually \"My values are unclear, conflicting, or out of order.\"",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write and rank your top toward values and top away-from values.",
        "Identify one values conflict that explains a chronic frustration.",
        "Rewrite that conflict with a clear priority and one behavior that honors it this week.",
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
          title: "Borrowing someone else's values",
          body: "Living parents', culture's, or industry values without choosing them creates quiet resentment.",
          icon: "warn",
        },
        {
          title: "Means disguised as ends",
          body: "Chasing money or status while starving love, growth, or contribution leaves you successful and empty.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q15-clarity",
  prompt: "How clear and ranked are my life values?",
  type: "scale",
  help: "Scale · 1 = foggy, 10 = ranked and lived",
},
    {
  id: "q15-toward",
  prompt: "What are my top five toward values right now?",
  type: "text",
},
    {
  id: "q15-conflict",
  prompt: "Where are two values in conflict — and which will I prioritize?",
  type: "text",
},
              {
            id: "q15-followed",
            prompt: "Did my biggest decision this week honor my stated values hierarchy?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
followsCommitment: true,
          },
              {
            id: "q15-commitment",
            prompt: "What values practice will I keep this month?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
