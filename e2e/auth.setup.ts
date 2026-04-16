// import { test as setup, expect } from '@playwright/test'

// const authFile = 'playwright/.auth/user.json'

// setup('authenticate', async ({ page }) => {
//   const email = process.env.E2E_EMAIL
//   const password = process.env.E2E_PASSWORD

//   if (!email || !password) {
//     throw new Error('Faltan E2E_EMAIL y/o E2E_PASSWORD en variables de entorno')
//   }

//   await page.goto('/login')

//   await page.getByLabel(/email/i).fill(email)
//   await page.getByLabel(/password/i).fill(password)
//   await page.getByRole('button', { name: /sign in|login|iniciar sesión/i }).click()

//   await expect(page).toHaveURL(/dashboard/)
//   await page.context().storageState({ path: authFile })
// })


import { test as setup, expect } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  const email = process.env.E2E_EMAIL
  const password = process.env.E2E_PASSWORD

  if (!email || !password) {
    throw new Error('Faltan E2E_EMAIL y/o E2E_PASSWORD en variables de entorno')
  }

  await page.goto('/login')

  await page.getByLabel(/correo electrónico|email/i).fill(email)
  await page.getByLabel(/contraseña|password/i).fill(password)
  await page
    .getByRole('button', { name: /iniciar sesión|sign in|login/i })
    .click()

  await expect(page).toHaveURL(/dashboard/)
  await page.context().storageState({ path: authFile })
})