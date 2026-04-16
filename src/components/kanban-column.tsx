'use client'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'

import { SortableTaskCard } from '@/components/sortable-task-card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Task, TaskStatus } from '@/types/tasks'

type KanbanColumnProps = {
  id: TaskStatus
  label: string
  tasks: Task[]
}

export function KanbanColumn({
  id,
  label,
  tasks,
}: KanbanColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'min-h-96 rounded-xl border p-4 transition-colors duration-200',
        isOver
          ? 'border-blue-500/50 bg-blue-500/5'
          : 'border-white/10 bg-white/5'
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-base font-semibold text-white">{label}</h2>

        <Badge className="rounded-full border-0 bg-white/10 px-2 py-0.5 text-xs text-neutral-300 hover:bg-white/10">
          {tasks.length}
        </Badge>
      </div>

      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <SortableTaskCard key={task.id} task={task} />
            ))
          ) : (
            <div className="flex min-h-72 items-center justify-center rounded-lg border border-dashed border-white/10 text-sm text-white/40">
              Suelta aquí
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}