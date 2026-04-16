import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getTasks, updateTaskStatus } from '@/actions/tasks'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('tasks actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getTasks devuelve [] si no hay usuario autenticado', async () => {
    vi.mocked(createClient).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: null },
        }),
      },
    } as any)

    const result = await getTasks()

    expect(result).toEqual([])
  })

  it('getTasks devuelve tareas del usuario ordenadas por posición', async () => {
    const mockOrder = vi.fn().mockResolvedValue({
      data: [
        {
          id: '1',
          title: 'Task 1',
          description: 'Desc 1',
          status: 'todo',
          priority: 'high',
          position: 1,
          created_at: '2026-04-15T00:00:00.000Z',
          user_id: 'user-1',
        },
      ],
      error: null,
    })

    const mockEq = vi.fn().mockReturnValue({
      order: mockOrder,
    })

    const mockSelect = vi.fn().mockReturnValue({
      eq: mockEq,
    })

    const mockFrom = vi.fn().mockReturnValue({
      select: mockSelect,
    })

    vi.mocked(createClient).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: 'user-1' } },
        }),
      },
      from: mockFrom,
    } as any)

    const result = await getTasks()

    expect(mockFrom).toHaveBeenCalledWith('tasks')
    expect(mockSelect).toHaveBeenCalledWith('*')
    expect(mockEq).toHaveBeenCalledWith('user_id', 'user-1')
    expect(mockOrder).toHaveBeenCalledWith('position')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Task 1')
  })

  it('getTasks lanza error si Supabase falla', async () => {
    const mockOrder = vi.fn().mockResolvedValue({
      data: null,
      error: { message: 'Error consultando tareas' },
    })

    const mockEq = vi.fn().mockReturnValue({
      order: mockOrder,
    })

    const mockSelect = vi.fn().mockReturnValue({
      eq: mockEq,
    })

    const mockFrom = vi.fn().mockReturnValue({
      select: mockSelect,
    })

    vi.mocked(createClient).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: 'user-1' } },
        }),
      },
      from: mockFrom,
    } as any)

    await expect(getTasks()).rejects.toThrow('Error consultando tareas')
  })

  it('updateTaskStatus actualiza estado y revalida dashboard', async () => {
    const mockEq = vi.fn().mockResolvedValue({
      error: null,
    })

    const mockUpdate = vi.fn().mockReturnValue({
      eq: mockEq,
    })

    const mockFrom = vi.fn().mockReturnValue({
      update: mockUpdate,
    })

    vi.mocked(createClient).mockResolvedValue({
      from: mockFrom,
    } as any)

    await updateTaskStatus('task-1', 'done')

    expect(mockFrom).toHaveBeenCalledWith('tasks')
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'done',
        updated_at: expect.any(String),
      })
    )
    expect(mockEq).toHaveBeenCalledWith('id', 'task-1')
    expect(revalidatePath).toHaveBeenCalledWith('/dashboard')
  })

  it('updateTaskStatus lanza error si Supabase falla', async () => {
    const mockEq = vi.fn().mockResolvedValue({
      error: { message: 'No se pudo actualizar' },
    })

    const mockUpdate = vi.fn().mockReturnValue({
      eq: mockEq,
    })

    const mockFrom = vi.fn().mockReturnValue({
      update: mockUpdate,
    })

    vi.mocked(createClient).mockResolvedValue({
      from: mockFrom,
    } as any)

    await expect(updateTaskStatus('task-1', 'done')).rejects.toThrow(
      'No se pudo actualizar'
    )
  })
})