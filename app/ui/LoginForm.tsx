import { emailSchema } from '@/lib/schemas'
import { EyeIcon } from '@heroicons/react/16/solid'
import { EyeSlashIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { LoginStatus, StatusTexts } from '@/lib/enums'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [response, setResponse] = useState<string | null>(null)
  const [emailValidated, setEmailValidated] = useState<boolean>(true)
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const route = useRouter()

  const handleClick = () => {
    setPasswordVisibility(!passwordVisibility)
  }

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
      const res = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      })

      if (res?.status === LoginStatus.Unauthorized) {
        setResponse(StatusTexts.Unauthorized)
      }

      if (res?.status === LoginStatus.Success) {
        route.push('/pages/home')
      }
    }
  }

  return (
    <form className="flex h-full w-full flex-col gap-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <input
          className="rounded-md bg-input p-4 placeholder:text-placeholder focus:outline-none"
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
        <div className="flex flex-row items-center justify-between rounded-md bg-input p-4">
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
        <Link href={'#'} className="flex w-full justify-end text-slate-400">
          Olvidé mi contraseña
        </Link>
      </div>
      <button className="rounded-md bg-button p-4 text-white" type="submit">
        Iniciar sesión
      </button>
    </form>
  )
}
