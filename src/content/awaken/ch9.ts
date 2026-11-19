import type { Chapter } from "@/lib/types";

export const ch9: Omit<Chapter, "bankQuestions"> = {
  id: "ch-9-vocabulary-of-success",
  number: 9,
  title: "The Vocabulary of Ultimate Success",
  shortTitle: "Transformational Vocabulary",
  part: "Part one · Unleash your power",
  teaser:
    "The words you habitually use shape how you feel and respond — transform your vocabulary to intensify joy and reduce unnecessary pain.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "The words you consistently select will shape your destiny. Transformational Vocabulary means changing the labels you use for emotional experience so you gain more choice about what happens next.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "How to transform words", color: "#155E75" },
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
          title: "Words shape emotions and actions",
          body: "Calling every setback \"devastating\" gives different experiences the same intense meaning.",
        },
        {
          title: "Same event, different labels",
          body: "One person is \"enraged,\" another \"a bit annoyed\" — their physiology and next actions diverge with the word.",
        },
        {
          title: "Humor interrupts escalation",
          body: "A playful word like \"peeved\" can break anger long enough to communicate and choose.",
        },
        {
          title: "Intensify the positive too",
          body: "\"Okay\" and \"pretty good\" flatten enjoyment. Try \"spectacular,\" \"fascinated,\" \"grateful.\"",
        },
        {
          title: "Soften with others; describe behavior",
          body: "\"I'm a little concerned — can you help?\" builds a Reality Bridge. With children, label the behavior, not the identity.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Transformational Vocabulary practice",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Spot habitual pain words",
          body: "List negative feelings you have often and the exact words you use for them.",
          icon: "focus",
        },
        {
          title: "Create replacements",
          body: "Pick three words to change. Invent alternatives that feel accurate, useful, or amusing.",
          icon: "meaning",
        },
        {
          title: "Recruit accountability",
          body: "Ask three friends to prompt you respectfully for 10 days: \"Frustrated — or fascinated?\"",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "A useful replacement isn't just a synonym — it interrupts the pattern, changes your perspective, or enables a better question or action.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write three habitual distress words and three replacements (e.g., angry → a bit annoyed; overwhelmed → in demand).",
        "Upgrade three ordinary positive phrases (fine → energized; okay → fantastic).",
        "Practice for 10 days with social prompts, and use softeners in one difficult conversation this week.",
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
          title: "Cosmetic word swaps",
          body: "Saying something different while feeling the same means the replacement didn't interrupt the pattern.",
          icon: "warn",
        },
        {
          title: "Identity labels",
          body: "Insulting labels — especially to children — can become statements they absorb about who they are.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q9-vocab-awareness",
      prompt: "How aware am I of the words I use to label my emotions?",
      type: "scale",
      help: "Scale · 1 = totally automatic, 10 = catching labels in real time",
    },
    {
      id: "q9-words-to-change",
      prompt: "Which three words am I transforming — and what are my replacements?",
      type: "text",
    },
    {
      id: "q9-positive-intensity",
      prompt: "How richly did I describe positive experiences this week?",
      type: "scale",
      help: "Scale · 1 = everything was \"fine\", 10 = vivid, energizing language",
    },
    {
      id: "q9-followed-through",
      prompt: "Did I catch and replace an old word when it showed up?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q9-commitment",
      prompt: "What vocabulary practice will I run for the next 10 days?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
