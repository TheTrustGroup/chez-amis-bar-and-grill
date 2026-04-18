-- Chez Amis: durable notification outbox

create table if not exists public.notification_outbox (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  channel text not null check (channel in ('email', 'sms')),
  status text not null default 'pending' check (status in ('pending', 'processing', 'sent', 'failed')),
  recipient text not null,
  payload jsonb not null,
  error_message text,
  attempts integer not null default 0,
  next_retry_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_notification_outbox_status_next_retry
  on public.notification_outbox (status, next_retry_at);

create index if not exists idx_notification_outbox_created_at
  on public.notification_outbox (created_at desc);

drop trigger if exists trg_notification_outbox_updated_at on public.notification_outbox;
create trigger trg_notification_outbox_updated_at
before update on public.notification_outbox
for each row
execute function public.set_updated_at();

alter table public.notification_outbox enable row level security;
