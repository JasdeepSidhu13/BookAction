import type { Chapter } from "@/lib/types";

export const ch17: Omit<Chapter, "bankQuestions"> = {
  id: "ch-17-references",
  number: 17,
  title: "References: The Fabric of Life",
  shortTitle: "References",
  part: "Part two · Taking control",
  teaser:
    "Your references — experiences, stories, and models — are the fabric your beliefs are woven from.",
  readMinutes: 11,
  summary: [
    {
      type: "bigIdea",
      text: "Beliefs are built from references. Expand the quality and variety of your references and you expand what you can believe — and therefore what you can do.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Expand your fabric", color: "#155E75" },
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
          title: "Experiences stretch the mind",
          body: "A mind stretched by a new idea does not return to its old dimensions — references change capacity.",
        },
        {
          title: "Formative references leave deep grooves",
          body: "War, mentors, failures, and victories become the library your brain searches when evaluating new situations.",
        },
        {
          title: "You can choose new references",
          body: "Books, travel, mentors, challenges, and modeled excellence add references without waiting decades.",
        },
        {
          title: "Limited references limit identity",
          body: "If your only references for money, love, or health are painful, your beliefs will tend to match.",
        },
        {
          title: "Stack references for new beliefs",
          body: "To install an empowering belief, gather vivid references that make it feel true — then act to create more.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Expand your fabric",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Inventory key references",
          body: "List the experiences that most shaped your beliefs about yourself, money, and relationships.",
          icon: "focus",
        },
        {
          title: "Add missing references",
          body: "Identify where you lack empowering examples — then find people, books, or experiments that supply them.",
          icon: "meaning",
        },
        {
          title: "Create a reference on purpose",
          body: "Design one experience this month that becomes a new proof for the belief you want.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "You are not stuck with the references life randomly gave you. Curate them — and you curate the beliefs that follow.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Write ten references that support an empowering belief you want.",
        "Write ten references that still prop up a limiting belief — and reinterpret or retire them.",
        "Schedule one new reference-building experience in the next 14 days.",
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
          title: "Generalizing from one trauma",
          body: "One vivid reference can overrule dozens of quieter counterexamples if you let it.",
          icon: "warn",
        },
        {
          title: "Secondhand-only references",
          body: "Borrowed stories help, but embodied experience wires belief faster — go do something.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q17-richness",
  prompt: "How rich and useful is my reference library for the life I want?",
  type: "scale",
  help: "Scale · 1 = thin and limiting, 10 = diverse and empowering",
},
    {
  id: "q17-key-refs",
  prompt: "Which references most shape my current self-image?",
  type: "text",
},
    {
  id: "q17-new-refs",
  prompt: "What new references will I add this month?",
  type: "text",
},
              {
            id: "q17-followed",
            prompt: "Did I create or seek a new empowering reference this week?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
followsCommitment: true,
          },
              {
            id: "q17-commitment",
            prompt: "What reference-building action will I take next?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
