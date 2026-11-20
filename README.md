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

## AI extraction

Uploads can use **OpenAI** for chapter summaries and action questions:

1. Bind `OPENAI_API_KEY` (optional `OPENAI_MODEL`, default `gpt-4o-mini`) in app Secrets — every signed-in user then gets AI extract.
2. Or a visitor pastes their own OpenAI key on the upload form for that request only (never stored).

Without a key, uploads fall back to local heuristic extract. Private/Team apps still require Cursor sign-in; people without Cursor need an account (or an invite) to open the app.

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
