import type { Chapter } from "@/lib/types";

export const ch12: Omit<Chapter, "bankQuestions"> = {
  id: "ch-12-the-success-trap",
  number: 12,
  title: "The Success Trap",
  shortTitle: "Success Trap",
  part: "Part three · What gets you going?",
  teaser: "If success only means outcomes, you’ll feel like a failure on the climb. Values make the journey count.",
  readMinutes: 8,
  summary: [
    {
      type: "bigIdea",
      text: "Outcome-only success is a trap. Living your values is success in each step — even before the summit appears.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Two mountain climbers", color: "#B45309" },
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
          title: "What “success” conjures",
          body: "Status, money, and winning often dominate the cultural definition.",
        },
        {
          title: "Journey and destination",
          body: "Two climbers can reach different heights; the one living their values is succeeding now.",
        },
        {
          title: "Tiny consistent acts",
          body: "Ask: what tiny thing can I do right now that’s consistent with my values?",
        },
        {
          title: "Right rule",
          body: "Success includes living by your values on the way to goals — not only arriving.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Two mountain climbers",
      accent: "#B45309",
      tone: "amber",
      items: [
        {
          title: "Outcome-only climber",
          body: "Miserable unless the summit is reached — and restless even then.",
          icon: "warn",
        },
        {
          title: "Values-guided climber",
          body: "Succeeds with each values-consistent step, whatever the altitude.",
          icon: "action",
        },
        {
          title: "Instant success",
          body: "One tiny values-consistent act right now counts.",
          icon: "focus",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Thanks, mind — then do one tiny values-consistent thing. That’s success you can create on demand.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write your old definition of success and a values-based rewrite.",
        "Identify where outcome-only thinking drained joy from a pursuit.",
        "Do one tiny values-consistent action within the next hour.",
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
          title: "Moving the goalposts",
          body: "The mind can dismiss every win as “not enough.”",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q12-1",
      prompt: "How much did I define success only by outcomes this week?",
      type: "scale",
      help: "Scale · 1 = not at all, 10 = completely",
    },
    {
      id: "q12-2",
      prompt: "Where did I succeed by living a value even without a big result?",
      type: "text",
    },
    {
      id: "q12-3",
      prompt: "How often did I take tiny values-consistent actions?",
      type: "scale",
      help: "Scale · 1 = never, 10 = often",
    },
    {
      id: "q12-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q12-5",
      prompt: "What tiny values-consistent action am I committing to today?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
