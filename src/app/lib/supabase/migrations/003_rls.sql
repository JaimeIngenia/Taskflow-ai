drop policy if exists "profiles are publicly viewable" on public.profiles;
drop policy if exists "users can update own profile" on public.profiles;

drop policy if exists "users can view own tasks" on public.tasks;
drop policy if exists "users can insert own tasks" on public.tasks;
drop policy if exists "users can update own tasks" on public.tasks;
drop policy if exists "users can delete own tasks" on public.tasks;

create policy "profiles are publicly viewable"
on public.profiles
for select
to authenticated, anon
using (true);

create policy "users can update own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "users can view own tasks"
on public.tasks
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "users can insert own tasks"
on public.tasks
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "users can update own tasks"
on public.tasks
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "users can delete own tasks"
on public.tasks
for delete
to authenticated
using ((select auth.uid()) = user_id);