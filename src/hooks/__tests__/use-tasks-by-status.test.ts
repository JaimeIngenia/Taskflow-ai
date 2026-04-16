import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useTasksByStatus } from '@/hooks/use-tasks-by-status'
import type { Task } from '@/types/tasks'

describe('useTasksByStatus', () => {
  it('agrupa tareas por estado', () => {
    const tasks: Task[] = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Desc 1',
        status: 'todo',
        priority: 'high',
        position: 1,
        created_at: '2026-04-15T00:00:00.000Z',
        updated_at: '2026-04-15T00:00:00.000Z',
        due_date: '2026-04-20',
        user_id: 'u1',
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Desc 2',
        status: 'in_progress',
        priority: 'medium',
        position: 2,
        created_at: '2026-04-15T00:00:00.000Z',
        updated_at: '2026-04-15T00:00:00.000Z',
        due_date: '2026-04-21',
        user_id: 'u1',
      },
      {
        id: '3',
        title: 'Task 3',
        description: 'Desc 3',
        status: 'done',
        priority: 'low',
        position: 3,
        created_at: '2026-04-15T00:00:00.000Z',
        updated_at: '2026-04-15T00:00:00.000Z',
        due_date: '2026-04-22',
        user_id: 'u1',
      },
    ]

    const { result } = renderHook(() => useTasksByStatus(tasks))

    expect(result.current.todo).toHaveLength(1)
    expect(result.current.in_progress).toHaveLength(1)
    expect(result.current.done).toHaveLength(1)
  })

  it('devuelve arreglos vacíos si no hay tareas', () => {
    const { result } = renderHook(() => useTasksByStatus([]))

    expect(result.current.todo).toEqual([])
    expect(result.current.in_progress).toEqual([])
    expect(result.current.done).toEqual([])
  })
})