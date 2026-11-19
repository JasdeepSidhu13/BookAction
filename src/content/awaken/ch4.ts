import type { Chapter } from "@/lib/types";

export const ch4: Chapter = {
  id: "ch-4-belief-systems",
  number: 4,
  title: "Belief Systems: The Power to Create and Destroy",
  shortTitle: "Belief Systems",
  part: "Part one · Unleash your power",
  teaser:
    "Beliefs are feelings of certainty that expand or destroy possibility — choose empowering ones and reinforce them.",
  readMinutes: 12,
  summary: [
    {
      type: "bigIdea",
      text: "It's never the events of our lives, but the meaning we attach to them, that shapes who we are and who we'll become. Beliefs have the power to create and the power to destroy.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Key ideas", color: "#3730A3" },
        { id: "helpless", label: "Learned helplessness", color: "#155E75" },
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
          title: "A belief is a feeling of certainty",
          body: "References are the \"legs\" under the tabletop of an idea. With enough emotional intensity, certainty can be created even before evidence exists.",
        },
        {
          title: "Global beliefs run everything",
          body: "Beliefs like \"Life is…\", \"I am…\", and \"People are…\" become commands to your nervous system.",
        },
        {
          title: "Empowering beats \"realistic\"",
          body: "Which belief is true matters less than which is most empowering. Great achievers create certainty where others see impossibility.",
        },
        {
          title: "The past does not equal the future",
          body: "Continuously pursuing a vision — even without all the details — is how leaders achieve what others call impossible.",
        },
        {
          title: "CANI! — constant never-ending improvement",
          body: "Small, believable improvements compound. Ask daily: What did I learn? Contribute? Enjoy?",
        },
      ],
    },
    {
      type: "cards",
      id: "helpless",
      title: "Three patterns that create learned helplessness",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Permanence",
          body: "Seeing a problem as forever. Achievers treat challenges as temporary.",
          icon: "focus",
        },
        {
          title: "Pervasiveness",
          body: "Letting one problem define your whole life. Keep challenges local.",
          icon: "meaning",
        },
        {
          title: "Personal",
          body: "Turning a failed approach into \"I am the problem.\" Change actions, not your entire identity.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Once accepted, beliefs become unquestionable commands to our nervous systems — and they have the power to expand or destroy the possibilities of our present and future.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "List empowering and disempowering beliefs for 10 minutes (including if–then beliefs).",
        "Circle your top 3 empowering beliefs and strengthen one with action today.",
        "Circle 2 limiting beliefs. Ask what they cost emotionally, relationally, physically, and financially — then write a replacement and gather proof.",
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
          title: "Treating beliefs as fixed facts",
          body: "Your brain filters for evidence that validates whatever you already believe.",
          icon: "warn",
        },
        {
          title: "Learned helplessness",
          body: "Permanence + pervasiveness + personalizing failure strips personal power.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q4-belief-awareness",
      prompt: "How aware am I of the beliefs driving my current results?",
      type: "scale",
      help: "Scale · 1 = running on autopilot, 10 = clearly named",
    },
    {
      id: "q4-limiting",
      prompt: "What limiting belief showed up most this week — and what is it costing me?",
      type: "text",
    },
    {
      id: "q4-empowering",
      prompt: "How strongly do I feel my empowering replacement belief?",
      type: "scale",
      help: "Scale · 1 = intellectual only, 10 = felt certainty",
    },
    {
      id: "q4-followed-through",
      prompt: "Did I collect proof for my new belief as I committed?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q4-commitment",
      prompt: "Which belief will I reinforce now, and how will I prove it this week?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
