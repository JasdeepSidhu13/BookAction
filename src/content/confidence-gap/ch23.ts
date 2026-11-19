import type { Chapter } from "@/lib/types";

export const ch23: Omit<Chapter, "bankQuestions"> = {
  id: "ch-23-it-aint-over-till-its-over",
  number: 23,
  title: "It Ain’t Over Till It’s Over",
  shortTitle: "Ain’t Over",
  part: "Part five · Playing the game",
  teaser: "You will backslide. Start again. Keep playing by the right rules of the confidence game.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Making your mark takes patience and commitment. Fallibility is normal. The game isn’t over — return to the right rules and begin again.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Rules worth keeping", color: "#166534" },
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
          title: "Always start again",
          body: "Backsliding doesn’t erase skills; it invites recommitment.",
        },
        {
          title: "Everything takes time",
          body: "Confidence compounds through repeated cycles of practice.",
        },
        {
          title: "Right rules",
          body: "Actions first; hold thoughts lightly; make room for fear; live values; reflect; persist.",
        },
        {
          title: "No final arrival",
          body: "There is no permanent confidence high — only a practiced way of living.",
        },
        {
          title: "Keep resources close",
          body: "Revisit skills, worksheets, and practice when smog returns.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Rules worth keeping",
      accent: "#166534",
      tone: "green",
      items: [
        {
          title: "Act first",
          body: "Take confident actions before confident feelings arrive.",
          icon: "action",
        },
        {
          title: "Hold lightly",
          body: "Defuse from thoughts; expand around feelings; engage with life.",
          icon: "focus",
        },
        {
          title: "Begin again",
          body: "When you drift, restart without a character verdict.",
          icon: "meaning",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Life is a daring adventure, or nothing — and adventure includes getting lost and finding your way back.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "List the confidence rules that matter most for your next 30 days.",
        "Plan your response for the next backslide before it happens.",
        "Schedule a weekly five-minute values-and-skills check-in.",
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
          title: "All-or-nothing relapse story",
          body: "“I fell off, so I’m back to zero” ignores every skill you’ve practiced.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q23-1",
      prompt: "How well did I restart after drifting this week?",
      type: "scale",
      help: "Scale · 1 = stayed down, 10 = restarted quickly",
    },
    {
      id: "q23-2",
      prompt: "Which confidence rule most helped me this week?",
      type: "text",
    },
    {
      id: "q23-3",
      prompt: "How patient am I being with the long game of practice?",
      type: "scale",
      help: "Scale · 1 = impatient/quit-prone, 10 = steady",
    },
    {
      id: "q23-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q23-5",
      prompt: "How will I begin again this week — specifically?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
