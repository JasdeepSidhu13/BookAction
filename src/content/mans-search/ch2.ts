import type { Chapter } from "@/lib/types";

export const ch2: Omit<Chapter, "bankQuestions"> = {
  id: "ch-2-shock-of-admission",
  number: 2,
  title: "The Shock of Admission",
  shortTitle: "Shock of Admission",
  part: "Part one · Experiences in a concentration camp",
  teaser:
    "The first phase of camp life: selection, stripped identity, and the question everyday life asks of the mind.",
  readMinutes: 12,
  summary: [
    {
      type: "bigIdea",
      text: "Frankl’s first essay is not a catalog of famous horrors. It asks how everyday camp life — the multitude of small torments — was reflected in the mind of the average prisoner.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "phase", label: "Phase one", color: "#155E75" },
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
          title: "Inside story, not spectacle",
          body: "The focus is ordinary prisoners and small torments — not only Capos, martyrs, or already-told great horrors.",
        },
        {
          title: "Identity reduced to a number",
          body: "Names vanished; a glance at a number could decide a charge. The self was under continuous threat of erasure.",
        },
        {
          title: "Shock as the first phase",
          body: "Admission brought delusion of reprieve, then the brutal clarity of selection and loss of everything external.",
        },
        {
          title: "The best often did not return",
          body: "Survival sometimes required ruthless self-selection. Frankl’s honesty refuses easy moral theater about who lived.",
        },
      ],
    },
    {
      type: "cards",
      id: "phase",
      title: "What shock strips away",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Possessions and status",
          body: "Clothes, papers, professions — the props of former life — disappear at the gate.",
          icon: "focus",
        },
        {
          title: "Illusions of safety",
          body: "Hope that “this can’t be for me” collides with selection lines and random cruelty.",
          icon: "meaning",
        },
        {
          title: "Moral leisure",
          body: "Under extremity, ethical debate shrinks; the mind narrows to keeping oneself and one’s people alive.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Facts matter here only as they live inside a person’s experience — the exact nature of those experiences is what Frankl sets out to describe.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Name one “small torment” in your life that shapes your inner state more than dramatic crises do.",
        "Where is your identity tied to a title, role, or possession you could lose — and what remains if it goes?",
        "Practice one act of dignity this week that does not depend on recognition.",
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
          title: "Comparing suffering",
          body: "Using Frankl’s extremity to dismiss your own hard days — or to dramatize them falsely.",
          icon: "warn",
        },
        {
          title: "Numb curiosity",
          body: "Consuming atrocity as content without letting it ask anything of your character.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q2-inner-state",
      prompt: "How honestly am I facing the “small torments” that shape my mood this week?",
      type: "scale",
      help: "Scale · 1 = avoiding them, 10 = facing them clearly",
    },
    {
      id: "q2-identity",
      prompt: "What part of my identity am I most afraid of losing — and what would remain?",
      type: "text",
    },
    {
      id: "q2-dignity",
      prompt: "How consistently did I act with dignity when no one was watching?",
      type: "scale",
      help: "Scale · 1 = rarely, 10 = consistently",
    },
    {
      id: "q2-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q2-commitment",
      prompt: "What one practice of dignity am I committing to this week?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
