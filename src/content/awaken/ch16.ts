import type { Chapter } from "@/lib/types";

export const ch16: Omit<Chapter, "bankQuestions"> = {
  id: "ch-16-rules",
  number: 16,
  title: "Rules: If You're Not Happy, Here's Why!",
  shortTitle: "Personal Rules",
  part: "Part two · Taking control",
  teaser:
    "Your rules decide whether a day counts as a win. If you're not happy, inspect the rulebook.",
  readMinutes: 12,
  summary: [
    {
      type: "bigIdea",
      text: "Rules are the criteria for whether your values are being met. Impossible or contradictory rules guarantee unhappiness — even when life is objectively good.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Rewrite the rulebook", color: "#155E75" },
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
          title: "Expectations create emotion",
          body: "People flew across the world for a four-minute eclipse — and anxiety rose when clouds threatened the expectation. Rules set what must happen for you to feel okay.",
        },
        {
          title: "Rules link to values",
          body: "If love is a value, your rules define what must occur for you to feel loved — and those rules can be kind or cruel.",
        },
        {
          title: "Must / must never / must be",
          body: "Notice absolute language. Rigid \"musts\" create brittle lives; designed rules create freedom.",
        },
        {
          title: "Make happiness achievable",
          body: "Empowering rules put the fulfillment of your values largely under your control — not at the mercy of weather, traffic, or other people.",
        },
        {
          title: "Negotiate rules in relationships",
          body: "Unspoken conflicting rules destroy intimacy. Make them explicit and renegotiate.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Rewrite the rulebook",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Audit happiness rules",
          body: "For your top values, write: \"I will feel this when…\" If the list requires miracles, rewrite it.",
          icon: "focus",
        },
        {
          title: "Add controllable criteria",
          body: "Include actions you can take (express appreciation, train, keep a promise) so wins are creatable daily.",
          icon: "meaning",
        },
        {
          title: "Share rules with partners",
          body: "Ask: What has to happen for you to feel respected/loved/supported? Align where you can.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "If you're not happy, the problem is often not your life — it is a rule that makes success nearly impossible to register.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Pick your top three values and write the current rules for each.",
        "Rewrite any rule that depends mostly on other people or perfect conditions.",
        "Create one \"easy win\" rule that lets you feel a key value today.",
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
          title: "Moving-target rules",
          body: "Raising the bar after every win means you never arrive.",
          icon: "warn",
        },
        {
          title: "Secret rules",
          body: "Holding others accountable to rules they never agreed to breeds conflict.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q16-rule-quality",
  prompt: "How achievable are my rules for feeling my top values?",
  type: "scale",
  help: "Scale · 1 = nearly impossible, 10 = clear and under my influence",
},
    {
  id: "q16-broken-rules",
  prompt: "Which rules most often make me unhappy — and how will I rewrite them?",
  type: "text",
},
    {
  id: "q16-relationship-rules",
  prompt: "What unspoken rules are straining an important relationship?",
  type: "text",
},
              {
            id: "q16-followed",
            prompt: "Did I live by my rewritten rules this week?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
followsCommitment: true,
          },
              {
            id: "q16-commitment",
            prompt: "Which rule will I renegotiate next?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
