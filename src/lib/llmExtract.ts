import { LIMITS, clampText } from "@/lib/limits";
import type { RawChapter } from "@/lib/sectionSplit";
import type { BankQuestion, Chapter, SummaryBlock } from "@/lib/types";

const MAX_USER_KEY_LEN = 200;

/** True when the app owner bound OPENAI_API_KEY for everyone. */
export function serverHasOpenAiKey(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

/**
 * Resolve which key to use. Prefer the server secret; allow a per-request
 * visitor key so users without your Cursor-bound secret can still pay for AI.
 * Never log or persist the visitor key.
 */
export function resolveOpenAiKey(visitorKey?: string | null): string {
  const server = process.env.OPENAI_API_KEY?.trim() ?? "";
  if (server) return server;
  const visitor = (visitorKey ?? "").trim();
  if (!visitor) return "";
  if (visitor.length < 20 || visitor.length > MAX_USER_KEY_LEN) return "";
  if (!/^sk-[A-Za-z0-9_-]+/.test(visitor)) return "";
  return visitor;
}

export async function generateChaptersWithLlm(
  raw: RawChapter[],
  apiKey: string,
): Promise<Chapter[]> {
  const chapters: Chapter[] = [];
  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    const excerpt = ch.body.slice(0, LIMITS.chapterSourceChars);
    const prompt = `You create chapter study guides for a reading + action app.
Return ONLY valid JSON with this shape:
{
  "title": string,
  "shortTitle": string,
  "teaser": string,
  "bigIdea": string,
  "ideas": [{"title": string, "body": string}],
  "insight": string,
  "apply": [string, string, string],
  "bankQuestions": [string, ...],
  "checkInPrompts": {
     "scale1": string,
     "text1": string,
     "scale2": string,
     "commitment": string
  }
}
Rules:
- Stay faithful to THIS chapter's text; do not invent scenes or quotes
- 4-6 ideas max
- 6-12 bankQuestions that are reflective/actionable, second person
- No markdown, no commentary
Chapter ${ch.number} titled "${ch.title}":
"""
${excerpt}
"""`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You extract faithful chapter summaries and action questions from the provided text only. Prefer the author's language. Never invent citations.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });
    if (!res.ok) throw new Error(`llm_${res.status}`);
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content ?? "";
    const parsed = JSON.parse(content) as {
      title?: string;
      shortTitle?: string;
      teaser?: string;
      bigIdea?: string;
      ideas?: { title: string; body: string }[];
      insight?: string;
      apply?: string[];
      bankQuestions?: string[];
      checkInPrompts?: {
        scale1?: string;
        text1?: string;
        scale2?: string;
        commitment?: string;
      };
    };

    const title = clampText(parsed.title || ch.title, 120);
    const bank: BankQuestion[] = (parsed.bankQuestions ?? [])
      .map((q) => clampText(q, LIMITS.questionText))
      .filter(Boolean)
      .slice(0, 12)
      .map((promptText, qi) => ({
        id: `u${ch.number}-${qi + 1}`,
        prompt: promptText,
        section: qi < 4 ? "Reflection" : "Action",
        type: "text" as const,
      }));

    const ideas = (parsed.ideas ?? []).slice(0, 6).map((idea) => ({
      title: clampText(idea.title, 80),
      body: clampText(idea.body, 280),
    }));

    const summary: SummaryBlock[] = [
      {
        type: "bigIdea",
        text: clampText(parsed.bigIdea || excerpt.slice(0, 280), 400),
      },
      {
        type: "toc",
        items: [
          { id: "key", label: "Key ideas", color: "#3730A3" },
          { id: "insight", label: "Key insight", color: "#B45309" },
          { id: "apply", label: "Apply it", color: "#166534" },
        ],
      },
      {
        type: "keyIdeas",
        id: "key",
        title: "Key ideas",
        accent: "#3730A3",
        ideas: ideas.length
          ? ideas
          : [{ title: "Core takeaway", body: clampText(parsed.bigIdea || excerpt, 220) }],
      },
      {
        type: "insight",
        id: "insight",
        text: clampText(parsed.insight || parsed.bigIdea || excerpt.slice(0, 220), 320),
      },
      {
        type: "apply",
        id: "apply",
        title: "Apply it",
        accent: "#166534",
        items: (parsed.apply?.length ? parsed.apply : [
          "Write one sentence capturing this section’s main idea.",
          "Name where it shows up in your life this week.",
          "Take one small action within 24 hours.",
        ])
          .slice(0, 4)
          .map((s) => clampText(s, 240)),
      },
    ];

    const cp = parsed.checkInPrompts ?? {};
    const fallbackBank =
      bank.length > 0
        ? bank
        : [
            {
              id: `u${ch.number}-1`,
              prompt: "What is the core claim of this section for me?",
              section: "Reflection",
              type: "text" as const,
            },
          ];

    chapters.push({
      id: `ch-${ch.number}-${slugify(title)}`,
      number: ch.number,
      title,
      shortTitle: clampText(parsed.shortTitle || title, 28),
      part: `Part ${Math.ceil((i + 1) / 5)}`,
      teaser: clampText(parsed.teaser || parsed.bigIdea || "", 160),
      readMinutes: Math.min(
        20,
        Math.max(5, Math.round(excerpt.split(/\s+/).filter(Boolean).length / 200)),
      ),
      summary,
      questions: [
        {
          id: `uq${ch.number}-1`,
          prompt:
            clampText(cp.scale1, LIMITS.questionText) ||
            "How consistently did I practice this chapter’s main idea this week?",
          type: "scale",
          help: "Scale · 1 = not at all, 10 = fully",
        },
        {
          id: `uq${ch.number}-2`,
          prompt:
            clampText(cp.text1, LIMITS.questionText) ||
            fallbackBank[0]?.prompt ||
            "What insight mattered most?",
          type: "text",
        },
        {
          id: `uq${ch.number}-3`,
          prompt:
            clampText(cp.scale2, LIMITS.questionText) ||
            "How clear is my next action from this chapter?",
          type: "scale",
          help: "Scale · 1 = unclear, 10 = crystal clear",
        },
        {
          id: `uq${ch.number}-4`,
          prompt: "Did I take the first action I committed to last time?",
          type: "choice",
          choices: ["Yes", "Partly", "No"],
          followsCommitment: true,
        },
        {
          id: `uq${ch.number}-5`,
          prompt:
            clampText(cp.commitment, LIMITS.questionText) ||
            "What am I committing to now, and what is my first step?",
          type: "text",
          tracksCommitment: true,
        },
      ],
      bankQuestions: fallbackBank,
    });
  }

  return chapters;
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || "chapter"
  );
}
