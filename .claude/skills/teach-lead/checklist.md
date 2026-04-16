# Tech Lead Checklist — TypeScript / Next.js / React

## A. Responsabilidad y cohesión
- [ ] El archivo tiene una sola responsabilidad principal
- [ ] El componente no mezcla UI, negocio, persistencia y side effects
- [ ] Los handlers son cortos y entendibles
- [ ] El JSX no contiene lógica compleja
- [ ] No hay utilidades “random” metidas en un componente de UI

## B. SOLID
### SRP
- [ ] Cada módulo hace una sola cosa bien
- [ ] La lógica de negocio está separada del render

### OCP
- [ ] No hay `switch` o `if` gigantes para variantes previsibles
- [ ] La extensión se puede hacer con configuración, composición o estrategias

### LSP
- [ ] Los tipos son consistentes y sustituibles
- [ ] No hay abstracciones engañosas que rompan expectativas

### ISP
- [ ] Las props son pequeñas y específicas
- [ ] Los hooks retornan solo lo necesario
- [ ] Las interfaces no fuerzan datos que no se usan

### DIP
- [ ] No se instancian servicios concretos dentro del componente
- [ ] Dependencias externas están abstraídas o aisladas
- [ ] El componente depende de hooks, helpers o interfaces claras

## C. TypeScript
- [ ] No hay `any`
- [ ] Los tipos son explícitos donde aportan claridad
- [ ] No se usan casts innecesarios
- [ ] Las unions están bien delimitadas
- [ ] Los nombres de tipos son claros
- [ ] El tipado ayuda a prevenir estados inválidos

## D. React
- [ ] El componente es declarativo
- [ ] No hay lógica pesada dentro del cuerpo del componente
- [ ] Los estados derivados están controlados
- [ ] No hay props drilling innecesario
- [ ] Se evita duplicación de JSX
- [ ] El componente es fácil de leer de arriba hacia abajo

## E. Hooks
- [ ] Cada hook tiene una responsabilidad clara
- [ ] Los hooks no retornan demasiadas cosas sin cohesión
- [ ] Los hooks encapsulan lógica reutilizable
- [ ] Efectos, memoización y callbacks solo se usan cuando aportan valor
- [ ] El componente principal delega la lógica a hooks cuando corresponde

## F. Next.js
- [ ] Está claro si el archivo debe ser Client o Server Component
- [ ] No hay APIs del navegador en lugares incorrectos
- [ ] La capa UI no conoce detalles de infraestructura innecesarios
- [ ] La estructura favorece escalabilidad dentro de `src/`

## G. Manejo de errores
- [ ] Los errores no están ocultos
- [ ] Las funciones tienen caminos de fallo claros
- [ ] No hay side effects silenciosos
- [ ] La UX ante error está pensada si aplica

## H. Legibilidad
- [ ] Nombres de funciones y variables son precisos
- [ ] No hay bloques largos difíciles de escanear
- [ ] El archivo se puede entender rápido
- [ ] La intención del código es obvia

## I. Testabilidad
- [ ] La lógica importante está separada del render
- [ ] Las funciones pueden probarse de forma aislada
- [ ] Las dependencias pueden simularse o reemplazarse
- [ ] El código no depende de valores globales ocultos

## J. Checklist específico para `kanban-board.tsx`
- [ ] El componente principal es pequeño
- [ ] Su trabajo principal es componer subcomponentes
- [ ] La lógica drag-and-drop está abstraída
- [ ] El estado de tareas no vive desordenado en el JSX
- [ ] No hay duplicación de columnas
- [ ] `DragOverlay` está aislado y claro
- [ ] El archivo se siente como “orquestador de UI”, no como “God component”
- [ ] Un desarrollador nuevo lo puede leer en pocos minutos