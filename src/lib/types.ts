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

export type Chapter = {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  part: string;
  teaser: string;
  readMinutes: number;
  summary: SummaryBlock[];
  questions: Question[];
};

export type Book = {
  id: string;
  title: string;
  author: string;
  coverAccent: string;
  totalChaptersHint?: number;
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
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
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
