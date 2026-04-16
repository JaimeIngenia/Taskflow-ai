import { test, expect } from '@playwright/test'

test.describe('login page', () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  test('muestra la página de login', async ({ page }) => {
    await page.goto('/login')

    await expect(page.getByLabel(/correo electrónico|email/i)).toBeVisible()
    await expect(page.getByLabel(/contraseña|password/i)).toBeVisible()
    await expect(
      page.getByRole('button', { name: /iniciar sesión|sign in|login/i })
    ).toBeVisible()
  })

  test('muestra error con credenciales inválidas', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel(/correo electrónico|email/i).fill('fake@example.com')
    await page.getByLabel(/contraseña|password/i).fill('wrong-password')
    await page
      .getByRole('button', { name: /iniciar sesión|sign in|login/i })
      .click()

    await expect(page.getByText(/credenciales incorrectas|invalid|incorrect|error/i)).toBeVisible()
  })

  test('redirecciona al dashboard con credenciales válidas', async ({ page }) => {
    const email = process.env.E2E_EMAIL
    const password = process.env.E2E_PASSWORD

    test.skip(!email || !password, 'Faltan credenciales E2E')

    await page.goto('/login')

    await page.getByLabel(/correo electrónico|email/i).fill(email!)
    await page.getByLabel(/contraseña|password/i).fill(password!)
    await page
      .getByRole('button', { name: /iniciar sesión|sign in|login/i })
      .click()

    await expect(page).toHaveURL(/dashboard/)
  })

  test('protege /dashboard si no hay sesión', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/login/)
  })
})