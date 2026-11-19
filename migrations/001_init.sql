create table if not exists chapter_settings (
  id bigserial primary key,
  owner_sub text not null,
  book_id text not null,
  chapter_id text not null,
  cadence text not null default 'weekly' check (cadence in ('weekly', 'monthly', 'quarterly')),
  status text not null default 'in_progress' check (status in ('not_started', 'in_progress', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_sub, book_id, chapter_id)
);

create table if not exists check_ins (
  id bigserial primary key,
  owner_sub text not null,
  book_id text not null,
  chapter_id text not null,
  cadence text not null check (cadence in ('weekly', 'monthly', 'quarterly')),
  status text not null default 'draft' check (status in ('draft', 'submitted')),
  check_in_number integer not null default 1,
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists check_ins_owner_chapter_idx
  on check_ins (owner_sub, book_id, chapter_id, created_at desc);

create table if not exists answers (
  id bigserial primary key,
  check_in_id bigint not null references check_ins (id) on delete cascade,
  question_id text not null,
  value_number integer,
  value_text text,
  value_choice text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (check_in_id, question_id)
);

create table if not exists commitments (
  id bigserial primary key,
  owner_sub text not null,
  book_id text not null,
  chapter_id text not null,
  check_in_id bigint references check_ins (id) on delete set null,
  text text not null,
  status text not null default 'open' check (status in ('open', 'done')),
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists commitments_owner_status_idx
  on commitments (owner_sub, status, due_at);
