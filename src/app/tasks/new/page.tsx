import Link from 'next/link'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'

export default async function NewTaskPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  async function createTask(formData: FormData) {
    'use server'

    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect('/login')
    }

    const title = String(formData.get('title') ?? '').trim()
    const description = String(formData.get('description') ?? '').trim()
    const priority = String(formData.get('priority') ?? 'medium').trim()
    const status = 'todo'

    if (!title) {
      throw new Error('Title is required')
    }

    const validPriorities = ['low', 'medium', 'high', 'critical']
    if (!validPriorities.includes(priority)) {
      throw new Error('Invalid priority')
    }

    const { data: lastTask } = await supabase
      .from('tasks')
      .select('position')
      .eq('user_id', user.id)
      .order('position', { ascending: false })
      .limit(1)
      .maybeSingle()

    const nextPosition =
      typeof lastTask?.position === 'number' ? lastTask.position + 1 : 0

    const { error } = await supabase.from('tasks').insert({
      user_id: user.id,
      title,
      description: description || null,
      priority,
      status,
      position: nextPosition,
    })

    if (error) {
      throw new Error(error.message)
    }

    revalidatePath('/dashboard')
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Nueva tarea
            </h1>
            <p className="mt-2 text-sm text-neutral-400">
              Crea una nueva tarea para tu tablero Kanban.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            Volver
          </Link>
        </header>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
          <form action={createTask} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-neutral-200"
              >
                Título
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Ej: Demo MCP en vivo"
                className="w-full rounded-lg border border-white/10 bg-[#141424] px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-neutral-500 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-neutral-200"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Opcional"
                className="w-full rounded-lg border border-white/10 bg-[#141424] px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-neutral-200"
              >
                Prioridad
              </label>
              <select
                id="priority"
                name="priority"
                defaultValue="medium"
                className="w-full rounded-lg border border-white/10 bg-[#141424] px-4 py-3 text-sm text-white outline-none focus:border-green-500"
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
                <option value="critical">critical</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="rounded-md bg-green-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-green-600"
              >
                Crear tarea
              </button>

              <Link
                href="/dashboard"
                className="rounded-md border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}