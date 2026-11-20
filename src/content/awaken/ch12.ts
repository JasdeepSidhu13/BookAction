import type { Chapter } from "@/lib/types";

export const ch12: Omit<Chapter, "bankQuestions"> = {
  id: "ch-12-compelling-future",
  number: 12,
  title: "Creating a Compelling Future",
  shortTitle: "Compelling Future",
  part: "Part one · Unleash your power",
  teaser:
    "Knowing what to do is not enough — invent a future so magnetic it pulls you through hard days.",
  readMinutes: 12,
  summary: [
    {
      type: "bigIdea",
      text: "Most people know what they should do and still don't. What is missing is drive — and drive comes from a compelling future that makes massive action feel inevitable.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Build the pull", color: "#155E75" },
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
          title: "Dream first, edit later",
          body: "Unlock imagination like a kid again. Wild brainstorming reveals possibilities that \"common sense\" would delete too early.",
        },
        {
          title: "Compelling futures create energy",
          body: "A vivid vision becomes a magnet through tough times — something you return to whenever inspiration dips.",
        },
        {
          title: "Goals in multiple life categories",
          body: "Design outcomes for personal development, career/business, finances, toys/adventure, contribution, and relationships — not just one lane.",
        },
        {
          title: "Make goals sensory and emotional",
          body: "See, feel, and hear the outcome as if it is already real. Emotion wires commitment.",
        },
        {
          title: "Reasons beat resources",
          body: "When the why is strong enough, you find or invent the how. Weak reasons produce weak follow-through.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Build the pull",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Brainstorm without filters",
          body: "Set a timer and list everything you want — ridiculous included. Quantity first; refine after.",
          icon: "focus",
        },
        {
          title: "Assign timelines",
          body: "Sort goals into 1-year, 5-year, 10-year, and 20-year buckets so urgency and patience both get a home.",
          icon: "meaning",
        },
        {
          title: "Daily immersion",
          body: "Review your top goals daily with emotion. Revisit this chapter whenever you need renewed pull.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "A compelling future is not a wish list — it is a designed obsession that organizes your decisions, focus, and standards.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write at least 50 wants across life categories without censoring.",
        "Circle your top 4 one-year goals and write why each must happen.",
        "Create a daily 5-minute visualization ritual for those four goals.",
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
          title: "Passive reading",
          body: "This chapter only works if you do the exercises. Inspiration without writing evaporates.",
          icon: "warn",
        },
        {
          title: "Goals without reasons",
          body: "Outcomes that lack emotional why rarely survive the first obstacle.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q12-pull",
  prompt: "How compelling does my future feel right now?",
  type: "scale",
  help: "Scale · 1 = vague or flat, 10 = magnetic pull",
},
    {
  id: "q12-top-goals",
  prompt: "What are my top four one-year goals — and why must each happen?",
  type: "text",
},
    {
  id: "q12-categories",
  prompt: "Which life category is underdeveloped in my vision?",
  type: "text",
},
              {
            id: "q12-followed",
            prompt: "Did I review my compelling future with emotion this week?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
followsCommitment: true,
          },
              {
            id: "q12-commitment",
            prompt: "What vision practice will I keep daily?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
