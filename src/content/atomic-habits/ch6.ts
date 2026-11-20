import type { Chapter } from "@/lib/types";

export const ch6: Omit<Chapter, "bankQuestions"> = {
  id: "ch-6-make-it-easy",
  number: 6,
  title: "Make It Easy",
  shortTitle: "Make It Easy",
  part: "The 3rd Law",
  teaser:
    "Walk slowly but never backward — Law of Least Effort, Two-Minute Rule, and commitment devices.",
  readMinutes: 12,
  summary: [
    {
      type: "bigIdea",
      text: "When you start a new habit, it should take less than two minutes to do. “Read before bed” becomes “read one page.” “Run three miles” becomes “tie my running shoes.” Standardize before you optimize.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "easy", label: "Ease tactics", color: "#155E75" },
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
          title: "Motion vs action",
          body: "Planning and researching can be motion. Action is the behavior that delivers an outcome. Walk slowly, but never backward — keep taking real steps.",
        },
        {
          title: "Law of Least Effort",
          body: "Human behavior follows the path of least resistance. Reduce friction for good habits; add friction for bad ones.",
        },
        {
          title: "Two-Minute Rule",
          body: "Scale the habit down until starting is automatic. Anyone can open notes, take out a yoga mat, or fold one pair of socks.",
        },
        {
          title: "Commitment devices",
          body: "Make good habits inevitable and bad habits impossible — pack the bag tonight, block the site, auto-pay the class.",
        },
      ],
    },
    {
      type: "cards",
      id: "easy",
      title: "Ease tactics",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Gateway habit",
          body: "Start so small you always begin — then let continuation take over.",
          icon: "action",
        },
        {
          title: "Prime the environment",
          body: "Set tools out in advance so the habit is already half done.",
          icon: "focus",
        },
        {
          title: "Add steps to bad habits",
          body: "Distance, delay, and inconvenience are features — not bugs.",
          icon: "meaning",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "A new habit should not feel like a challenge. The actions that follow can be challenging, but the first two minutes should be easy.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Shrink your key habit to a two-minute version for the next seven days.",
        "Remove two minutes of setup friction from that habit.",
        "Add two minutes of friction to one bad habit you want less of.",
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
          title: "Optimizing too early",
          body: "Buying gear and perfecting plans before you have a reliable start ritual.",
          icon: "warn",
        },
        {
          title: "Staying tiny forever",
          body: "Using the Two-Minute Rule as a permanent ceiling instead of a gateway.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q6-easy",
      prompt: "How easy is it to start my key habit right now?",
      type: "scale",
      help: "Scale · 1 = high friction, 10 = nearly effortless to begin",
    },
    {
      id: "q6-two-min",
      prompt: "What is the two-minute version of the habit I want?",
      type: "text",
    },
    {
      id: "q6-friction",
      prompt: "How well did I manage friction (down for good, up for bad) this week?",
      type: "scale",
      help: "Scale · 1 = not at all, 10 = deliberately designed",
    },
    {
      id: "q6-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q6-commitment",
      prompt: "What friction change will I make today?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
