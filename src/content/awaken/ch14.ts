import type { Chapter } from "@/lib/types";

export const ch14: Omit<Chapter, "bankQuestions"> = {
  id: "ch-14-master-system",
  number: 14,
  title: "Ultimate Influence: Your Master System",
  shortTitle: "Master System",
  part: "Part two · Taking control",
  teaser:
    "Under every behavior is an evaluation system — five elements that decide how you interpret life.",
  readMinutes: 11,
  summary: [
    {
      type: "bigIdea",
      text: "Human behavior follows patterns. Your Master System — the five elements you use to evaluate everything — explains why you do what you do, and where to intervene for lasting change.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Map the five elements", color: "#155E75" },
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
          title: "Behavior has organizing principles",
          body: "Like chemistry, evaluation follows predictable patterns once you know the elements.",
        },
        {
          title: "Five elements of evaluation",
          body: "Your Master System includes the mental/emotional state you're in, the questions you ask, the values you honor, the beliefs/rules you hold, and the references you can access.",
        },
        {
          title: "State first",
          body: "The same event feels different in a depleted state versus a resourceful one — evaluations start there.",
        },
        {
          title: "Leverage points",
          body: "Change often happens fastest when you adjust the highest-leverage element for that person — sometimes a belief, sometimes a question, sometimes a reference.",
        },
        {
          title: "Influence with precision",
          body: "Understanding someone's Master System lets you help without guessing — and to lead yourself with the same clarity.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Map the five elements",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Diagnose a stuck pattern",
          body: "Pick one recurring frustration and ask: What state am I in? What question am I asking? Which value or rule is firing?",
          icon: "focus",
        },
        {
          title: "Find the lever",
          body: "Test small changes: a better question, a temporary rule soften, or a new reference from someone who succeeds here.",
          icon: "meaning",
        },
        {
          title: "Design your ideal stack",
          body: "Define the states, questions, values, beliefs, and references that would make your next level inevitable.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "You don't need to fight every behavior. Change the evaluation that produces it, and the behavior often reorganizes itself.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Diagram your Master System for one important area (health, money, or relationship).",
        "Identify which element is most distorting your evaluations there.",
        "Change that one element for seven days and note what shifts.",
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
          title: "Judging behavior without context",
          body: "Without the Master System lens, you moralize symptoms instead of changing causes.",
          icon: "warn",
        },
        {
          title: "Trying to change everything at once",
          body: "Find the leverage point. One precise shift beats five vague resolutions.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q14-clarity",
  prompt: "How clearly do I understand my Master System in my toughest area?",
  type: "scale",
  help: "Scale · 1 = mystery, 10 = I can map all five elements",
},
    {
  id: "q14-elements",
  prompt: "For one stuck pattern, what state, questions, values/rules, and references are running?",
  type: "text",
},
    {
  id: "q14-lever",
  prompt: "Which single Master System element will I change this week?",
  type: "text",
},
              {
            id: "q14-followed",
            prompt: "Did I apply that lever when the pattern showed up?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
followsCommitment: true,
          },
              {
            id: "q14-commitment",
            prompt: "What Master System experiment will I run next?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
