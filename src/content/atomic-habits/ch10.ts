import type { Chapter } from "@/lib/types";

export const ch10: Omit<Chapter, "bankQuestions"> = {
  id: "ch-10-results-that-last",
  number: 10,
  title: "The Secret to Results That Last",
  shortTitle: "Results That Last",
  part: "Conclusion",
  teaser:
    "One coin doesn’t make you rich — but a thousand atomic habits will. Keep stacking the system.",
  readMinutes: 9,
  summary: [
    {
      type: "bigIdea",
      text: "Can one tiny change transform your life? Unlikely. But what if you made another? And another? The holy grail of habit change is not a single 1% improvement, but a thousand of them — atomic habits stacking into a system.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "stack", label: "Keep stacking", color: "#155E75" },
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
          title: "Sorites wisdom",
          body: "Like the ancient coin paradox: no single addition looks like “rich,” yet at some point the pile is undeniable. Habits work the same way.",
        },
        {
          title: "Small improvements feel meaningless at first",
          body: "Early gains get washed away by the weight of the old system. Stay long enough for the new system to dominate.",
        },
        {
          title: "Return to the Four Laws",
          body: "Whenever you stall, ask: How can I make it obvious, attractive, easy, and satisfying? The answers restart momentum.",
        },
        {
          title: "Be the designer of your life",
          body: "You are not stuck with the habits you inherited. Redesign cues, cravings, responses, and rewards until the system fits who you are becoming.",
        },
      ],
    },
    {
      type: "cards",
      id: "stack",
      title: "Keep stacking",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "One more 1%",
          body: "Add the next marginal gain before you celebrate being “done.”",
          icon: "action",
        },
        {
          title: "Protect the compound",
          body: "Never miss twice. Recover faster than you spiral.",
          icon: "focus",
        },
        {
          title: "Identity first",
          body: "Keep casting votes for the person you are becoming.",
          icon: "meaning",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Success is not a destination to arrive at — it is a system to maintain. The work is never finished, and that is the point.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "List three atomic habits already compounding for you — and one you will add next.",
        "Re-check each of the Four Laws on your hardest habit.",
        "Write a one-sentence identity you will keep voting for over the next 90 days.",
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
          title: "Waiting for the dramatic win",
          body: "Dismissing tiny changes because they don’t look like transformation yet.",
          icon: "warn",
        },
        {
          title: "Declaring yourself finished",
          body: "Treating habit work as a project with an end date instead of a living system.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q10-stack",
      prompt: "How committed am I to stacking the next 1% instead of hunting a breakthrough?",
      type: "scale",
      help: "Scale · 1 = still hunting drama, 10 = faithfully stacking",
    },
    {
      id: "q10-next",
      prompt: "What is the next atomic habit I will add to my system?",
      type: "text",
    },
    {
      id: "q10-identity",
      prompt: "How consistently am I voting for the identity I chose?",
      type: "scale",
      help: "Scale · 1 = rarely, 10 = daily evidence",
    },
    {
      id: "q10-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q10-commitment",
      prompt: "What will I protect in my habit system for the next 90 days?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
