import type { Chapter } from "@/lib/types";

export const ch6: Omit<Chapter, "bankQuestions"> = {
  id: "ch-6-environment-matters",
  number: 6,
  title: "Motivation Is Overrated; Environment Often Matters More",
  shortTitle: "Environment",
  part: "The 1st Law · Make It Obvious",
  teaser: "Design spaces so the good cue is obvious and the bad cue is invisible.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Environment is the invisible hand that shapes behavior. Make the cues for good habits obvious in your world — and remove the cues for bad ones.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Focus", color: "#155E75" },
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
          title: "Context drives action",
          body: "We don’t choose habits in a vacuum; rooms, desks, phones, and people cue us constantly.",
        },
        {
          title: "One space, one use",
          body: "Mixing cues (bed = sleep + phone) confuses the brain. Separate contexts when you can.",
        },
        {
          title: "Prime the environment",
          body: "Put the guitar in the living room, the book on the pillow, the water on the desk.",
        },
        {
          title: "Design over discipline",
          body: "Stop relying on motivation in a cue-rich bad environment.",
        }
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Focus",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Add good cues",
          body: "Put tools in the path.",
          icon: "focus",
        },
        {
          title: "Remove bad cues",
          body: "Out of sight, out of mind.",
          icon: "meaning",
        },
        {
          title: "Separate contexts",
          body: "Give each habit a home.",
          icon: "action",
        }
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Be the architect of your environment, not merely a consumer of whatever cues show up.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Add one visible cue for a good habit today.",
        "Hide or delete one cue for a bad habit.",
        "Assign one space a single purpose this week."
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
          title: "Skipping the practice",
          body: "Collecting ideas without casting a vote in behavior today.",
          icon: "warn",
        },
        {
          title: "All-or-nothing",
          body: "Waiting for perfect conditions instead of a two-minute start.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q6-scale-a",
      prompt: "Does my space help or fight my key habit?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
    },
    {
      id: "q6-text-a",
      prompt: "What cue will I add or remove today?",
      type: "text",
    },
    {
      id: "q6-scale-b",
      prompt: "Where are mixed contexts hurting me?",
      type: "scale",
      help: "Scale · 1 = low, 10 = high",
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
      prompt: "What am I committing to now, and what is my first step?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
