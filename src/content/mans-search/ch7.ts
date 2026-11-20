import type { Chapter } from "@/lib/types";

export const ch7: Omit<Chapter, "bankQuestions"> = {
  id: "ch-7-tragic-optimism",
  number: 7,
  title: "The Case for a Tragic Optimism",
  shortTitle: "Tragic Optimism",
  part: "Postscript 1984",
  teaser:
    "Say yes to life in spite of pain, guilt, and death — by turning suffering into achievement.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Tragic optimism means remaining optimistic in spite of the tragic triad — pain, guilt, and death. Life can keep its potential meaning under any conditions if we turn negatives into something constructive.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "triad", label: "Tragic triad", color: "#155E75" },
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
          title: "Yes in spite of everything",
          body: "Optimism here is not denial. It is the decision that life remains potentially meaningful even when it is miserable.",
        },
        {
          title: "Turning pain into achievement",
          body: "When we cannot change a situation, we can still change how we meet it — and that stance can become an accomplishment.",
        },
        {
          title: "Guilt as a call to change",
          body: "Guilt need not freeze us; it can summon responsibility to become different from who we were.",
        },
        {
          title: "Death as a reminder",
          body: "Transitoriness does not make life meaningless — it makes responsible living urgent.",
        },
      ],
    },
    {
      type: "cards",
      id: "triad",
      title: "The tragic triad",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Pain",
          body: "Meet unavoidable suffering with a stance that creates meaning rather than only complaint.",
          icon: "focus",
        },
        {
          title: "Guilt",
          body: "Use remorse as fuel to change — not as a life sentence.",
          icon: "meaning",
        },
        {
          title: "Death",
          body: "Let finitude sharpen what still must be done, loved, or said.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "What matters is to make the best of any given situation — “saying yes to life in spite of everything.”",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Pick one item from the triad that is alive for you now. Write how you will say yes without pretending it is easy.",
        "Turn one regret into a concrete change this week.",
        "Act on one thing death’s reminder makes urgent — a conversation, a creation, a repair.",
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
          title: "Cheap optimism",
          body: "Pasting positivity over pain instead of finding a truthful yes.",
          icon: "warn",
        },
        {
          title: "Romanticizing suffering",
          body: "Seeking pain for meaning when change is still possible — Frankl insisted we remove suffering when we can.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q7-yes",
      prompt: "How able am I to say yes to life this week despite what is hard?",
      type: "scale",
      help: "Scale · 1 = refusing life, 10 = yes in spite of everything",
    },
    {
      id: "q7-triad",
      prompt: "Which of pain, guilt, or death is most present — and how will I meet it constructively?",
      type: "text",
    },
    {
      id: "q7-urgent",
      prompt: "How urgently am I living what finitude makes important?",
      type: "scale",
      help: "Scale · 1 = postponing everything, 10 = acting on what matters",
    },
    {
      id: "q7-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q7-commitment",
      prompt: "What “yes in spite of everything” will I practice this week?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
