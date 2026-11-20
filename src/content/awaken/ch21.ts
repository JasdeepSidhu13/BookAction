import type { Chapter } from "@/lib/types";

export const ch21: Omit<Chapter, "bankQuestions"> = {
  id: "ch-21-relationship-destiny",
  number: 21,
  title: "Relationship Destiny: The Place to Share and Care — Day Three",
  shortTitle: "Relationship Destiny",
  part: "Part three · Seven days to shape your destiny",
  teaser:
    "Day Three: measurably enhance the quality of your personal relationships through association, surprise, and care.",
  readMinutes: 9,
  summary: [
    {
      type: "bigIdea",
      text: "Relationships thrive when you continuously reassociate to what you love about people — and create new moments so habituation never turns intimacy into background noise.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Deepen connection", color: "#155E75" },
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
          title: "Quality is measurable",
          body: "Day Three's outcome is not vague kindness — it is a measurable enhancement of personal relationship quality.",
        },
        {
          title: "Reassociate to love",
          body: "Daily, reconnect to what you love about the person. Ask, \"How did I get so lucky to have you in my life?\"",
        },
        {
          title: "Fight habituation",
          body: "Without surprise and renewal, even good relationships drift into taking each other for granted.",
        },
        {
          title: "Reinforce and anchor pleasure",
          body: "Feel connection intensely and anchor it — don't leave positive emotion unreinforced.",
        },
        {
          title: "Full hearts have room",
          body: "Caring expands capacity. Empty hearts have room for nothing — fill yours by giving.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Deepen connection",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Daily appreciation ritual",
          body: "Tell one person specifically what you appreciate — tone and detail matter.",
          icon: "focus",
        },
        {
          title: "Create a surprise",
          body: "Plan one unexpected caring action this week that breaks routine.",
          icon: "meaning",
        },
        {
          title: "Repair quickly",
          body: "Where there's distance, initiate a Reality Bridge conversation within 24 hours.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Legendary relationships are built on continuous emotional reinforcement — not on a single romantic origin story.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "List three people who matter most and one specific appreciation for each.",
        "Deliver those appreciations today in person or by voice if possible.",
        "Schedule one surprise that renews a key relationship this week.",
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
          title: "Scorekeeping",
          body: "Care that waits to be earned becomes control. Lead with contribution.",
          icon: "warn",
        },
        {
          title: "Assuming they know",
          body: "Unexpressed appreciation does not land. Say it.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q21-quality",
  prompt: "How intentional was I in my key relationships this week?",
  type: "scale",
  help: "Scale · 1 = on autopilot, 10 = deliberate care",
},
    {
  id: "q21-appreciations",
  prompt: "Whom did I appreciate — and what specifically did I reinforce?",
  type: "text",
},
    {
  id: "q21-surprise",
  prompt: "What surprise or renewal did I create (or will I create)?",
  type: "text",
},
              {
            id: "q21-followed",
            prompt: "Did I reassociate to love daily with at least one person?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
followsCommitment: true,
          },
              {
            id: "q21-commitment",
            prompt: "What relationship destiny practice will I keep?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
