-- Manual action deadlines for check-ins (calendar-picked) and historical comparison.
alter table chapter_settings
  add column if not exists next_deadline_at timestamptz;

alter table check_ins
  add column if not exists deadline_at timestamptz;

create index if not exists check_ins_owner_deadline_idx
  on check_ins (owner_sub, book_id, chapter_id, deadline_at);

create index if not exists chapter_settings_deadline_idx
  on chapter_settings (owner_sub, next_deadline_at);
