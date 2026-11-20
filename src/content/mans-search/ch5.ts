import type { Chapter } from "@/lib/types";

export const ch5: Omit<Chapter, "bankQuestions"> = {
  id: "ch-5-will-to-meaning",
  number: 5,
  title: "The Will to Meaning",
  shortTitle: "Will to Meaning",
  part: "Part two · Logotherapy in a nutshell",
  teaser:
    "Man’s search for meaning is the primary motivation in life — not a side effect of drives.",
  readMinutes: 11,
  summary: [
    {
      type: "bigIdea",
      text: "Logotherapy centers the will to meaning — in contrast to Freud’s will to pleasure and Adler’s will to power. Meaning is unique and specific; only you can fulfill the meaning of your own life.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "contrast", label: "Three wills", color: "#155E75" },
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
          title: "Meaning is primary",
          body: "People will live — and even die — for ideals and values. Meanings are not “nothing but” defense mechanisms.",
        },
        {
          title: "Unique and specific",
          body: "Your meaning cannot be borrowed. It must be fulfilled by you alone to satisfy your will to meaning.",
        },
        {
          title: "Self-transcendence",
          body: "Being human always points beyond oneself — toward a cause to serve or a person to love.",
        },
        {
          title: "Tension is healthy",
          body: "Mental health needs a degree of tension between what you have achieved and what you still ought to accomplish.",
        },
      ],
    },
    {
      type: "cards",
      id: "contrast",
      title: "Three wills",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Will to pleasure",
          body: "Freud’s pleasure principle — meaning reduced to drive satisfaction.",
          icon: "focus",
        },
        {
          title: "Will to power",
          body: "Adler’s striving for superiority — meaning reduced to status and control.",
          icon: "action",
        },
        {
          title: "Will to meaning",
          body: "Frankl’s claim: the primary motivational force is the search for meaning.",
          icon: "meaning",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "What man actually needs is not a tensionless state but the striving and struggling for a worthwhile goal, a freely chosen task.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Complete: “If I had to name the meaning asking for me this season, it would be…”",
        "Reduce one pleasure- or status-chase that is crowding out that meaning.",
        "Choose one worthwhile tension to keep — a goal that stretches you on purpose.",
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
          title: "Borrowed purposes",
          body: "Living someone else’s script and calling it meaning.",
          icon: "warn",
        },
        {
          title: "Tensionless comfort",
          body: "Treating ease as the goal and then wondering why emptiness grows.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q5-meaning-clear",
      prompt: "How clear is the meaning I am living toward right now?",
      type: "scale",
      help: "Scale · 1 = foggy, 10 = unmistakable",
    },
    {
      id: "q5-primary",
      prompt: "Where am I chasing pleasure or power when meaning is actually what I need?",
      type: "text",
    },
    {
      id: "q5-transcend",
      prompt: "How often did I act beyond myself — for a cause or person — this week?",
      type: "scale",
      help: "Scale · 1 = self-only, 10 = strongly beyond myself",
    },
    {
      id: "q5-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q5-commitment",
      prompt: "What freely chosen task will I serve this week?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
