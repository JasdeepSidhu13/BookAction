import { NextResponse } from "next/server";
import { accessFromPerson, isAccessibleBookChapter } from "@/lib/library";
import {
  addCustomQuestion,
  listBankAnswers,
  listCustomQuestions,
  saveBankAnswer,
} from "@/lib/questionBank";
import { requireIdentity } from "../../../../cursor/identity";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const identity = await requireIdentity(request);
  if (identity instanceof Response) return identity;
  if (identity.kind === "key") {
    return NextResponse.json({ error: "person_required" }, { status: 403 });
  }

  const access = accessFromPerson(identity);
  const { searchParams } = new URL(request.url);
  const bookId = searchParams.get("bookId") ?? "";
  const chapterId = searchParams.get("chapterId") ?? "";
  if (!bookId) {
    return NextResponse.json({ error: "bookId_required" }, { status: 400 });
  }

  const answers = await listBankAnswers(
    identity.sub,
    bookId,
    chapterId || undefined,
  );
  const custom =
    chapterId && (await isAccessibleBookChapter(access, bookId, chapterId))
      ? await listCustomQuestions(identity.sub, bookId, chapterId)
      : [];

  return NextResponse.json(
    { answers, custom },
    { headers: { "cache-control": "private, no-store" } },
  );
}

export async function POST(request: Request) {
  const identity = await requireIdentity(request);
  if (identity instanceof Response) return identity;
  if (identity.kind === "key") {
    return NextResponse.json({ error: "person_required" }, { status: 403 });
  }

  const access = accessFromPerson(identity);
  const body = (await request.json()) as {
    action: "answer" | "add_question";
    bookId: string;
    chapterId: string;
    questionId?: string | null;
    questionText?: string;
    answerText?: string | null;
    valueNumber?: number | null;
    source?: "catalog" | "custom";
    prompt?: string;
  };

  if (!(await isAccessibleBookChapter(access, body.bookId, body.chapterId))) {
    return NextResponse.json({ error: "unknown_chapter" }, { status: 400 });
  }

  if (body.action === "add_question") {
    const row = await addCustomQuestion(
      access,
      body.bookId,
      body.chapterId,
      body.prompt ?? "",
    );
    return NextResponse.json(
      { question: row },
      { headers: { "cache-control": "private, no-store" } },
    );
  }

  const row = await saveBankAnswer({
    access,
    bookId: body.bookId,
    chapterId: body.chapterId,
    questionId: body.questionId,
    questionText: body.questionText ?? "",
    answerText: body.answerText,
    valueNumber: body.valueNumber,
    source: body.source ?? "catalog",
  });

  return NextResponse.json(
    { answer: row },
    { headers: { "cache-control": "private, no-store" } },
  );
}
