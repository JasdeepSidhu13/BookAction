import type { Chapter } from "@/lib/types";

export const ch25: Omit<Chapter, "bankQuestions"> = {
  id: "ch-25-rest-and-play",
  number: 25,
  title: "Rest and Play: Even God Took One Day Off! — Day Seven",
  shortTitle: "Rest and Play",
  part: "Part three · Seven days to shape your destiny",
  teaser:
    "Day Seven: achieve balance — rest, play, spontaneity, and a child's heart.",
  readMinutes: 6,
  summary: [
    {
      type: "bigIdea",
      text: "You've worked hard. Day Seven is sacred balance: rest and play restore the nervous system and keep the child's heart alive — the mark of a great human.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Restore on purpose", color: "#155E75" },
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
          title: "Balance is part of destiny",
          body: "Nonstop pushing without renewal collapses the very giant you're awakening.",
        },
        {
          title: "Plan fun — or be spontaneous",
          body: "Either schedule something delightful or follow a spark. Both count if you fully enjoy them.",
        },
        {
          title: "Outrageous is allowed",
          body: "Do something that takes you outside your usual self — play expands identity.",
        },
        {
          title: "Keep the child's heart",
          body: "Curiosity, laughter, and wonder are strengths, not distractions from seriousness.",
        },
        {
          title: "Rest prepares contribution",
          body: "Day Seven readies you for the ultimate challenge: what one person can do for others.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Restore on purpose",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Choose today's play",
          body: "Pick one restorative or playful act and protect it like a meeting.",
          icon: "focus",
        },
        {
          title: "Unplug to feel it",
          body: "Presence makes rest actually restoring — fewer half-distracted breaks.",
          icon: "meaning",
        },
        {
          title: "Share the joy",
          body: "Invite someone into play; joy multiplies in company.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Play is not the opposite of a meaningful life — it is one of the ways a meaningful life stays sustainable.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Schedule a Day Seven block this week and decide the activity in advance.",
        "During it, ban productivity guilt for the duration.",
        "Note how emotion and creativity change afterward.",
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
          title: "Fake rest",
          body: "Scrolling while tense is not Day Seven. Choose real restoration.",
          icon: "warn",
        },
        {
          title: "Earning play",
          body: "If play is only allowed after exhaustion, you will rarely play well.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q25-balance",
  prompt: "How restored do I feel after prioritizing rest and play?",
  type: "scale",
  help: "Scale · 1 = still depleted, 10 = renewed",
},
    {
  id: "q25-play",
  prompt: "What did I do for rest or play — and how fully did I enjoy it?",
  type: "text",
},
    {
  id: "q25-next",
  prompt: "What playful or restorative experience will I protect next?",
  type: "text",
},
              {
            id: "q25-followed",
            prompt: "Did I actually take the Day Seven time I planned?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
followsCommitment: true,
          },
              {
            id: "q25-commitment",
            prompt: "How will I keep a weekly rest-and-play practice?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
