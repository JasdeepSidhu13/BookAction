import type { Chapter } from "@/lib/types";

export const ch6: Chapter = {
  id: "ch-6-neuro-associative-conditioning",
  number: 6,
  title: "How to Change Anything: Neuro-Associative Conditioning",
  shortTitle: "NAC · Change Anything",
  part: "Part one · Unleash your power",
  teaser:
    "Six steps to lasting change: decide, get leverage, interrupt, replace, condition, and test.",
  readMinutes: 14,
  summary: [
    {
      type: "bigIdea",
      text: "Even an unwanted habit serves a purpose in the moment. Lasting change means making the cost of continuing clear, interrupting the automatic response, and conditioning a replacement that meets the same need.",
    },
    {
      type: "toc",
      items: [
        { id: "key", label: "Six NAC steps", color: "#3730A3" },
        { id: "interrupt", label: "Pattern interrupt", color: "#155E75" },
        { id: "insight", label: "Key insight", color: "#B45309" },
        { id: "apply", label: "Apply it", color: "#166534" },
        { id: "watch", label: "Watch out for", color: "#BE123C" },
      ],
    },
    {
      type: "keyIdeas",
      id: "key",
      title: "The six steps of NAC",
      accent: "#3730A3",
      ideas: [
        {
          title: "1 · Decide what you really want",
          body: "Name the desired response when the trigger appears — and what keeps the old pattern in place.",
        },
        {
          title: "2 · Get leverage",
          body: "Associate massive pain to not changing now, and massive pleasure to changing now.",
        },
        {
          title: "3 · Interrupt the limiting pattern",
          body: "Break the sequence (stand up, change rooms, scramble the mental movie) so a new response is possible.",
        },
        {
          title: "4 · Create an empowering alternative",
          body: "Choose a replacement that delivers the benefit the old habit provided — with fewer costs.",
        },
        {
          title: "5 · Condition until consistent",
          body: "Rehearse, use it at the trigger, and reward immediately. Reinforcement makes it automatic.",
        },
        {
          title: "6 · Test it",
          body: "Future-pace a real trigger. Run an ecology check so the change fits your values and still meets your needs.",
        },
      ],
    },
    {
      type: "cards",
      id: "interrupt",
      title: "Pattern interrupt essentials",
      accent: "#155E75",
      tone: "teal",
      items: [
        {
          title: "Catch the sequence",
          body: "Notice the trigger early — before the old response completes.",
          icon: "focus",
        },
        {
          title: "Scramble the movie",
          body: "Replay the upsetting scene as a cartoon: reverse it, speed it up, add absurd sound.",
          icon: "meaning",
        },
        {
          title: "Install the replacement",
          body: "Practice the new behavior in the exact moment you would have used the old one.",
          icon: "action",
        },
      ],
    },
    {
      type: "insight",
      id: "insight",
      text: "Any pattern of emotion or behavior that is continually reinforced will become an automatic and conditioned response. Reward the right action immediately.",
    },
    {
      type: "apply",
      id: "apply",
      title: "Apply it",
      accent: "#166534",
      items: [
        "Pick one habit. Write: what I want instead, what the old pattern gives me, and what not changing will cost.",
        "Design a 10-second pattern interrupt and a replacement that meets the same need.",
        "Practice the replacement three times today and reward yourself immediately each time.",
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
          title: "Stopping without replacing",
          body: "Removing a habit without a better alternative leaves the need unmet — and the old pattern returns under stress.",
          icon: "warn",
        },
        {
          title: "Delayed rewards",
          body: "If reinforcement isn't immediate, the nervous system doesn't connect the new behavior to pleasure.",
          icon: "warn",
        },
      ],
    },
  ],
  questions: [
    {
      id: "q6-clarity",
      prompt: "How clear is the specific response I want instead of my old pattern?",
      type: "scale",
      help: "Scale · 1 = vague \"stop doing X\", 10 = precise replacement behavior",
    },
    {
      id: "q6-leverage",
      prompt: "What will this cost me if I don't change — and what will I gain if I do?",
      type: "text",
    },
    {
      id: "q6-interrupt",
      prompt: "How consistently did I interrupt the old pattern this period?",
      type: "scale",
      help: "Scale · 1 = never caught it, 10 = interrupted every time",
    },
    {
      id: "q6-followed-through",
      prompt: "Did I use and reward my replacement behavior when the trigger hit?",
      type: "choice",
      choices: ["Yes", "Partly", "No"],
      followsCommitment: true,
    },
    {
      id: "q6-commitment",
      prompt: "Which NAC step will I practice now, and what is my first action?",
      type: "text",
      tracksCommitment: true,
    },
  ],
};
