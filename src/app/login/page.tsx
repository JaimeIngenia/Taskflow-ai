// import { redirect } from 'next/navigation'

// import { createClient } from '@/lib/supabase/server'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'

// type LoginPageProps = {
//   searchParams: Promise<{
//     error?: string
//   }>
// }

// export default async function LoginPage({
//   searchParams,
// }: LoginPageProps) {
//   const params = await searchParams
//   const error = params.error

//   async function login(formData: FormData) {
//     'use server'

//     const email = String(formData.get('email') ?? '')
//     const password = String(formData.get('password') ?? '')

//     const supabase = await createClient()

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     })

//     if (error) {
//       redirect('/login?error=Credenciales%20incorrectas')
//     }

//     redirect('/dashboard')
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-[#0f0f1a] px-4">
//       <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-white">TaskFlow AI</h1>
//           <p className="mt-2 text-sm text-neutral-400">
//             Inicia sesión para continuar
//           </p>
//         </div>

//         {error ? (
//           <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
//             {error}
//           </div>
//         ) : null}

//         <form action={login} className="space-y-4">
//           <Input
//             name="email"
//             type="email"
//             placeholder="Correo electrónico"
//             required
//             className="border-white/10 bg-white/5 text-white placeholder:text-neutral-500"
//           />

//           <Input
//             name="password"
//             type="password"
//             placeholder="Contraseña"
//             required
//             className="border-white/10 bg-white/5 text-white placeholder:text-neutral-500"
//           />

//           <Button
//             type="submit"
//             className="w-full bg-green-500 text-white hover:bg-green-600"
//           >
//             Iniciar sesión
//           </Button>
//         </form>
//       </div>
//     </div>
//   )
// }


import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type LoginPageProps = {
  searchParams: Promise<{
    error?: string
  }>
}

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams
  const error = params.error

  async function login(formData: FormData) {
    'use server'

    const email = String(formData.get('email') ?? '')
    const password = String(formData.get('password') ?? '')

    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      redirect('/login?error=Credenciales%20incorrectas')
    }

    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f1a] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">TaskFlow AI</h1>
          <p className="mt-2 text-sm text-neutral-400">
            Inicia sesión para continuar
          </p>
        </div>

        {error ? (
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        ) : null}

        <form action={login} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-white">
              Correo electrónico
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Correo electrónico"
              autoComplete="email"
              required
              className="border-white/10 bg-white/5 text-white placeholder:text-neutral-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-white">
              Contraseña
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              autoComplete="current-password"
              required
              className="border-white/10 bg-white/5 text-white placeholder:text-neutral-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 text-white hover:bg-green-600"
          >
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  )
}