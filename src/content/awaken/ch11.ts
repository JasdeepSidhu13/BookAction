import type { Chapter } from "@/lib/types";

export const ch11: Omit<Chapter, "bankQuestions"> = {
  id: "ch-11-ten-emotions-of-power",
  number: 11,
  title: "The Ten Emotions of Power",
  shortTitle: "Emotions of Power",
  part: "Part one · Unleash your power",
  teaser:
    "Stop living in quiet desperation. Learn to transform Action Signals — and cultivate ten emotions that make you feel alive.",
  readMinutes: 12,
  summary: [
    {
      type: "bigIdea",
      text: "Emotions are not the enemy. \"Negative\" feelings are Action Signals calling for a change in perception or action. Master the signals, cultivate emotions of power, and you stop settling for a numb life.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Signal → power emotions", color: "#155E75" },
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
          title: "Quiet desperation is common",
          body: "Many people avoid pain so thoroughly they also avoid passion — a rut that looks like safety and feels like death.",
        },
        {
          title: "Action Signals, not \"bad\" emotions",
          body: "Fear, hurt, anger, frustration, disappointment, guilt, inadequacy, overwhelm, and loneliness are messages — not permanent identities.",
        },
        {
          title: "Ask better questions of the signal",
          body: "What do I need to change? What am I willing to do? What would make this useful? Signals become fuel when you respond.",
        },
        {
          title: "Ten emotions of power",
          body: "Love and warmth, appreciation and gratitude, curiosity, excitement and passion, determination, flexibility, confidence, cheerfulness, vitality, and contribution.",
        },
        {
          title: "You can cultivate emotion on purpose",
          body: "Physiology, focus, and language can move you into power emotions even when circumstances haven't changed yet.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Signal → power emotions",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Name the Action Signal",
          body: "When intensity rises, label the signal precisely (fear vs. hurt vs. overwhelm) instead of collapsing into \"I feel terrible.\"",
          icon: "focus",
        },
        {
          title: "Respond, don't suppress",
          body: "Ask what the signal wants changed — perception, communication, standards, or action — then take one step.",
          icon: "meaning",
        },
        {
          title: "Schedule power emotions",
          body: "Pick three emotions of power to practice daily with physiology and focus (gratitude walk, curiosity questions, contribution).",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The goal is not a life without \"negative\" emotion — it is a life where you use those emotions as guidance and spend more of your days in emotions that create momentum.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "List the Action Signals you feel most often and what change each is asking for.",
        "Choose three Emotions of Power to practice every day for a week.",
        "When a signal hits, change physiology first (breath, posture, movement), then ask a better question.",
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
          title: "Numbing as a lifestyle",
          body: "Avoiding intensity can leave you neither devastated nor alive — Walt's quiet rut.",
          icon: "warn",
        },
        {
          title: "Treating signals as identity",
          body: "\"I am an angry person\" freezes a message into a self-concept. You are having a signal — respond to it.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q11-signal-awareness",
  prompt: "How skillfully did I use Action Signals this week?",
  type: "scale",
  help: "Scale · 1 = ignored or drowned in them, 10 = used them as guidance",
},
    {
  id: "q11-signals",
  prompt: "Which Action Signals showed up most — and what change were they asking for?",
  type: "text",
},
    {
  id: "q11-power-emotions",
  prompt: "Which three Emotions of Power am I practicing daily?",
  type: "text",
},
              {
            id: "q11-followed",
            prompt: "Did I deliberately move into a power emotion when I needed it?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
followsCommitment: true,
          },
              {
            id: "q11-commitment",
            prompt: "What emotional practice will I keep for the next week?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
