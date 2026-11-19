import type { Book } from "@/lib/types";

export const books: Book[] = [
  {
    id: "awaken-the-giant-within",
    title: "Awaken the Giant Within",
    author: "Tony Robbins",
    coverAccent: "#F5B947",
    totalChaptersHint: 21,
    chapters: [
      {
        id: "ch-1-dreams-of-destiny",
        number: 1,
        title: "Dreams of Destiny",
        shortTitle: "Dreams of Destiny",
        part: "Part one · Unleash your power",
        teaser:
          "Decide what you want, believe it is possible, and take massive action toward the life you intend to live.",
        readMinutes: 7,
        summary: [
          {
            type: "bigIdea",
            text: "You already have the resources to create lasting change. What is missing is a clear decision about the life you want — and the courage to pursue it with urgency.",
          },
          {
            type: "toc",
            items: [
              { id: "key", label: "Key ideas", color: "#3730A3" },
              { id: "steps", label: "The awakening path", color: "#155E75" },
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
                title: "You are the creator of your experience",
                body: "Your current life is the product of decisions and patterns — which means a different set of decisions can produce a different life.",
              },
              {
                title: "Desire without decision stays a dream",
                body: "Wanting change is not enough. A decision turns desire into a line you will not cross backward.",
              },
              {
                title: "Raise your standards",
                body: "Lasting change begins when what you tolerate becomes unacceptable — and what you expect of yourself rises.",
              },
              {
                title: "Massive action beats perfect plans",
                body: "Clarity grows through movement. Take imperfect action, learn quickly, and adjust.",
              },
            ],
          },
          {
            type: "cards",
            id: "steps",
            title: "The awakening path",
            accent: "#155E75",
            tone: "teal",
            items: [
              {
                title: "Decide",
                body: "Name the outcome you will no longer postpone.",
                icon: "focus",
              },
              {
                title: "Believe",
                body: "Adopt the identity of someone who can create it.",
                icon: "meaning",
              },
              {
                title: "Act",
                body: "Take one concrete step that proves the decision is real.",
                icon: "action",
              },
            ],
          },
          {
            type: "insight",
            id: "insight",
            text: "Your destiny is shaped less by talent than by the standards you refuse to violate.",
          },
          {
            type: "apply",
            id: "apply",
            title: "Apply it",
            accent: "#166534",
            items: [
              "Write a one-sentence vision for the next 12 months.",
              "List three standards you will raise this week.",
              "Choose one deferred dream and schedule a first action within 24 hours.",
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
                title: "Waiting to feel ready",
                body: "Readiness often arrives after you begin, not before.",
                icon: "warn",
              },
              {
                title: "Confusing inspiration with change",
                body: "Insight without follow-through becomes entertainment.",
                icon: "warn",
              },
            ],
          },
        ],
        questions: [
          {
            id: "q1-vision-clarity",
            prompt: "How clear is my long-term vision right now?",
            type: "scale",
            help: "Scale · 1 = vague wish, 10 = vivid and specific",
            scaleMinLabel: "Vague",
            scaleMaxLabel: "Crystal clear",
          },
          {
            id: "q1-standards",
            prompt: "What standard am I ready to raise this week?",
            type: "text",
          },
          {
            id: "q1-urgency",
            prompt: "How urgently am I pursuing what matters most?",
            type: "scale",
            help: "Scale · 1 = someday, 10 = unavoidable priority",
          },
          {
            id: "q1-followed-through",
            prompt: "Did I take action on last week's commitment within 24 hours?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
            followsCommitment: true,
          },
          {
            id: "q1-commitment",
            prompt: "What am I committing to now, and what is my first action?",
            type: "text",
            tracksCommitment: true,
          },
        ],
      },
      {
        id: "ch-2-decisions",
        number: 2,
        title: "Decisions: The Pathway to Power",
        shortTitle: "Decisions",
        part: "Part one · Unleash your power",
        teaser:
          "Why every result in your life traces back to a decision — and the three decisions you make every moment.",
        readMinutes: 8,
        summary: [
          {
            type: "bigIdea",
            text: "Your life is shaped less by your circumstances than by your decisions. A real decision means committing to a result and cutting off every other option.",
          },
          {
            type: "toc",
            items: [
              { id: "key", label: "Key ideas", color: "#3730A3" },
              { id: "three", label: "The three decisions", color: "#155E75" },
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
                title: "Decisions, not conditions, determine destiny",
                body: "Two people in the same situation end up in very different places because of what they decide to do about it.",
              },
              {
                title: "A true decision cuts off alternatives",
                body: "\"I'd like to\" is a preference. A decision is a commitment with no back door.",
              },
              {
                title: "Decide more often",
                body: "Deciding is a muscle. The more decisions you make, the better you get at making them.",
              },
              {
                title: "Stay committed to the goal, flexible on the approach",
                body: "Hold the outcome steady and change tactics whenever something isn't working.",
              },
            ],
          },
          {
            type: "cards",
            id: "three",
            title: "The three decisions you make every moment",
            accent: "#155E75",
            tone: "teal",
            items: [
              {
                title: "What to focus on",
                body: "Where you put your attention decides what you notice, and what you feel.",
                icon: "focus",
              },
              {
                title: "What it means",
                body: "The meaning you give an event shapes how you respond to it.",
                icon: "meaning",
              },
              {
                title: "What to do",
                body: "The action you take turns focus and meaning into results.",
                icon: "action",
              },
            ],
          },
          {
            type: "insight",
            id: "insight",
            text: "Not deciding is also a decision — one that hands your direction to circumstance.",
          },
          {
            type: "apply",
            id: "apply",
            title: "Apply it",
            accent: "#166534",
            items: [
              "Write down two decisions you've been putting off.",
              "For each one, take a first action within 24 hours.",
              "Each evening, note one decision you made and what it taught you.",
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
                title: "Waiting for certainty",
                body: "You will rarely have all the information. Decide, then adjust.",
                icon: "warn",
              },
              {
                title: "Keeping a back door",
                body: "An escape route turns a decision back into a wish.",
                icon: "warn",
              },
            ],
          },
        ],
        questions: [
          {
            id: "q2-decide-consistently",
            prompt: "How consistently am I making decisions instead of putting them off?",
            type: "scale",
            help: "Scale · 1 = constantly deferring, 10 = deciding quickly and clearly",
          },
          {
            id: "q2-deferred-cost",
            prompt: "What is one decision I've been putting off, and what is it costing me?",
            type: "text",
          },
          {
            id: "q2-focus-deliberate",
            prompt: "How deliberately did I choose what to focus on this week?",
            type: "scale",
            help: "Scale · 1 = reacting all week, 10 = fully intentional",
          },
          {
            id: "q2-followed-through",
            prompt: "Did I take action within 24 hours on the decision I committed to last time?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
            followsCommitment: true,
          },
          {
            id: "q2-commitment",
            prompt: "What decision am I committing to now, and what is my first action?",
            type: "text",
            tracksCommitment: true,
          },
        ],
      },
      {
        id: "ch-3-force-that-shapes",
        number: 3,
        title: "The Force That Shapes Your Life",
        shortTitle: "The Force That Shapes Your Life",
        part: "Part one · Unleash your power",
        teaser:
          "Pain and pleasure drive every choice you make — learn to link them deliberately to the habits you want.",
        readMinutes: 9,
        summary: [
          {
            type: "bigIdea",
            text: "Everything you do is an attempt to avoid pain or gain pleasure. Master those associations and you master change.",
          },
          {
            type: "toc",
            items: [
              { id: "key", label: "Key ideas", color: "#3730A3" },
              { id: "leverage", label: "Create leverage", color: "#155E75" },
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
                title: "Pain and pleasure are the twin forces",
                body: "If a behavior persists, somewhere it is still linked to pleasure — or the alternative feels more painful.",
              },
              {
                title: "We act on what we expect, not what is true",
                body: "Your brain moves toward anticipated pleasure and away from anticipated pain, even when those forecasts are wrong.",
              },
              {
                title: "Change requires emotional leverage",
                body: "Logic rarely overrides a strong emotional association. You need enough pain linked to the old pattern, and enough pleasure linked to the new one.",
              },
              {
                title: "Rewire associations on purpose",
                body: "Consciously attach pain to habits you want to leave and pleasure to habits you want to keep.",
              },
            ],
          },
          {
            type: "cards",
            id: "leverage",
            title: "Create leverage",
            accent: "#155E75",
            tone: "teal",
            items: [
              {
                title: "Raise the cost of staying the same",
                body: "List what the old pattern is already costing you in energy, relationships, and self-respect.",
                icon: "focus",
              },
              {
                title: "Make the new path rewarding",
                body: "Define immediate, felt rewards for acting in the new way — not only distant outcomes.",
                icon: "meaning",
              },
              {
                title: "Interrupt the pattern",
                body: "When the old urge appears, break state and replace it with a rehearsed alternative.",
                icon: "action",
              },
            ],
          },
          {
            type: "insight",
            id: "insight",
            text: "If you do not consciously link pain and pleasure, your past will keep deciding for you.",
          },
          {
            type: "apply",
            id: "apply",
            title: "Apply it",
            accent: "#166534",
            items: [
              "Pick one habit you want to change and write 10 pains of keeping it.",
              "Write 10 pleasures of replacing it.",
              "Design one interruption you will use the next time the urge hits.",
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
                title: "Relying on willpower alone",
                body: "Willpower fades. Associations persist.",
                icon: "warn",
              },
              {
                title: "Underestimating short-term pain",
                body: "If the new habit hurts now and the old one feels good now, the old one wins.",
                icon: "warn",
              },
            ],
          },
        ],
        questions: [
          {
            id: "q3-pain-link",
            prompt: "How strongly have I linked pain to the habits I want to leave behind?",
            type: "scale",
            help: "Scale · 1 = still feel rewarding, 10 = clearly costly",
          },
          {
            id: "q3-habit-cost",
            prompt: "Which habit is costing me most right now, and what pleasure still keeps it alive?",
            type: "text",
          },
          {
            id: "q3-pleasure-link",
            prompt: "How rewarding does my replacement habit feel in the moment?",
            type: "scale",
            help: "Scale · 1 = pure grind, 10 = immediately reinforcing",
          },
          {
            id: "q3-followed-through",
            prompt: "Did I interrupt the old pattern when it showed up this period?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
            followsCommitment: true,
          },
          {
            id: "q3-commitment",
            prompt: "What association will I rewire now, and what is my first practice?",
            type: "text",
            tracksCommitment: true,
          },
        ],
      },
      {
        id: "ch-4-belief-systems",
        number: 4,
        title: "Belief Systems",
        shortTitle: "Belief Systems",
        part: "Part one · Unleash your power",
        teaser:
          "Beliefs are the invisible rules that govern what you attempt — change the belief and the available actions expand.",
        readMinutes: 8,
        summary: [
          {
            type: "bigIdea",
            text: "Beliefs are not just thoughts — they are feelings of certainty that shape what you notice, attempt, and sustain.",
          },
          {
            type: "toc",
            items: [
              { id: "key", label: "Key ideas", color: "#3730A3" },
              { id: "shift", label: "Shift a belief", color: "#155E75" },
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
                title: "Beliefs filter reality",
                body: "You do not see the world as it is; you see it through what you already believe is possible.",
              },
              {
                title: "Global beliefs create global results",
                body: "A belief about who you are affects every domain. Small belief upgrades can unlock large behavior changes.",
              },
              {
                title: "Beliefs can be chosen",
                body: "You can question old references, gather new evidence, and install beliefs that serve the life you want.",
              },
              {
                title: "Certainty is trainable",
                body: "Repeating empowering references — experiences, models, and language — builds the feeling of certainty.",
              },
            ],
          },
          {
            type: "cards",
            id: "shift",
            title: "Shift a belief",
            accent: "#155E75",
            tone: "teal",
            items: [
              {
                title: "Surface it",
                body: "Name the limiting belief in plain language.",
                icon: "focus",
              },
              {
                title: "Doubt it",
                body: "Find counter-examples and ask what it has cost you.",
                icon: "meaning",
              },
              {
                title: "Replace it",
                body: "Write an empowering alternative and gather proof daily.",
                icon: "action",
              },
            ],
          },
          {
            type: "insight",
            id: "insight",
            text: "If your beliefs stay the same, your results eventually return to the same ceiling.",
          },
          {
            type: "apply",
            id: "apply",
            title: "Apply it",
            accent: "#166534",
            items: [
              "Write one limiting belief that has shaped a current struggle.",
              "List three pieces of evidence against it.",
              "Craft a replacement belief and one action that proves it today.",
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
                title: "Treating beliefs as facts",
                body: "A long-held story can feel true without being useful.",
                icon: "warn",
              },
              {
                title: "Affirmations without references",
                body: "Empty slogans do not stick. Build evidence.",
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
            prompt: "What limiting belief showed up most this week?",
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
            prompt: "Which belief will I reinforce now, and how will I prove it?",
            type: "text",
            tracksCommitment: true,
          },
        ],
      },
      {
        id: "ch-5-change-in-an-instant",
        number: 5,
        title: "Can Change Happen in an Instant?",
        shortTitle: "Change in an Instant",
        part: "Part one · Unleash your power",
        teaser:
          "Change does not have to take years. When neuro-associations shift, behavior can transform immediately — and then be reinforced.",
        readMinutes: 7,
        summary: [
          {
            type: "bigIdea",
            text: "Change can be instantaneous when you change the meaning and emotional charge linked to a behavior — then condition the new pattern until it sticks.",
          },
          {
            type: "toc",
            items: [
              { id: "key", label: "Key ideas", color: "#3730A3" },
              { id: "nac", label: "The change pattern", color: "#155E75" },
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
                title: "Delay is often a story, not a law",
                body: "Many people believe change must be slow. That belief itself slows change.",
              },
              {
                title: "A decisive emotional shift can rewrite a pattern",
                body: "When pain and pleasure reverse quickly, behavior often follows just as quickly.",
              },
              {
                title: "Conditioning makes change permanent",
                body: "Instant insight fades without rehearsal. Repetition turns a new choice into a default.",
              },
              {
                title: "Identity locks it in",
                body: "When you become the kind of person who does the new thing, maintenance gets easier.",
              },
            ],
          },
          {
            type: "cards",
            id: "nac",
            title: "The change pattern",
            accent: "#155E75",
            tone: "teal",
            items: [
              {
                title: "Decide",
                body: "Get clear that the old pattern is over.",
                icon: "focus",
              },
              {
                title: "Interrupt",
                body: "Break the familiar sequence before it completes.",
                icon: "meaning",
              },
              {
                title: "Condition",
                body: "Rehearse the new response until it feels natural.",
                icon: "action",
              },
            ],
          },
          {
            type: "insight",
            id: "insight",
            text: "The moment you truly decide — emotionally, not just intellectually — change can begin immediately.",
          },
          {
            type: "apply",
            id: "apply",
            title: "Apply it",
            accent: "#166534",
            items: [
              "Choose one pattern you are ready to end today.",
              "Design a pattern interrupt you can use in under 10 seconds.",
              "Practice the new response three times before the day ends.",
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
                title: "One-and-done thinking",
                body: "A breakthrough still needs reinforcement.",
                icon: "warn",
              },
              {
                title: "Waiting for a dramatic catalyst",
                body: "You can create leverage without a crisis.",
                icon: "warn",
              },
            ],
          },
        ],
        questions: [
          {
            id: "q5-change-belief",
            prompt: "How strongly do I believe I can change a pattern quickly?",
            type: "scale",
            help: "Scale · 1 = change must be slow, 10 = change can be immediate",
          },
          {
            id: "q5-pattern",
            prompt: "Which pattern am I ready to interrupt starting now?",
            type: "text",
          },
          {
            id: "q5-conditioning",
            prompt: "How consistently did I rehearse my new response?",
            type: "scale",
            help: "Scale · 1 = not at all, 10 = daily practice",
          },
          {
            id: "q5-followed-through",
            prompt: "Did I use my pattern interrupt when the old urge appeared?",
            type: "choice",
            choices: ["Yes", "Partly", "No"],
            followsCommitment: true,
          },
          {
            id: "q5-commitment",
            prompt: "What new response will I condition this period?",
            type: "text",
            tracksCommitment: true,
          },
        ],
      },
    ],
  },
];

export function getBook(bookId: string): Book | undefined {
  return books.find((b) => b.id === bookId);
}

export function getChapter(bookId: string, chapterId: string) {
  const book = getBook(bookId);
  if (!book) return undefined;
  const chapter = book.chapters.find((c) => c.id === chapterId);
  if (!chapter) return undefined;
  return { book, chapter };
}

export function getDefaultBook(): Book {
  return books[0];
}
