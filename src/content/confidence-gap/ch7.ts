import type { Chapter } from "@/lib/types";

export const ch7: Omit<Chapter, "bankQuestions"> = {
  id: "ch-7-the-self-esteem-trap",
  number: 7,
  title: "The Self-Esteem Trap",
  shortTitle: "Self-Esteem Trap",
  part: "Part two · The double-edged sword",
  teaser: "Chasing high self-esteem can become another comparison game. Self-acceptance is the freer path.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Self-esteem often depends on feeling better than others or winning against your own harsh scoreboard. Self-acceptance lets you drop the endless judgment contest and still grow.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "From judgment to acceptance", color: "#166534" },
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
          title: "The self-esteem myth",
          body: "Higher self-esteem doesn’t reliably deliver the lasting happiness and success it’s sold as.",
        },
        {
          title: "Comparison fuel",
          body: "Boosts fade as soon as the mind finds someone “ahead” of you.",
        },
        {
          title: "Self-acceptance",
          body: "Accepting yourself as a fallible human frees energy for values-based change.",
        },
        {
          title: "Assess actions, not worth",
          body: "Evaluate what worked without turning it into a global verdict on who you are.",
        },
        {
          title: "Finger pointing",
          body: "Harsh self-judgment rarely creates sustainable healthy change.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "From judgment to acceptance",
      accent: "#166534",
      tone: "green",
      items: [
        {
          title: "Drop the scoreboard",
          body: "You are not your latest win, loss, or rating.",
          icon: "focus",
        },
        {
          title: "Keep honest assessment",
          body: "Look at actions and results without character assassination.",
          icon: "meaning",
        },
        {
          title: "Encourage next steps",
          body: "Compassionate encouragement sustains practice better than beatings.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "If harsh self-judgment were an effective long-term change strategy, you’d be perfect by now.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Notice one self-judgment and ask whether it’s helpful for the life you want.",
        "Replace “What’s wrong with me?” with “What did I do, and what could I try next?”",
        "Practice a ten-second check-in: pause and notice what your mind is saying without arguing.",
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
          title: "Self-esteem as a prerequisite",
          body: "Waiting to “feel worthy enough” before acting recreates the confidence gap.",
          icon: "warn",
        },
        {
          title: "Fake positivity",
          body: "Forcing “I am amazing” can deepen the inner war when it doesn’t fit.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q7-1",
      prompt: "How often did I chase self-esteem through comparison this week?",
      type: "scale",
      help: "Scale · 1 = never, 10 = constantly",
    },
    {
      id: "q7-2",
      prompt: "Where did harsh self-judgment show up, and what did it cost me?",
      type: "text",
    },
    {
      id: "q7-3",
      prompt: "How much self-acceptance did I practice after mistakes?",
      type: "scale",
      help: "Scale · 1 = none, 10 = a lot",
    },
    {
      id: "q7-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q7-5",
      prompt: "What values-based action will I take without needing a self-esteem boost first?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
