'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'

import { updateTaskStatus } from '@/actions/tasks'
import { KanbanColumn } from '@/components/kanban-column'
import { TaskCard } from '@/components/task-card'
import { KANBAN_COLUMNS, Task, TaskStatus } from '@/types/tasks'

type KanbanBoardProps = {
  initialTasks: Task[]
}

export function KanbanBoard({ initialTasks }: KanbanBoardProps) {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((item) => item.id === String(event.active.id)) ?? null
    setActiveTask(task)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    setActiveTask(null)

    if (!over) return

    const currentTask = tasks.find((item) => item.id === String(active.id))
    if (!currentTask) return

    const VALID_STATUSES = ['todo', 'in_progress', 'done'] as const
    const overId = String(over.id)

    let newStatus: TaskStatus | null = null

    if (VALID_STATUSES.includes(overId as TaskStatus)) {
      newStatus = overId as TaskStatus
    } else {
      const targetTask = tasks.find((item) => item.id === overId)
      newStatus = targetTask?.status ?? null
    }

    if (!newStatus || currentTask.status === newStatus) return

    const previousTasks = [...tasks]

    const updatedTasks = tasks.map((item) =>
      item.id === currentTask.id ? { ...item, status: newStatus } : item
    )

    setTasks(updatedTasks)

    try {
      await updateTaskStatus(currentTask.id, newStatus)
    } catch {
      setTasks(previousTasks)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-[#0f0f1a] text-white">
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          <header className="mb-6 flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              TaskFlow AI
            </h1>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => router.push('/tasks/new')}
                className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
              >
                + Nueva Tarea
              </button>

              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300">
                user@email.com
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {KANBAN_COLUMNS.map((column) => (
              <KanbanColumn
                key={column.id}
                id={column.id}
                label={column.label}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rotate-3 shadow-2xl">
            <TaskCard task={activeTask} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}