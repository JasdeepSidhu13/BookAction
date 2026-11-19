import type { Chapter } from "@/lib/types";

export const ch5: Omit<Chapter, "bankQuestions"> = {
  id: "ch-5-off-the-hook",
  number: 5,
  title: "Off the Hook",
  shortTitle: "Defusion",
  part: "Part two · The double-edged sword",
  teaser: "Learn to unhook from reason-giving so thoughts stop reeling you away from what matters.",
  readMinutes: 12,
  summary: [
    {
      type: "bigIdea",
      text: "Defusion is separating from thoughts so they can come and go without dictating action. You can lift your arm even while thinking “I can’t” — and you can take valued action the same way.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Four reason-giving tactics", color: "#B45309" },
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
          title: "What’s hooking you",
          body: "Self-judgments, comparisons, predictions, and obstacle stories are common hooks.",
        },
        {
          title: "The reason-giving machine",
          body: "Your mind is brilliant at explaining why you should wait, quit, or play small.",
        },
        {
          title: "Truth vs workability",
          body: "Even “true” thoughts can be unhelpful guides. Use the workability question.",
        },
        {
          title: "Defusion methods",
          body: "Try “I’m having the thought that…”, singing thoughts, silly voices, and computer-screen play.",
        },
        {
          title: "Hands as thoughts",
          body: "When thoughts cover your eyes, you lose the world; lowering them restores contact and choice.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Four reason-giving tactics",
      accent: "#B45309",
      tone: "amber",
      items: [
        {
          title: "Obstacles",
          body: "“Too hard,” “no time,” “not ready yet.”",
          icon: "warn",
        },
        {
          title: "Self-judgments",
          body: "“I’m not smart/attractive/experienced enough.”",
          icon: "warn",
        },
        {
          title: "Comparisons",
          body: "“Others do this better; I shouldn’t even try.”",
          icon: "warn",
        },
        {
          title: "Predictions",
          body: "“I’ll fail / be rejected / look stupid.”",
          icon: "warn",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Defusion isn’t about deleting negative thoughts. It’s about holding them lightly so you can do what matters.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Pick one hooking self-judgment and practice “I’m having the thought that…”.",
        "Run the reason-giving machine for 20 seconds on a valued action — then do a tiny step anyway.",
        "Use the workability question before abandoning something important.",
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
          title: "Using defusion to feel better only",
          body: "If the hidden goal is comfort, you’ll quit techniques that don’t instantly remove discomfort.",
          icon: "warn",
        },
        {
          title: "Skipping practice",
          body: "Defusion is a skill. It strengthens with reps in real situations.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q5-1",
      prompt: "How skillfully did I unhook from unhelpful thoughts this week?",
      type: "scale",
      help: "Scale · 1 = constantly hooked, 10 = often defused",
    },
    {
      id: "q5-2",
      prompt: "Which reason-giving tactic dominated: obstacles, self-judgments, comparisons, or predictions?",
      type: "text",
    },
    {
      id: "q5-3",
      prompt: "How often did I ask whether a thought was workable before obeying it?",
      type: "scale",
      help: "Scale · 1 = never, 10 = often",
    },
    {
      id: "q5-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q5-5",
      prompt: "What thought will I practice defusing from while taking my next valued step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
