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
import { ch11 } from "./ch11";
import { ch12 } from "./ch12";
import { ch13 } from "./ch13";
import { ch14 } from "./ch14";
import { ch15 } from "./ch15";
import { ch16 } from "./ch16";
import { ch17 } from "./ch17";
import { ch18 } from "./ch18";
import { ch19 } from "./ch19";
import { ch20 } from "./ch20";
import { ch21 } from "./ch21";
import { ch22 } from "./ch22";
import { ch23 } from "./ch23";
import { ch24 } from "./ch24";
import { ch25 } from "./ch25";
import { ch26 } from "./ch26";

type ChapterSeed = Omit<Chapter, "bankQuestions">;

function withBank(chapter: ChapterSeed): Chapter {
  return {
    ...chapter,
    bankQuestions: bankByChapterId[chapter.id] ?? [],
  };
}

export const awakenTheGiantWithin: Book = {
  id: "awaken-the-giant-within",
  title: "Awaken the Giant Within",
  author: "Tony Robbins",
  coverAccent: "#F5B947",
  totalChaptersHint: 26,
  chapters: [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10, ch11, ch12, ch13, ch14, ch15, ch16, ch17, ch18, ch19, ch20, ch21, ch22, ch23, ch24, ch25, ch26].map((c) =>
    withBank(c as ChapterSeed),
  ),
};
