# Chapterwise

Turn books into chapter summaries and recurring action check-ins. Track weekly, monthly, or quarterly answers with a clean progress dashboard.

## Screens

- **Library** — continue reading, due check-ins, growth stats
- **Chapter summary** — structured key ideas, insights, apply lists
- **Action check-in** — scale / text / choice questions with autosave
- **Progress** — growth index, follow-through, insights, question-level changes

## First book

*Awaken the Giant Within* (Part One, chapters 1–5) ships as seed content. Add another book by extending `src/content/books.ts` with the same chapter/question shape.

## Local development

```bash
npm install
npm run dev
```

Without `DATABASE_URL`, answers persist in an in-memory PGlite database for the process lifetime. Published apps get Postgres via `cursor-app.json`.

## Stack

Next.js App Router, Tailwind, Postgres (`pg` + PGlite fallback), Cursor app identity for per-viewer data.
