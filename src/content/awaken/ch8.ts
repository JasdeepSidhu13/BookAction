import type { Chapter } from "@/lib/types";

export const ch8: Omit<Chapter, "bankQuestions"> = {
  id: "ch-8-questions-are-the-answer",
  number: 8,
  title: "Questions Are the Answer",
  shortTitle: "Questions Are the Answer",
  part: "Part one · Unleash your power",
  teaser:
    "Quality questions create a quality life — change the question and you change focus, meaning, and available resources.",
  readMinutes: 11,
  summary: [
    {
      type: "bigIdea",
      text: "Our questions determine our thoughts. \"Why do I always sabotage myself?\" hunts for a flaw. \"What can I learn, and what will I do differently?\" hunts for a lesson and a next step.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "power", label: "Power question sets", color: "#155E75" },
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
          title: "Thinking is asking and answering",
          body: "Habitual questions shape what you notice, what meaning you assign, and what you do next.",
        },
        {
          title: "Questions change focus, deletion, and resources",
          body: "They steer attention, hide what you don't ask about, and can bring forgotten skills and options to mind.",
        },
        {
          title: "Watch the presupposition",
          body: "\"Why do I always sabotage myself?\" assumes a fixed pattern. \"What happened this time?\" opens choices.",
        },
        {
          title: "Ask questions that invite honest answers",
          body: "If \"What's great about this?\" feels forced, try \"What can I learn?\" or \"How can I use this?\"",
        },
        {
          title: "Stop evaluating and start doing",
          body: "Once you know what matters and have a workable next step — act.",
        },
      ],
    },
    {
      type: "cards",
      id: "power",
      title: "Three question sets to install",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Problem-solving",
          body: "What's great about this? What's not perfect yet? What will I do — and stop doing — to make it right? How can I enjoy the process?",
          icon: "focus",
        },
        {
          title: "Morning power",
          body: "What am I happy, excited, proud, grateful, and committed about — and who do I love / who loves me?",
          icon: "meaning",
        },
        {
          title: "Evening power",
          body: "What did I give? What did I learn? How did today invest in my future?",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Quality questions create a quality life. A persistent, specific question can reveal an opening you would otherwise delete from awareness.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Identify one autopilot question you ask in a recurring situation — and write a better replacement.",
        "Run the five problem-solving questions on one real problem today.",
        "Practice morning and evening power questions for 10 days; add two custom questions that unlock the feelings you need.",
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
          title: "Questions that assume you're broken",
          body: "\"Why am I like this?\" locks you into identity. Ask about events and options instead.",
          icon: "warn",
        },
        {
          title: "Endless evaluation",
          body: "Questions are for clarity and action — not as a substitute for follow-through.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q8-question-quality",
      prompt: "How empowering were the questions I asked myself this week?",
      type: "scale",
      help: "Scale · 1 = mostly self-attacking, 10 = consistently resourceful",
    },
    {
      id: "q8-autopilot",
      prompt: "What autopilot question am I ready to replace — and with what?",
      type: "text",
    },
    {
      id: "q8-ritual",
      prompt: "How consistently did I use morning/evening or problem-solving questions?",
      type: "scale",
      help: "Scale · 1 = not at all, 10 = daily practice",
    },
    {
      id: "q8-followed-through",
      prompt: "Did I follow a quality question with a concrete action?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q8-commitment",
      prompt: "Which question set will I practice now, and when will I do it?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
