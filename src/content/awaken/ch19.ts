import type { Chapter } from "@/lib/types";

export const ch19: Omit<Chapter, "bankQuestions"> = {
  id: "ch-19-emotional-destiny",
  number: 19,
  title: "Emotional Destiny: The Only True Success — Day One",
  shortTitle: "Emotional Destiny",
  part: "Part three · Seven days to shape your destiny",
  teaser:
    "Day One of shaping destiny: take control of your consistent emotions — the only true success.",
  readMinutes: 8,
  summary: [
    {
      type: "bigIdea",
      text: "If you do not control your consistent emotions, nothing else you achieve will feel like success. Day One is committing to emotional mastery as a daily practice.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Day One practices", color: "#155E75" },
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
          title: "Emotion is the scoreboard",
          body: "Money, fitness, and status without emotional skill still feel empty. Emotion is the experience of life.",
        },
        {
          title: "Decide your emotional diet",
          body: "What emotions will you experience daily on purpose? Write them as commitments, not wishes.",
        },
        {
          title: "Use the tools you already have",
          body: "Physiology, focus, questions, vocabulary, metaphors, and NAC are the levers — Day One is using them consistently.",
        },
        {
          title: "Measure the day by state",
          body: "Ask: Did I live my chosen emotions today? That question builds a new standard.",
        },
        {
          title: "Start the seven-day arc",
          body: "Emotional destiny is the foundation for physical, relationship, financial, conduct, time, and renewal days ahead.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Day One practices",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Choose daily emotions",
          body: "Pick 7–10 emotional states you commit to visiting every day.",
          icon: "focus",
        },
        {
          title: "Morning priming",
          body: "Start the day with gratitude, power questions, and movement before inputs hijack your state.",
          icon: "meaning",
        },
        {
          title: "Evening scorecard",
          body: "Check which committed emotions you lived — and which need a better trigger tomorrow.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Emotional destiny is not mood luck. It is a decision about which states you will practice until they become your baseline.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write the emotions you commit to experiencing daily.",
        "Design a 10-minute morning emotional priming ritual.",
        "End tonight by scoring which committed emotions you lived.",
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
          title: "Waiting to feel like it",
          body: "Emotional mastery means generating the state — then acting.",
          icon: "warn",
        },
        {
          title: "All-or-nothing days",
          body: "Missing one emotion is data, not failure. Adjust triggers; keep the commitment.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q19-mastery",
  prompt: "How much ownership did I take over my emotional states today?",
  type: "scale",
  help: "Scale · 1 = fully reactive, 10 = deliberately generated",
},
    {
  id: "q19-committed",
  prompt: "Which emotions am I committed to living daily?",
  type: "text",
},
    {
  id: "q19-gaps",
  prompt: "Which committed emotion was hardest — and what will trigger it tomorrow?",
  type: "text",
},
              {
            id: "q19-followed",
            prompt: "Did I run morning priming and an evening emotional scorecard?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
followsCommitment: true,
          },
              {
            id: "q19-commitment",
            prompt: "What is my Day One emotional practice going forward?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
