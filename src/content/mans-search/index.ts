import type { Book, Chapter } from "@/lib/types";
import { bankByChapterId } from "./banks";
import { ch1 } from "./ch1";
import { ch2 } from "./ch2";
import { ch3 } from "./ch3";
import { ch4 } from "./ch4";
import { ch5 } from "./ch5";
import { ch6 } from "./ch6";
import { ch7 } from "./ch7";

type ChapterSeed = Omit<Chapter, "bankQuestions">;

function withBank(chapter: ChapterSeed): Chapter {
  return {
    ...chapter,
    bankQuestions: bankByChapterId[chapter.id] ?? [],
  };
}

export const mansSearchForMeaning: Book = {
  id: "mans-search-for-meaning",
  title: "Man’s Search for Meaning",
  author: "Viktor E. Frankl",
  coverAccent: "#7C2D12",
  totalChaptersHint: 7,
  chapters: [ch1, ch2, ch3, ch4, ch5, ch6, ch7].map((c) =>
    withBank(c as ChapterSeed),
  ),
};
