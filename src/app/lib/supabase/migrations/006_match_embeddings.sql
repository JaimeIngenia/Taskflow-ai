create or replace function public.match_task_embeddings(
  query_embedding halfvec(1024),
  match_threshold float default 0.5,
  match_count int default 5
)
returns table (
  task_id uuid,
  content text,
  similarity float
)
language sql
security invoker
set search_path = public
as $$
  select
    te.task_id,
    te.content,
    1 - (te.embedding <=> query_embedding) as similarity
  from public.task_embeddings te
  where 1 - (te.embedding <=> query_embedding) > match_threshold
  order by te.embedding <=> query_embedding asc
  limit match_count;
$$;