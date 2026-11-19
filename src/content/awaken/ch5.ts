import type { Chapter } from "@/lib/types";

export const ch5: Omit<Chapter, "bankQuestions"> = {
  id: "ch-5-change-in-an-instant",
  number: 5,
  title: "Can Change Happen in an Instant?",
  shortTitle: "Change in an Instant",
  part: "Part one · Unleash your power",
  teaser:
    "Change can begin immediately — lasting change requires reinforcing new neuro-associations until they stick.",
  readMinutes: 9,
  summary: [
    {
      type: "bigIdea",
      text: "Change can happen in an instant. Making it last takes reinforcement — condition your nervous system to succeed not just once, but consistently.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "beliefs", label: "Three change beliefs", color: "#155E75" },
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
          title: "Two kinds of change",
          body: "How you feel about something (even after it's over), and how you behave when a familiar trigger appears.",
        },
        {
          title: "Getting ready often takes longer than changing",
          body: "The initial shift can be quick. Sustaining it is like retuning a piano until the new tension holds.",
        },
        {
          title: "Neuro-associations drive automatic responses",
          body: "Repetition builds neural \"super-highways.\" Interrupt the old response to practice a new one.",
        },
        {
          title: "Your brain can blame the wrong cause",
          body: "It looks for what's unique, simultaneous, and consistent — and can still pick the wrong explanation.",
        },
      ],
    },
    {
      type: "cards",
      id: "beliefs",
      title: "Three beliefs that create ownership of change",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Something must change",
          body: "Give the change enough priority to act — not someday, now.",
          icon: "focus",
        },
        {
          title: "I must change it",
          body: "Own follow-through. Support helps; responsibility stays yours.",
          icon: "meaning",
        },
        {
          title: "I can change it",
          body: "Believe a different response is possible — then reinforce it.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Without changing what you link pain and pleasure to in your nervous system, no change will last. Mixed associations produce mixed results.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Pick one thing you want to change right now.",
        "List the positive and negative associations you have with it — notice intensity, not just count.",
        "Choose the change you'll run through the six NAC steps in the next chapter.",
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
          title: "Mixed associations",
          body: "Wanting wealth for freedom while fearing stress or judgment — one strong fear can outweigh several benefits.",
          icon: "warn",
        },
        {
          title: "The pain–pain barrier",
          body: "When every option feels painful, people stall or pick the least painful — which is often staying stuck.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q5-change-belief",
      prompt: "How strongly do I believe I can change a pattern quickly?",
      type: "scale",
      help: "Scale · 1 = change must be slow, 10 = change can be immediate",
    },
    {
      id: "q5-pattern",
      prompt: "Which pattern am I ready to change — and what mixed associations keep it alive?",
      type: "text",
    },
    {
      id: "q5-ownership",
      prompt: "How fully do I own that I must change this (not wait for conditions)?",
      type: "scale",
      help: "Scale · 1 = waiting on circumstances, 10 = fully responsible",
    },
    {
      id: "q5-followed-through",
      prompt: "Did I reinforce my new response when the old trigger appeared?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q5-commitment",
      prompt: "What will I change starting now, and how will I reinforce it today?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
