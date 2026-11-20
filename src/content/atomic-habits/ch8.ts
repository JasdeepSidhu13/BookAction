import type { Chapter } from "@/lib/types";

export const ch8: Omit<Chapter, "bankQuestions"> = {
  id: "ch-8-goldilocks-and-mastery",
  number: 8,
  title: "Stay in the Goldilocks Zone",
  shortTitle: "Goldilocks Zone",
  part: "Advanced tactics",
  teaser:
    "Peak motivation lives at the edge of your ability — hard enough to grow, easy enough to continue.",
  readMinutes: 10,
  summary: [
    {
      type: "bigIdea",
      text: "The Goldilocks Rule: humans experience peak motivation when working on challenges that are right on the edge of their current abilities — not too hard, not too easy. Combine that with deliberate practice and periodic reflection.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "mastery", label: "Keep growing", color: "#155E75" },
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
          title: "Just-manageable difficulty",
          body: "Boredom kills habits as surely as failure. Nudge challenge up as competence rises.",
        },
        {
          title: "Variables of success",
          body: "Genes and context matter, but habits determine how fully you play the hand you are dealt.",
        },
        {
          title: "Reflection and review",
          body: "Annual and monthly reviews keep your system honest — what to keep, improve, or drop.",
        },
        {
          title: "Hold identity lightly",
          body: "When a habit locks your identity too tightly, you stop adapting. Keep a growth margin.",
        },
      ],
    },
    {
      type: "cards",
      id: "mastery",
      title: "Keep growing",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Raise the bar slowly",
          body: "Once the two-minute version is automatic, add load without breaking the streak.",
          icon: "action",
        },
        {
          title: "Review the system",
          body: "Ask: What went well? What didn’t? What will I try next?",
          icon: "focus",
        },
        {
          title: "Stay flexible",
          body: "Keep the identity, update the methods when life changes.",
          icon: "meaning",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "The upside of habits is efficiency; the downside is that they can blind you to new paths. Establish habits, then refine them with curiosity.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Rate your key habit: too easy, too hard, or Goldilocks — then adjust one notch.",
        "Schedule a 15-minute weekly review of your habit system.",
        "Name one method you will update without abandoning the identity behind it.",
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
          title: "Comfort plateau",
          body: "Repeating a habit that no longer stretches you — then calling it discipline.",
          icon: "warn",
        },
        {
          title: "Identity rigidity",
          body: "Defending “this is who I am” when evidence says the approach needs a rewrite.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q8-goldilocks",
      prompt: "Is my key habit in the Goldilocks Zone right now?",
      type: "scale",
      help: "Scale · 1 = too easy/hard, 10 = perfectly challenging",
    },
    {
      id: "q8-adjust",
      prompt: "What will I make slightly harder or easier this week?",
      type: "text",
    },
    {
      id: "q8-review",
      prompt: "How consistently am I reviewing and refining my system?",
      type: "scale",
      help: "Scale · 1 = never, 10 = weekly reflection",
    },
    {
      id: "q8-followed",
      prompt: "Did I take the first action I committed to last time?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q8-commitment",
      prompt: "What Goldilocks adjustment will I make this week?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
