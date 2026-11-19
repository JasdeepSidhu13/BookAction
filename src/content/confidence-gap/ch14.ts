import type { Chapter } from "@/lib/types";

export const ch14: Omit<Chapter, "bankQuestions"> = {
  id: "ch-14-the-fear-trap",
  number: 14,
  title: "The Fear Trap",
  shortTitle: "Fear Trap",
  part: "Part four · Taming your fear",
  teaser: "Autopilot and avoidance turn fear into a trap. Awareness opens a third path: chosen action.",
  readMinutes: 9,
  summary: [
    {
      type: "bigIdea",
      text: "Fear itself isn’t the trap. The trap is letting fear dictate choices on autopilot — or living to avoid the feeling. You can feel fear and still choose.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Two modes that trap you", color: "#BE123C" },
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
          title: "What fear is",
          body: "A mind-body alarm with thoughts, sensations, and urges.",
        },
        {
          title: "Autopilot mode",
          body: "Doing whatever fear says without pausing to choose.",
        },
        {
          title: "Avoidance mode",
          body: "Structuring life to minimize fear — and shrinking your world.",
        },
        {
          title: "Albert Ellis example",
          body: "Facing rejection fears deliberately built social confidence through action.",
        },
        {
          title: "The third path",
          body: "Notice fear, make space, and move with values.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Two modes that trap you",
      accent: "#BE123C",
      tone: "rose",
      items: [
        {
          title: "Autopilot",
          body: "Fear chooses for you before you consciously reflect.",
          icon: "warn",
        },
        {
          title: "Avoidance",
          body: "You opt out, distract, or numb — short-term relief, long-term cost.",
          icon: "warn",
        },
        {
          title: "Chosen action",
          body: "Pause, open, and take a values-guided step with fear along for the ride.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "If fear always dictates your choices, you don’t have a confidence problem — you have a willingness problem you can train.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Identify one area where you are on fear autopilot.",
        "Identify one avoidance strategy you use when anxiety rises.",
        "Design a small exposure to a valued situation you’ve been avoiding.",
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
          title: "Mistaking distraction for self-care",
          body: "Endless opting out can look like coping while life stays on hold.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q14-1",
      prompt: "How often did fear dictate my choices on autopilot?",
      type: "scale",
      help: "Scale · 1 = rarely, 10 = constantly",
    },
    {
      id: "q14-2",
      prompt: "What avoidance move did I rely on most this week?",
      type: "text",
    },
    {
      id: "q14-3",
      prompt: "How willing was I to feel fear while choosing my values?",
      type: "scale",
      help: "Scale · 1 = unwilling, 10 = willing",
    },
    {
      id: "q14-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q14-5",
      prompt: "Where will I interrupt autopilot and take a chosen step with fear present?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
