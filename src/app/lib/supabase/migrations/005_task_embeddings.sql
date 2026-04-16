create table if not exists public.task_embeddings (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  embedding halfvec(1024) not null,
  created_at timestamptz not null default now()
);

alter table public.task_embeddings enable row level security;

create policy "Users can view own task embeddings"
on public.task_embeddings
for select
using ((select auth.uid()) = user_id);

create policy "Users can insert own task embeddings"
on public.task_embeddings
for insert
with check ((select auth.uid()) = user_id);

create policy "Users can delete own task embeddings"
on public.task_embeddings
for delete
using ((select auth.uid()) = user_id);

create index if not exists task_embeddings_embedding_hnsw_idx
on public.task_embeddings
using hnsw (embedding halfvec_cosine_ops);

create index if not exists task_embeddings_task_id_idx
on public.task_embeddings(task_id);

create index if not exists task_embeddings_user_id_idx
on public.task_embeddings(user_id);