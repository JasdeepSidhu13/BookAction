import type { Chapter } from "@/lib/types";

export const ch13: Omit<Chapter, "bankQuestions"> = {
  id: "ch-13-ten-day-mental-challenge",
  number: 13,
  title: "The Ten-Day Mental Challenge",
  shortTitle: "Ten-Day Challenge",
  part: "Part one · Unleash your power",
  teaser:
    "Champions are consistent. Run a ten-day challenge: no unresourceful thoughts without an immediate replace-and-act pattern.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Knowing is not enough — you must do what you know. The Ten-Day Mental Challenge builds habits of excellence by refusing to entertain unresourceful thoughts without transforming them.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Run the challenge", color: "#155E75" },
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
          title: "Consistency is the champion's mark",
          body: "One inspired day does not change a life. New patterns of focus do.",
        },
        {
          title: "Old thinking won't create a new level",
          body: "What got you here will not get you there. Protecting \"how we've always done it\" blocks growth.",
        },
        {
          title: "The challenge rules",
          body: "For ten consecutive days, refuse to dwell on unresourceful thoughts. Catch → interrupt → replace with an empowering question or focus → take a useful action.",
        },
        {
          title: "Reset if you break the streak",
          body: "If you indulge the old pattern, restart Day One. The point is conditioning, not perfection theater.",
        },
        {
          title: "Make excellence habitual",
          body: "After ten clean days, the new pattern is easier to sustain — and easier to notice when it slips.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Run the challenge",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Define \"unresourceful\" for you",
          body: "Worry loops, blame, self-contempt, catastrophizing — write your top three patterns to catch.",
          icon: "focus",
        },
        {
          title: "Install a replacement ritual",
          body: "Choose a power question set and a physical interrupt you will use every time.",
          icon: "meaning",
        },
        {
          title: "Track the ten days",
          body: "Mark each clean day. Restart honestly if you break it — integrity builds the habit.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The challenge is not about never having a negative thought — it is about never letting one rent your focus without an immediate upgrade.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Start the Ten-Day Mental Challenge tomorrow morning with a written restart rule.",
        "Carry a note with your replacement questions and one physical interrupt.",
        "Tell an accountability partner the start date and the restart rule.",
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
          title: "Soft cheating",
          body: "\"I only ruminated a little\" still trains the old pattern. Restart cleanly.",
          icon: "warn",
        },
        {
          title: "White-knuckling without replacement",
          body: "Suppression fails. Always give the mind a better place to go.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q13-streak",
  prompt: "How many clean challenge days did I complete this cycle?",
  type: "scale",
  help: "Scale · 1 = day one energy only, 10 = ten clean days",
},
    {
  id: "q13-patterns",
  prompt: "Which unresourceful patterns am I catching most often?",
  type: "text",
},
    {
  id: "q13-replacement",
  prompt: "What replacement question or action am I using when I catch myself?",
  type: "text",
},
              {
            id: "q13-followed",
            prompt: "Did I restart honestly when I broke the streak?",
            type: "choice",
            choices: ["Yes", "Partly", "No / didn't break", "N/A"],
followsCommitment: true,
          },
              {
            id: "q13-commitment",
            prompt: "When do I start (or restart) my next Ten-Day Mental Challenge?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
