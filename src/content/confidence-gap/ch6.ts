import type { Chapter } from "@/lib/types";

export const ch6: Omit<Chapter, "bankQuestions"> = {
  id: "ch-6-never-short-of-words",
  number: 6,
  title: "Never Short of Words",
  shortTitle: "Radio Triple F",
  part: "Part two · The double-edged sword",
  teaser: "Treat your mind like Radio Triple F — Fear, Flaws, and Failure — and learn three steps to unhook.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "Your mind is rarely short of words. Notice the broadcast, name it, and neutralize its grip — then return to the life you want to live.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "cards", label: "Three steps to defusion", color: "#155E75" },
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
          title: "Radio Triple F",
          body: "Hear fear, flaw, and failure commentary as a radio station you don’t have to obey.",
        },
        {
          title: "Three steps",
          body: "Notice it → Name it → Neutralize it (hold lightly / thank your mind / let it chatter).",
        },
        {
          title: "Leaves on a Stream",
          body: "Practice watching thoughts float by without grabbing them — training for real-life unhooking.",
        },
        {
          title: "Practice over preference",
          body: "You may dislike a technique at first; skill grows with consistent reps.",
        },
        {
          title: "Back to the list",
          body: "Revisit your Life-Change List and notice what Radio Triple F says when you imagine starting.",
        },
      ],
    },
    {
      type: "cards",
      id: "cards",
      title: "Three steps to defusion",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Notice it",
          body: "Catch that you’re fused — commentary is running the show.",
          icon: "focus",
        },
        {
          title: "Name it",
          body: "Label the broadcast: “Here’s Radio Triple F” or “I’m having the thought that…”.",
          icon: "meaning",
        },
        {
          title: "Neutralize it",
          body: "Thank your mind, hear thoughts as radio noise, and return to valued action.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The point of Leaves on a Stream isn’t blissful calm — it’s getting better at noticing you’ve been hooked and coming back.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Pick one Life-Change List item and notice Radio Triple F for 30 seconds.",
        "Practice Notice → Name → Neutralize three times today in ordinary moments.",
        "Do Leaves on a Stream for five minutes, restarting kindly each time you get hooked.",
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
          title: "Trying to force the stream",
          body: "Speeding thoughts away is still fighting. Let stuck leaves stay.",
          icon: "warn",
        },
        {
          title: "Judging your practice",
          body: "Getting hooked repeatedly is the training ground, not proof of failure.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q6-1",
      prompt: "How often did I notice–name–neutralize unhelpful mental broadcasts?",
      type: "scale",
      help: "Scale · 1 = never, 10 = frequently",
    },
    {
      id: "q6-2",
      prompt: "What did Radio Triple F say when I approached something that matters?",
      type: "text",
    },
    {
      id: "q6-3",
      prompt: "How consistent was my defusion practice this week?",
      type: "scale",
      help: "Scale · 1 = none, 10 = daily",
    },
    {
      id: "q6-4",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ['Yes', 'Partly', 'No'],
      followsCommitment: true,
    },
    {
      id: "q6-5",
      prompt: "Which Life-Change action will I start while Radio Triple F plays in the background?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
