import type { Book, Chapter } from "@/lib/types";
import { bankByChapterId } from "./banks";
import { ch1 } from "./ch1";
import { ch2 } from "./ch2";
import { ch3 } from "./ch3";
import { ch4 } from "./ch4";
import { ch5 } from "./ch5";
import { ch6 } from "./ch6";
import { ch7 } from "./ch7";
import { ch8 } from "./ch8";
import { ch9 } from "./ch9";
import { ch10 } from "./ch10";

type ChapterSeed = Omit<Chapter, "bankQuestions">;

function withBank(chapter: ChapterSeed): Chapter {
  return {
    ...chapter,
    bankQuestions: bankByChapterId[chapter.id] ?? [],
  };
}

export const atomicHabits: Book = {
  id: "atomic-habits",
  title: "Atomic Habits",
  author: "James Clear",
  coverAccent: "#0F766E",
  totalChaptersHint: 10,
  editionLabel: "Essentials · 10 chapters",
  alternateEdition: {
    bookId: "atomic-habits-complete",
    label: "Complete · 20 chapters",
  },
  chapters: [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10].map((c) =>
    withBank(c as ChapterSeed),
  ),
};
