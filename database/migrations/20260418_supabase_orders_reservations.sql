-- Chez Amis: Orders and reservations persistence tables
-- Applied via Supabase MCP on project: tgrcucpqxpldntqulhsh

create table if not exists public.restaurant_orders (
  id uuid primary key default gen_random_uuid(),
  order_id text not null unique,
  order_type text not null check (order_type in ('dine-in', 'takeaway', 'delivery')),
  status text not null default 'pending' check (status in ('pending', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled')),
  customer jsonb not null,
  items jsonb not null,
  order_details jsonb not null default '{}'::jsonb,
  payment jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.restaurant_reservations (
  id uuid primary key default gen_random_uuid(),
  reservation_number text not null unique,
  status text not null default 'confirmed' check (status in ('confirmed', 'seated', 'completed', 'cancelled', 'no-show')),
  customer jsonb not null,
  date date not null,
  time text not null,
  guests integer not null check (guests > 0),
  seating_preference text,
  occasion text,
  special_requests text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_restaurant_orders_created_at on public.restaurant_orders (created_at desc);
create index if not exists idx_restaurant_orders_status on public.restaurant_orders (status);
create index if not exists idx_restaurant_reservations_date on public.restaurant_reservations (date);
create index if not exists idx_restaurant_reservations_created_at on public.restaurant_reservations (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_restaurant_orders_updated_at on public.restaurant_orders;
create trigger trg_restaurant_orders_updated_at
before update on public.restaurant_orders
for each row
execute function public.set_updated_at();

drop trigger if exists trg_restaurant_reservations_updated_at on public.restaurant_reservations;
create trigger trg_restaurant_reservations_updated_at
before update on public.restaurant_reservations
for each row
execute function public.set_updated_at();

alter table public.restaurant_orders enable row level security;
alter table public.restaurant_reservations enable row level security;
