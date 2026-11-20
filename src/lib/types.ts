export type Cadence = "weekly" | "monthly" | "quarterly";
export type QuestionType = "scale" | "text" | "choice";
export type ChapterStatus = "not_started" | "in_progress" | "completed";

export type SummaryBlock =
  | { type: "bigIdea"; text: string }
  | { type: "toc"; items: { id: string; label: string; color: string }[] }
  | {
      type: "keyIdeas";
      id: string;
      title: string;
      accent: string;
      ideas: { title: string; body: string }[];
    }
  | {
      type: "cards";
      id: string;
      title: string;
      accent: string;
      tone: "teal" | "rose" | "amber" | "green";
      items: { title: string; body: string; icon?: "focus" | "meaning" | "action" | "warn" }[];
    }
  | { type: "insight"; id: string; text: string }
  | { type: "apply"; id: string; title: string; accent: string; items: string[] };

export type Question = {
  id: string;
  prompt: string;
  type: QuestionType;
  help?: string;
  choices?: string[];
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
  tracksCommitment?: boolean;
  followsCommitment?: boolean;
};

/** Full chapter question bank (catalog) — beyond the recurring check-in set. */
export type BankQuestion = {
  id: string;
  prompt: string;
  section?: string;
  type?: "text" | "scale";
};

export type Chapter = {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  part: string;
  teaser: string;
  readMinutes: number;
  summary: SummaryBlock[];
  /** Curated recurring check-in questions (usually 5). */
  questions: Question[];
  /** Full Notion/action question set for the chapter. */
  bankQuestions: BankQuestion[];
};

export type BankAnswerRow = {
  id: number;
  owner_sub: string;
  book_id: string;
  chapter_id: string;
  question_id: string | null;
  question_text: string;
  answer_text: string | null;
  value_number: number | null;
  source: "catalog" | "custom";
  created_at: string;
  updated_at: string;
};

export type CustomQuestionRow = {
  id: number;
  owner_sub: string;
  book_id: string;
  chapter_id: string;
  prompt: string;
  created_at: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  coverAccent: string;
  totalChaptersHint?: number;
  /** Optional edition badge (e.g. Essentials vs Complete for Atomic Habits). */
  editionLabel?: string;
  /** Sibling edition for version switching. */
  alternateEdition?: { bookId: string; label: string };
  chapters: Chapter[];
};

export type AnswerMap = Record<
  string,
  { valueNumber?: number | null; valueText?: string | null; valueChoice?: string | null }
>;

export type CheckInRow = {
  id: number;
  owner_sub: string;
  book_id: string;
  chapter_id: string;
  cadence: Cadence;
  status: "draft" | "submitted";
  check_in_number: number;
  /** User-set finish-by date for this check-in period (for cadence comparisons). */
  deadline_at: string | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ChapterSettings = {
  cadence: Cadence;
  status: string;
  next_deadline_at: string | null;
};

export type AnswerRow = {
  id: number;
  check_in_id: number;
  question_id: string;
  value_number: number | null;
  value_text: string | null;
  value_choice: string | null;
};

export type CommitmentRow = {
  id: number;
  owner_sub: string;
  book_id: string;
  chapter_id: string;
  check_in_id: number | null;
  text: string;
  status: "open" | "done";
  due_at: string | null;
  completed_at: string | null;
  created_at: string;
};
