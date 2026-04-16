import { useMemo } from 'react'
import type { Task, TaskStatus } from '@/types/tasks'

type TasksByStatus = Record<TaskStatus, Task[]>

export function useTasksByStatus(tasks: Task[]): TasksByStatus {
  return useMemo(
    () => ({
      todo: tasks.filter((task) => task.status === 'todo'),
      in_progress: tasks.filter((task) => task.status === 'in_progress'),
      done: tasks.filter((task) => task.status === 'done'),
    }),
    [tasks]
  )
}