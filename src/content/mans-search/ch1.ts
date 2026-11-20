import type { Chapter } from "@/lib/types";

export const ch1: Omit<Chapter, "bankQuestions"> = {
  id: "ch-1-dont-aim-at-success",
  number: 1,
  title: "Don’t Aim at Success",
  shortTitle: "Don’t Aim at Success",
  part: "Preface · 1992",
  teaser:
    "Success and happiness ensue from dedication to a cause — or a person — greater than yourself.",
  readMinutes: 8,
  summary: [
    {
      type: "bigIdea",
      text: "Don’t aim at success — the more you make it a target, the more you miss it. Success, like happiness, must ensue as the unintended side-effect of dedication to a cause greater than yourself, or of surrender to a person other than yourself.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "sources", label: "Three sources of meaning", color: "#155E75" },
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
          title: "Happiness must happen",
          body: "You cannot pursue happiness directly. It arrives when you stop chasing it and give yourself to something that matters.",
        },
        {
          title: "Listen to conscience, then act",
          body: "Frankl’s charge: hear what your conscience commands and carry it out to the best of your knowledge. Success follows because you forgot to hunt it.",
        },
        {
          title: "A Why makes any How bearable",
          body: "Nietzsche’s line frames the book: He who has a Why to live for can bear almost any How.",
        },
        {
          title: "Meaning over pleasure or power",
          body: "Life is not primarily a quest for pleasure (Freud) or power (Adler), but a quest for meaning.",
        },
      ],
    },
    {
      type: "cards",
      id: "sources",
      title: "Three sources of meaning",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Work",
          body: "Doing something significant — a deed, a creation, a contribution.",
          icon: "action",
        },
        {
          title: "Love",
          body: "Caring for another person; encountering someone as unique and irreplaceable.",
          icon: "meaning",
        },
        {
          title: "Courage in difficulty",
          body: "The attitude you choose when you face a fate you cannot change.",
          icon: "focus",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Suffering in and of itself is meaningless; we give our suffering meaning by the way we respond to it.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Name one cause or person you would dedicate this week to — without bargaining for a payoff.",
        "Write the Why that could help you bear a hard How you are already in.",
        "Drop one success target for seven days and measure only faithfulness to the work.",
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
          title: "Happiness as a goal",
          body: "Treating good feelings as the destination turns them into a moving target you never reach.",
          icon: "warn",
        },
        {
          title: "Success theater",
          body: "Optimizing for reputation while ignoring what conscience actually asks of you.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q1-dedication",
      prompt: "How clearly am I dedicating this week to a cause or person greater than myself?",
      type: "scale",
      help: "Scale · 1 = chasing outcomes only, 10 = fully dedicated",
    },
    {
      id: "q1-why",
      prompt: "What is my Why right now — the meaning that could help me bear a hard How?",
      type: "text",
    },
    {
      id: "q1-conscience",
      prompt: "How faithfully did I act on what conscience asked of me this week?",
      type: "scale",
      help: "Scale · 1 = ignored it, 10 = followed through",
    },
    {
      id: "q1-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q1-commitment",
      prompt: "What am I committing to this week in service of meaning — and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
