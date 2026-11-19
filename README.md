# Chapterwise

Turn books into chapter summaries and recurring action check-ins. Track weekly, monthly, or quarterly answers with a clean progress dashboard.

## Screens

- **Library** — continue reading, due check-ins, growth stats
- **Chapter summary** — structured key ideas, insights, apply lists
- **Action check-in** — scale / text / choice questions with autosave
- **Progress** — growth index, follow-through, insights, question-level changes

## Auth and libraries

Publish Chapterwise as **Private** or **Team** so Cursor signs viewers in. Uploads and check-ins are keyed to that identity.

- The app owner keeps the built-in starter books (*Awaken the Giant Within* and *The Confidence Gap*).
- Everyone else starts with an empty library and uploads their own PDFs.

## Starter content

Starter books live in `src/content/books.ts`. Extend that catalog only for the owner; other users never see those titles until they upload.

## Local development

```bash
npm install
npm run dev
```

Without `DATABASE_URL`, answers persist in an in-memory PGlite database for the process lifetime. Published apps get Postgres via `cursor-app.json`.

## Stack

Next.js App Router, Tailwind, Postgres (`pg` + PGlite fallback), Cursor app identity for per-viewer data.
