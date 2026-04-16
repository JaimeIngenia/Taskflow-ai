import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { KANBAN_COLUMNS, Task, TaskStatus } from '@/types/tasks'
import { TaskCard } from '@/components/task-card'

type KanbanBoardStaticProps = {
  tasks: Task[]
}

export function KanbanBoardStatic({
  tasks,
}: KanbanBoardStaticProps) {
  const getTasksByStatus = (status: TaskStatus) =>
    tasks
      .filter((task) => task.status === status)
      .sort((a, b) => a.position - b.position)

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              TaskFlow AI
            </h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button className="bg-green-500 text-white hover:bg-green-600">
              + Nueva Tarea
            </Button>

            <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300">
              user@email.com
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {KANBAN_COLUMNS.map((column) => {
            const columnTasks = getTasksByStatus(column.id)

            return (
              <section
                key={column.id}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold text-white">
                      {column.label}
                    </h2>
                    <Badge className="rounded-full border-0 bg-white/10 px-2 py-0.5 text-xs text-neutral-300 hover:bg-white/10">
                      {columnTasks.length}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}