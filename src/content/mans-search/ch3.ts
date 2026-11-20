import type { Chapter } from "@/lib/types";

export const ch3: Omit<Chapter, "bankQuestions"> = {
  id: "ch-3-last-of-human-freedoms",
  number: 3,
  title: "The Last of the Human Freedoms",
  shortTitle: "Last Freedom",
  part: "Part one · Experiences in a concentration camp",
  teaser:
    "Everything can be taken from a person but one thing: the freedom to choose one’s attitude.",
  readMinutes: 12,
  summary: [
    {
      type: "bigIdea",
      text: "Everything can be taken from a man but one thing: the last of the human freedoms — to choose one’s attitude in any given set of circumstances, to choose one’s own way.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "choices", label: "Daily choices", color: "#155E75" },
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
          title: "Attitude is still a decision",
          body: "Every day and hour offered a decision: submit to powers that rob the inner self, or keep freedom and dignity.",
        },
        {
          title: "More than conditions",
          body: "Mental reactions in camp were not merely physical or sociological results — people still chose how to meet the same conditions.",
        },
        {
          title: "Love as a saving force",
          body: "Thoughts of a beloved person could lift a prisoner beyond barbed wire — love found its deepest meaning in inwardness.",
        },
        {
          title: "Meaning in suffering",
          body: "When a situation cannot be changed, we are challenged to change ourselves — to turn a personal tragedy into a triumph.",
        },
      ],
    },
    {
      type: "cards",
      id: "choices",
      title: "What still belongs to you",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Your stance",
          body: "You may not pick the circumstance, but you pick whether you become its plaything.",
          icon: "focus",
        },
        {
          title: "Your inner life",
          body: "Memory, prayer, humor, and love can remain when the outer world is hostile.",
          icon: "meaning",
        },
        {
          title: "Your next act",
          body: "Even tiny acts of decency or courage are votes for the person you still choose to be.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Between stimulus and response there is a space — and in that space lies our power to choose, and in our choice lies our growth and freedom.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "When something unfair hits this week, pause and name the attitude you will choose before you react.",
        "Write one sentence of love or gratitude you can return to when conditions are ugly.",
        "Do one small courageous act that circumstances do not require of you.",
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
          title: "Fatalism",
          body: "Treating yourself as molded clay of circumstance — then calling that realism.",
          icon: "warn",
        },
        {
          title: "Attitude as denial",
          body: "Using “choose your attitude” to ignore injustice you still have power to change.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q3-attitude",
      prompt: "How deliberately did I choose my attitude under pressure this week?",
      type: "scale",
      help: "Scale · 1 = pure reaction, 10 = deliberate stance",
    },
    {
      id: "q3-space",
      prompt: "Where did I forget there was a space between stimulus and response?",
      type: "text",
    },
    {
      id: "q3-inner",
      prompt: "How well did I protect my inner freedom (love, humor, dignity) this week?",
      type: "scale",
      help: "Scale · 1 = collapsed inward, 10 = held steady",
    },
    {
      id: "q3-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q3-commitment",
      prompt: "What attitude will I practice on purpose this week — and in which situation?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
