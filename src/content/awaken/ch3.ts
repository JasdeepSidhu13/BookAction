import type { Chapter } from "@/lib/types";

export const ch3: Omit<Chapter, "bankQuestions"> = {
  id: "ch-3-force-that-shapes",
  number: 3,
  title: "The Force That Shapes Your Life",
  shortTitle: "Pain & Pleasure",
  part: "Part one · Unleash your power",
  teaser:
    "Everything you do is driven by avoiding pain or gaining pleasure — master those links and you master change.",
  readMinutes: 11,
  summary: [
    {
      type: "bigIdea",
      text: "The secret of success is learning how to use pain and pleasure instead of having pain and pleasure use you. What you link pain and pleasure to shapes your destiny.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "leverage", label: "Create leverage", color: "#155E75" },
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
          title: "Pain and pleasure drive every action",
          body: "You procrastinate when taking action feels more painful than putting it off — until not acting becomes more painful.",
        },
        {
          title: "Change the cause, not only the effect",
          body: "People keep trying to change behavior (the effect) instead of the pain/pleasure associations behind it.",
        },
        {
          title: "Emotional threshold unlocks change",
          body: "When you hit \"I've had it — never again,\" pain becomes a friend that drives new action.",
        },
        {
          title: "We act on perception, not reality",
          body: "It's not actual pain or pleasure that drives us, but our belief that an action will lead to one or the other.",
        },
        {
          title: "Short-term vs long-term tradeoffs",
          body: "Most people avoid short-term pain and create long-term pain. Valuable goals require breaking through short-term discomfort.",
        },
      ],
    },
    {
      type: "cards",
      id: "leverage",
      title: "Create leverage",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Raise the cost of staying the same",
          body: "List what the old pattern already costs you mentally, emotionally, physically, and relationally.",
          icon: "focus",
        },
        {
          title: "Make the new path rewarding",
          body: "Build a vivid list of pleasure you'll gain by acting now — not only distant outcomes.",
          icon: "meaning",
        },
        {
          title: "Advertise in your own mind",
          body: "Link massive pain to behaviors you want to stop, and pleasure to the new ones, until they're automatic.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "If we fail to direct our own associations to pain and pleasure, we're living no better than reacting to our environment — allowing whatever comes up next to determine our lives.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write four actions you've been putting off.",
        "For each: why haven't I acted? What pain have I linked to taking action? What pleasure have I gotten from the old pattern?",
        "Write what it will cost if you don't change now — then list all the pleasure you'll receive by acting today.",
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
          title: "Fear of the unknown",
          body: "Staying in an unsatisfying pattern because change feels more painful than the familiar discomfort.",
          icon: "warn",
        },
        {
          title: "Willpower-only diets of change",
          body: "Without rewiring pain/pleasure links, short-term discipline collapses when old associations return.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q3-pain-link",
      prompt: "How strongly have I linked pain to the habits I want to leave behind?",
      type: "scale",
      help: "Scale · 1 = still feel rewarding, 10 = clearly costly",
    },
    {
      id: "q3-habit-cost",
      prompt: "Which habit is costing me most right now, and what pleasure still keeps it alive?",
      type: "text",
    },
    {
      id: "q3-pleasure-link",
      prompt: "How rewarding does my replacement habit feel in the moment?",
      type: "scale",
      help: "Scale · 1 = pure grind, 10 = immediately reinforcing",
    },
    {
      id: "q3-followed-through",
      prompt: "Did I interrupt the old pattern when it showed up this period?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q3-commitment",
      prompt: "What association will I rewire now, and what is my first practice?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
