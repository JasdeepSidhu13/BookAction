/** Shared input limits to avoid unbounded writes. */
export const LIMITS = {
  answerText: 8000,
  questionText: 2000,
  customPrompt: 1000,
  bookTitle: 200,
  bookAuthor: 120,
  uploadBytes: 12 * 1024 * 1024,
  uploadChars: 1_200_000,
  maxChapters: 40,
  chapterSourceChars: 14_000,
} as const;

export function clampText(value: string | null | undefined, max: number): string {
  const text = (value ?? "").trim();
  if (text.length <= max) return text;
  return text.slice(0, max);
}
