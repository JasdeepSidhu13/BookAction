create table if not exists user_books (
  id text primary key,
  owner_sub text not null,
  title text not null,
  author text not null default 'Unknown',
  cover_accent text not null default '#2F6F6A',
  source_filename text,
  source_bytes integer,
  status text not null default 'ready'
    check (status in ('processing', 'ready', 'failed')),
  error_message text,
  generation_mode text not null default 'heuristic'
    check (generation_mode in ('heuristic', 'llm')),
  chapter_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists user_books_owner_idx
  on user_books (owner_sub, created_at desc);

create table if not exists user_chapters (
  id bigserial primary key,
  book_id text not null references user_books (id) on delete cascade,
  owner_sub text not null,
  chapter_id text not null,
  number integer not null,
  title text not null,
  short_title text not null,
  part text not null default '',
  teaser text not null default '',
  read_minutes integer not null default 8,
  summary_json jsonb not null default '[]'::jsonb,
  questions_json jsonb not null default '[]'::jsonb,
  bank_questions_json jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (book_id, chapter_id)
);

create index if not exists user_chapters_owner_book_idx
  on user_chapters (owner_sub, book_id, number);
