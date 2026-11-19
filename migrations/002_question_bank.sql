create table if not exists custom_questions (
  id bigserial primary key,
  owner_sub text not null,
  book_id text not null,
  chapter_id text not null,
  prompt text not null,
  created_at timestamptz not null default now()
);

create index if not exists custom_questions_owner_chapter_idx
  on custom_questions (owner_sub, book_id, chapter_id, created_at desc);

create table if not exists question_bank_answers (
  id bigserial primary key,
  owner_sub text not null,
  book_id text not null,
  chapter_id text not null,
  question_id text,
  question_text text not null,
  answer_text text,
  value_number integer,
  source text not null default 'catalog' check (source in ('catalog', 'custom')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists question_bank_answers_owner_chapter_idx
  on question_bank_answers (owner_sub, book_id, chapter_id, updated_at desc);

create index if not exists question_bank_answers_owner_question_idx
  on question_bank_answers (owner_sub, book_id, chapter_id, question_id, updated_at desc);
