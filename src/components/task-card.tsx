import { Check, GripVertical } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { PRIORITY_CONFIG, Task } from '@/types/tasks'

type TaskCardProps = {
  task: Task
  isDragging?: boolean
}

export function TaskCard({
  task,
  isDragging = false,
}: TaskCardProps) {
  const priorityConfig = PRIORITY_CONFIG[task.priority]

  return (
    <div
      className={cn(
        'cursor-grab active:cursor-grabbing rounded-lg border border-white/5 bg-white/5 p-3',
        isDragging && 'rotate-2 scale-105 opacity-50 shadow-xl'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-white">{task.title}</h3>
            {task.status === 'done' && (
              <Check className="h-4 w-4 shrink-0 text-neutral-400" />
            )}
          </div>

          <Badge className={cn(priorityConfig.className)}>
            {priorityConfig.label}
          </Badge>

          {task.description && (
            <p className="line-clamp-2 text-xs text-neutral-400">
              {task.description}
            </p>
          )}
        </div>

        <GripVertical className="h-4 w-4 shrink-0 text-neutral-500" />
      </div>
    </div>
  )
}