import type { Chapter } from "@/lib/types";

export const ch23: Omit<Chapter, "bankQuestions"> = {
  id: "ch-23-code-of-conduct",
  number: 23,
  title: "Be Impeccable: Your Code of Conduct — Day Five",
  shortTitle: "Code of Conduct",
  part: "Part three · Seven days to shape your destiny",
  teaser:
    "Day Five: turn values into moment-to-moment states you will be — every day, no matter what.",
  readMinutes: 9,
  summary: [
    {
      type: "bigIdea",
      text: "You can have great values and still fail to live them in the moment. A Code of Conduct — the states you commit to being daily — bridges values and behavior.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Write your code", color: "#155E75" },
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
          title: "Values need a daily bridge",
          body: "Events can control you unless you decide in advance who you will be regardless of circumstance.",
        },
        {
          title: "Commit to states, not moods",
          body: "Friendly, loving, playful, generous, passionate — choose states you will visit at least once every day.",
        },
        {
          title: "Keep the list livable",
          body: "Long enough for richness, short enough to actually live — often seven to ten states.",
        },
        {
          title: "Codes throughout history",
          body: "From personal creeds to cultural codes, humans use written standards to stay impeccable under pressure.",
        },
        {
          title: "Measure the day by being",
          body: "Ask whether you were those states — not only whether you got tasks done.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Write your code",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Draft your states list",
          body: "Write 7–10 states that express your highest values in action.",
          icon: "focus",
        },
        {
          title: "Define proof",
          body: "For each state, note what counts as \"I lived this today.\"",
          icon: "meaning",
        },
        {
          title: "Evening impeccability check",
          body: "Score the code nightly; repair gaps the next morning with first actions.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Impeccability is not perfection. It is refusing to leave your values unexpressed when life gets noisy.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write your Code of Conduct (7–10 daily states).",
        "Post it where you will see it each morning.",
        "Run a 7-day streak of evening checks against the code.",
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
          title: "Aspirational wallpaper",
          body: "A code you don't measure becomes decoration.",
          icon: "warn",
        },
        {
          title: "Too many states",
          body: "An endless list guarantees failure. Edit for liveability.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q23-impeccable",
  prompt: "How consistently did I live my Code of Conduct?",
  type: "scale",
  help: "Scale · 1 = ignored, 10 = lived deliberately",
},
    {
  id: "q23-states",
  prompt: "What states are on my Code of Conduct?",
  type: "text",
},
    {
  id: "q23-gap",
  prompt: "Which state did I miss most — and how will I trigger it tomorrow?",
  type: "text",
},
              {
            id: "q23-followed",
            prompt: "Did I complete tonight's impeccability check?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
followsCommitment: true,
          },
              {
            id: "q23-commitment",
            prompt: "How will I keep my Code alive for the next 30 days?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
