/** Shared input limits to avoid unbounded writes. */
export const LIMITS = {
  answerText: 4000,
  questionText: 1000,
  questionId: 120,
  customPrompt: 1000,
  maxAnswersPerCheckIn: 40,
  maxCustomQuestionsPerChapter: 50,
  maxBankAnswersPerChapter: 500,
  bookTitle: 200,
  bookAuthor: 120,
  uploadBytes: 12 * 1024 * 1024,
  uploadChars: 800_000,
  maxChapters: 40,
  chapterSourceChars: 12_000,
  uploadsPerHour: 10,
} as const;

export function clampText(value: string | null | undefined, max: number): string {
  const text = (value ?? "").trim();
  if (text.length <= max) return text;
  return text.slice(0, max);
}
