// import { redirect } from 'next/navigation'

// import { getTasks } from '@/actions/tasks'
// import { KanbanBoard } from '@/components/kanban-board'
// import { Button } from '@/components/ui/button'
// import { createClient } from '@/lib/supabase/server'

// export default async function DashboardPage() {
//   const supabase = await createClient()

//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   if (!user) {
//     redirect('/login')
//   }

//   const tasks = await getTasks()

//   return (
//     <div className="min-h-screen bg-[#0f0f1a] text-white">
//       <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
//         <header className="mb-6 flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
//           <h1 className="text-2xl font-bold text-white">TaskFlow AI</h1>

//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//             <Button className="bg-green-500 text-white hover:bg-green-600">
//               + Nueva Tarea
//             </Button>

//             <div className="text-sm text-neutral-400">{user.email}</div>
//           </div>
//         </header>

//         <KanbanBoard initialTasks={tasks} />
//       </div>
//     </div>
//   )
// }

import { redirect } from 'next/navigation'

import { getTasks } from '@/actions/tasks'
import { KanbanBoard } from '@/components/kanban-board'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const tasks = await getTasks()

  return <KanbanBoard initialTasks={tasks} />
}