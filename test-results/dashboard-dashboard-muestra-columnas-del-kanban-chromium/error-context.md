# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> dashboard >> muestra columnas del kanban
- Location: e2e\dashboard.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /to do|todo/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /to do|todo/i })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - heading "TaskFlow AI" [level=1] [ref=e5]
      - generic [ref=e6]:
        - button "+ Nueva Tarea" [ref=e7]
        - generic [ref=e8]: user@email.com
    - generic [ref=e9]:
      - generic [ref=e10]:
        - generic [ref=e11]:
          - heading "Por hacer" [level=2] [ref=e12]
          - generic [ref=e13]: "7"
        - generic [ref=e14]:
          - button "Deploy en Vercel MEDIA CI/CD automatizado" [ref=e15]:
            - generic [ref=e17]:
              - generic [ref=e18]:
                - heading "Deploy en Vercel" [level=3] [ref=e20]
                - generic [ref=e21]: MEDIA
                - paragraph [ref=e22]: CI/CD automatizado
              - img [ref=e23]
          - button "Configurar Supabase ALTA Setup inicial del proyecto" [ref=e30]:
            - generic [ref=e32]:
              - generic [ref=e33]:
                - heading "Configurar Supabase" [level=3] [ref=e35]
                - generic [ref=e36]: ALTA
                - paragraph [ref=e37]: Setup inicial del proyecto
              - img [ref=e38]
          - button "Agregar Dark Mode BAJA Tema oscuro con next-themes" [ref=e45]:
            - generic [ref=e47]:
              - generic [ref=e48]:
                - heading "Agregar Dark Mode" [level=3] [ref=e50]
                - generic [ref=e51]: BAJA
                - paragraph [ref=e52]: Tema oscuro con next-themes
              - img [ref=e53]
          - button "Tests E2E MEDIA Playwright para flujo completo" [ref=e60]:
            - generic [ref=e62]:
              - generic [ref=e63]:
                - heading "Tests E2E" [level=3] [ref=e65]
                - generic [ref=e66]: MEDIA
                - paragraph [ref=e67]: Playwright para flujo completo
              - img [ref=e68]
          - button "Implementar RAG MEDIA Chat con contexto de tareas" [ref=e75]:
            - generic [ref=e77]:
              - generic [ref=e78]:
                - heading "Implementar RAG" [level=3] [ref=e80]
                - generic [ref=e81]: MEDIA
                - paragraph [ref=e82]: Chat con contexto de tareas
              - img [ref=e83]
          - button "Demo MCP en vivo ALTA Severo prueba Jaime el lunes en la noche" [ref=e90]:
            - generic [ref=e92]:
              - generic [ref=e93]:
                - heading "Demo MCP en vivo" [level=3] [ref=e95]
                - generic [ref=e96]: ALTA
                - paragraph [ref=e97]: Severo prueba Jaime el lunes en la noche
              - img [ref=e98]
          - button "AFDA ALTA SDFSDF" [ref=e105]:
            - generic [ref=e107]:
              - generic [ref=e108]:
                - heading "AFDA" [level=3] [ref=e110]
                - generic [ref=e111]: ALTA
                - paragraph [ref=e112]: SDFSDF
              - img [ref=e113]
      - generic [ref=e120]:
        - generic [ref=e121]:
          - heading "En progreso" [level=2] [ref=e122]
          - generic [ref=e123]: "3"
        - generic [ref=e124]:
          - button "Construir Kanban Board ALTA Drag & drop con dnd-kit" [ref=e125]:
            - generic [ref=e127]:
              - generic [ref=e128]:
                - heading "Construir Kanban Board" [level=3] [ref=e130]
                - generic [ref=e131]: ALTA
                - paragraph [ref=e132]: Drag & drop con dnd-kit
              - img [ref=e133]
          - button "Implementar RAG MEDIA Chat inteligente con pgvector" [ref=e140]:
            - generic [ref=e142]:
              - generic [ref=e143]:
                - heading "Implementar RAG" [level=3] [ref=e145]
                - generic [ref=e146]: MEDIA
                - paragraph [ref=e147]: Chat inteligente con pgvector
              - img [ref=e148]
          - button "Crear componente Kanban ALTA UI con drag and drop" [ref=e155]:
            - generic [ref=e157]:
              - generic [ref=e158]:
                - heading "Crear componente Kanban" [level=3] [ref=e160]
                - generic [ref=e161]: ALTA
                - paragraph [ref=e162]: UI con drag and drop
              - img [ref=e163]
      - generic [ref=e170]:
        - generic [ref=e171]:
          - heading "Terminado" [level=2] [ref=e172]
          - generic [ref=e173]: "2"
        - generic [ref=e174]:
          - button "Diseñar base de datos ALTA Schema con RLS" [ref=e175]:
            - generic [ref=e177]:
              - generic [ref=e178]:
                - generic [ref=e179]:
                  - heading "Diseñar base de datos" [level=3] [ref=e180]
                  - img [ref=e181]
                - generic [ref=e183]: ALTA
                - paragraph [ref=e184]: Schema con RLS
              - img [ref=e185]
          - button "Configurar Supabase ALTA Auth + RLS policies" [ref=e192]:
            - generic [ref=e194]:
              - generic [ref=e195]:
                - generic [ref=e196]:
                  - heading "Configurar Supabase" [level=3] [ref=e197]
                  - img [ref=e198]
                - generic [ref=e200]: ALTA
                - paragraph [ref=e201]: Auth + RLS policies
              - img [ref=e202]
  - status [ref=e209]
  - generic [ref=e214] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e215]:
      - img [ref=e216]
    - generic [ref=e219]:
      - button "Open issues overlay" [ref=e220]:
        - generic [ref=e221]:
          - generic [ref=e222]: "0"
          - generic [ref=e223]: "1"
        - generic [ref=e224]: Issue
      - button "Collapse issues badge" [ref=e225]:
        - img [ref=e226]
  - alert [ref=e228]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('dashboard', () => {
  4  |   test('muestra columnas del kanban', async ({ page }) => {
  5  |     await page.goto('/dashboard')
  6  | 
> 7  |     await expect(page.getByRole('heading', { name: /to do|todo/i })).toBeVisible()
     |                                                                      ^ Error: expect(locator).toBeVisible() failed
  8  |     await expect(page.getByRole('heading', { name: /in progress/i })).toBeVisible()
  9  |     await expect(page.getByRole('heading', { name: /done/i })).toBeVisible()
  10 |   })
  11 | 
  12 |   test('muestra tareas o estado vacío', async ({ page }) => {
  13 |     await page.goto('/dashboard')
  14 |     await expect(page.locator('body')).toBeVisible()
  15 |   })
  16 | 
  17 |   test.skip('permite crear nueva tarea', async ({ page }) => {
  18 |     await page.goto('/dashboard')
  19 | 
  20 |     await page.getByRole('button', { name: /new task|nueva tarea/i }).click()
  21 |     await page.getByLabel(/title|título/i).fill('Nueva tarea e2e')
  22 |     await page.getByLabel(/description|descripción/i).fill('Creada desde Playwright')
  23 |     await page.getByRole('button', { name: /create|crear/i }).click()
  24 | 
  25 |     await expect(page.getByText(/nueva tarea e2e/i)).toBeVisible()
  26 |   })
  27 | })
```