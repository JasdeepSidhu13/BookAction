import type { Chapter } from "@/lib/types";

export const ch18: Omit<Chapter, "bankQuestions"> = {
  id: "ch-18-identity",
  number: 18,
  title: "Identity: The Key to Expansion",
  shortTitle: "Identity",
  part: "Part two · Taking control",
  teaser:
    "Identity is the belief about who you are — expand it, and your behavior has room to grow.",
  readMinutes: 12,
  summary: [
    {
      type: "bigIdea",
      text: "Identity is the controlling belief that organizes your other beliefs. People act consistently with who they believe they are — so expanding identity is the key to expanding life.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "practice", label: "Expand who you are", color: "#155E75" },
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
          title: "Identity directs everything",
          body: "Shift identity and values, beliefs, and behaviors reorganize — as extreme examples of indoctrination show in reverse.",
        },
        {
          title: "\"I am\" statements are destiny seeds",
          body: "\"I'm not a morning person,\" \"I'm bad with money,\" \"I'm the reliable one\" become self-fulfilling scripts.",
        },
        {
          title: "Identity can be chosen",
          body: "You can consciously decide who you will be and build references that make it real.",
        },
        {
          title: "Expansion vs. protection",
          body: "Some identities protect you from risk and also imprison you. Growth requires a larger self-concept.",
        },
        {
          title: "Public identity reinforces private change",
          body: "Declaring and living the new identity — especially with action — locks it in.",
        },
      ],
    },
    {
      type: "cards",
      id: "practice",
      title: "Expand who you are",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Write current identity",
          body: "Complete: \"I am the kind of person who…\" across health, love, work, and contribution.",
          icon: "focus",
        },
        {
          title: "Design expanded identity",
          body: "Write the identity that would make your goals natural rather than forced.",
          icon: "meaning",
        },
        {
          title: "Prove it with action",
          body: "Take one identity-consistent action today that your old self would have postponed.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Lasting change rarely sticks as a behavior bolted onto an old identity. Become the person for whom the new behavior is obvious.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "List five limiting \"I am\" statements and rewrite each as an expanding identity.",
        "Choose one new identity sentence and repeat it with physiology twice daily.",
        "Collect three references this week that prove the new identity is already becoming true.",
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
          title: "Identity attached only to roles",
          body: "If you are only \"the VP\" or \"the parent,\" role loss can shatter you. Build identity deeper than a title.",
          icon: "warn",
        },
        {
          title: "Fake affirmations without action",
          body: "Words help; incongruent action destroys them. Align behavior quickly.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
  id: "q18-expansion",
  prompt: "How expansive is my current identity relative to the life I want?",
  type: "scale",
  help: "Scale · 1 = boxed in, 10 = room to grow",
},
    {
  id: "q18-old-new",
  prompt: "What old \"I am\" am I releasing — and what identity am I stepping into?",
  type: "text",
},
    {
  id: "q18-proof",
  prompt: "What actions this week proved the new identity?",
  type: "text",
},
              {
            id: "q18-followed",
            prompt: "Did I act from my expanded identity under pressure?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
followsCommitment: true,
          },
              {
            id: "q18-commitment",
            prompt: "What identity practice will I keep for the next 30 days?",
            type: "text",
tracksCommitment: true,
          },
  ],
};
