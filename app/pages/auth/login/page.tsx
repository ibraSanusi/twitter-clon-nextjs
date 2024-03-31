'use client'

import { emailSchema } from '@/lib/schemas'
import { EyeIcon } from '@heroicons/react/16/solid'
import { EyeSlashIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

export default function Page() {
  const [response, setResponse] = useState<string | null>(null)
  const [emailValidated, setEmailValidated] = useState<boolean>(true)
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)

  // Enviar los datos del formulario al servidor si el correo es valido
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setResponse(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const validatedFields = emailSchema.safeParse({
      email: email,
    })

    if (validatedFields.success) {
      setEmailValidated(true)
    } else {
      setEmailValidated(false)
      return
    }

    if (validatedFields.success) {
      const newResponse: string = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }).then((res) => {
        return res.text()
      })
      setResponse(newResponse)
    }
  }

  const handleClick = () => {
    setPasswordVisibility(!passwordVisibility)
  }

  return (
    <section className="grid grid-cols-2 justify-center w-full h-screen py-8">
      {/* Left section */}
      <article className="flex items-end justify-end">
        <div className="w-[629px] h-[664px]">
          <h1 className="text-4xl mb-6 font-bold">Sign In to</h1>
          <h2 className="text-3xl">Sintoniza tu onda</h2>
          <div className="flex flex-row">
            <p className="pt-16 text-pretty">
              Si no tienes una cuenta puedes registrarte{' '}
              <Link className="text-auth" href="/auth/register">
                aquí!
              </Link>
            </p>

            <Image
              src="/chatter-icon.png"
              alt="Imagen de persona chateando con un movil."
              width={313}
              height={556}
              className="w-[313px] h-[556px]"
            />
          </div>
        </div>
      </article>

      {/* Right section */}
      <article className="flex justify-center items-center w-full h-full">
        <div className="flex flex-col gap-6 w-[369px] h-[700px] mx-auto">
          <h2 className="w-full text-2xl">Sing In</h2>
          <form
            className="flex flex-col gap-8 w-full h-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4">
              <input
                className="bg-input p-4 rounded-md placeholder:text-placeholder focus:outline-none"
                type="text"
                placeholder="Escribe email o username"
                name="email"
                required
              />
              {!emailValidated && (
                <small className="text-red-600">El email no es valido.</small>
              )}
              {response && <small className="text-red-600">{response}</small>}
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between items-center bg-input p-4 rounded-md">
                <input
                  className="bg-transparent placeholder:text-placeholder focus:outline-none"
                  type={passwordVisibility ? 'text' : 'password'}
                  placeholder="Escribe tu contraseña"
                  name="password"
                  required
                />
                <button
                  type="button"
                  onClick={handleClick}
                  className="size-5 text-placeholder"
                >
                  {passwordVisibility ? <EyeIcon /> : <EyeSlashIcon />}
                </button>
              </div>
              <Link
                href={'#'}
                className="w-full flex justify-end text-slate-400"
              >
                Olvidé mi contraseña
              </Link>
            </div>
            <button
              className="bg-button p-4 rounded-md text-white"
              type="submit"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </article>
    </section>
  )
}
