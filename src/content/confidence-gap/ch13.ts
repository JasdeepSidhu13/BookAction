import type { Chapter } from "@/lib/types";

export const ch13: Omit<Chapter, "bankQuestions"> = {
  id: "ch-13-magic-glue",
  number: 13,
  title: "Magic Glue",
  shortTitle: "Magic Glue",
  part: "Part three · What gets you going?",
  teaser: "Values are the glue that binds goals to a meaningful life across love, work, play, and health.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Clarify values in four life domains, set meaningful goals, and notice the thoughts and feelings that show up — they’re part of the path, not a stop sign.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "The Values Window", color: "#166534" },
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
          title: "Four domains",
          body: "Love, Work, Play, and Health cover the major investments of a life.",
        },
        {
          title: "Mind-reading fantasy",
          body: "Imagining what you’d love important people to think reveals character values.",
        },
        {
          title: "Values window",
          body: "Translate values into specific goals without trying to do everything at once.",
        },
        {
          title: "Tuning in to your heart",
          body: "Look for recurring qualities: warmth, courage, authenticity, contribution, and so on.",
        },
        {
          title: "Fear with goals",
          body: "Nervousness when setting goals is a good sign you’re stretching.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "The Values Window",
      accent: "#166534",
      tone: "green",
      items: [
        {
          title: "Love",
          body: "Deep relationships: partner, family, close friends, community.",
          icon: "meaning",
        },
        {
          title: "Work",
          body: "Contribution through job, study, caregiving, or vocation.",
          icon: "focus",
        },
        {
          title: "Play & Health",
          body: "Recreation, rest, creativity, and how you care for your body.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "You can’t do it all at once — but you can choose the next domain and take the next glued-together step.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Run the mind-reading values exercise for one person in Love and one in Work.",
        "Fill a Values Window with one meaningful goal per domain.",
        "Notice fear that appears and name it as part of stretching, not a veto.",
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
          title: "Goal avalanche",
          body: "Too many goals at once recreates overwhelm and avoidance.",
          icon: "warn",
        },
        {
          title: "Skipping the feeling check",
          body: "Ignoring fear now means being surprised by it later.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q13-1",
      prompt: "How balanced was my attention across love, work, play, and health?",
      type: "scale",
      help: "Scale · 1 = very lopsided, 10 = well balanced",
    },
    {
      id: "q13-2",
      prompt: "Which domain needs more values-glued action right now?",
      type: "text",
    },
    {
      id: "q13-3",
      prompt: "How clear are my goals in that domain?",
      type: "scale",
      help: "Scale · 1 = vague, 10 = specific",
    },
    {
      id: "q13-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q13-5",
      prompt: "What domain and goal will I advance with one concrete action?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
