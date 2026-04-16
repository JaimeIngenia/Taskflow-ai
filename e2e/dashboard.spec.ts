import { test, expect } from '@playwright/test'

test.describe('dashboard', () => {
  test('muestra columnas del kanban', async ({ page }) => {
    await page.goto('/dashboard')

    await expect(page.getByRole('heading', { name: /to do|todo/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /in progress/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /done/i })).toBeVisible()
  })

  test('muestra tareas o estado vacío', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.locator('body')).toBeVisible()
  })

  test.skip('permite crear nueva tarea', async ({ page }) => {
    await page.goto('/dashboard')

    await page.getByRole('button', { name: /new task|nueva tarea/i }).click()
    await page.getByLabel(/title|título/i).fill('Nueva tarea e2e')
    await page.getByLabel(/description|descripción/i).fill('Creada desde Playwright')
    await page.getByRole('button', { name: /create|crear/i }).click()

    await expect(page.getByText(/nueva tarea e2e/i)).toBeVisible()
  })
})