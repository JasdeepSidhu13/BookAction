import type { Chapter } from "@/lib/types";

export const ch8: Omit<Chapter, "bankQuestions"> = {
  id: "ch-8-goldilocks-and-mastery",
  number: 8,
  title: "The Goldilocks Rule",
  shortTitle: "Goldilocks Rule",
  part: "Advanced tactics · From good to great",
  teaser:
    "Peak motivation lives at just-manageable difficulty — not too hard, not too easy, just right.",
  readMinutes: 11,
  summary: [
    {
      type: "bigIdea",
      text: "The Goldilocks Rule: humans experience peak motivation when working on tasks right on the edge of their current abilities — not too hard, not too easy, just right. Combine that with deliberate stretch and periodic review.",
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
          body: "Steve Martin expanded his act a minute or two at a time — enough victories to stay motivated, enough mistakes to keep working hard.",
        },
        {
          title: "Genes load the gun; habits pull the trigger",
          body: "Talent and context matter, but habits determine how fully you play the hand you are dealt. Work with your nature, not against it.",
        },
        {
          title: "Establish, then advance",
          body: "When starting, keep the habit easy (3rd Law). Once established, raise challenge so boredom doesn’t kill the streak.",
        },
        {
          title: "Reflection and review",
          body: "Ask regularly: What went well? What didn’t? What will I try next? Systems need maintenance.",
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
          body: "Once the two-minute version is automatic, add load without breaking consistency.",
          icon: "action",
        },
        {
          title: "Review the system",
          body: "Weekly or monthly: keep, improve, or drop.",
          icon: "focus",
        },
        {
          title: "Stay flexible",
          body: "Keep the identity; update the methods when life changes.",
          icon: "meaning",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Maximum motivation occurs at the midpoint between boredom and anxiety. Design your next step to live there.",
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
          title: "Jumping too hard",
          body: "Raising difficulty so fast the habit collapses under anxiety.",
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
