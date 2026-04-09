create extension if not exists moddatetime schema extensions;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop trigger if exists handle_profiles_updated_at on public.profiles;

create trigger handle_profiles_updated_at
before update on public.profiles
for each row
execute function extensions.moddatetime(updated_at);