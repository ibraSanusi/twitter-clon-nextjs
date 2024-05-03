'use client'

import { FaceSmileIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import Multimedia from '@/app/ui/Multimedia'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { useAutosizeTextArea } from '@/lib/UseAutosizeTextArea'
import { useSession } from 'next-auth/react'
import SuccessIcon from '@/app/ui/icons/SuccessIcon'
import CloseIcon from '@/app/ui/icons/CloseIcon'
import ErrorIcon from '@/app/ui/icons/ErrorIcon'

const ERROR_MESSAGE = 'Fallo al publicar el post.'
const SUCCESS_MESSAGE = 'Tweet subido correctamente.'

export default function TweetPost() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = useState('')
  const { data: session, status } = useSession()
  const [error, setError] = useState(false)
  const [postSuccessMessage, setPostSuccessMessage] = useState('')
  const [toastVisibility, setToastVisibility] = useState(true)

  useAutosizeTextArea(textareaRef.current, value)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea: HTMLTextAreaElement = e.currentTarget
    setValue(textarea.value)
  }

  const closeToast = () => {
    setToastVisibility(!toastVisibility)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setValue('')

    // 1. Comprobar si el usuario está logeado
    if (status === 'authenticated' && session?.user) {
      // 2. Recuperar el email
      const userSession = session.user
      const email = userSession?.email

      // 3. Recuperar el contenido del textarea
      const content = value

      if (!email || !content) {
        return
      }

      const postData: { email: string; content: string } = {
        email: email,
        content: content,
      }

      // 4. Llamar a la API para postear el tweet con el email
      // TODO: mejorar el tipado del response
      const res = await fetch('/api/post/tweet', {
        method: 'POST',
        body: JSON.stringify(postData),
      })

      // 5. Con la respuesta de la API confirmar si se ha subido
      const data: {
        id: string
        content: string
        createdAt: Date
        updatedAt: Date
        userId: string
      } = await res.json()

      console.log('Respuesta del servidor: ', data.content)

      // 6. Setear el error o no...
      if (!res.ok) {
        setError(true)
        return
      }
      setError(false)
    }
  }

  // TODO: anadir funcionalidad de subir imagenes y demas archivos
  return (
    <form
      className="relative flex flex-col gap-2 rounded-xl bg-slate-200 p-8"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-row gap-3 rounded-3xl bg-white py-1 pl-1 pr-2">
        <Image
          className="max-h-[30px] rounded-full"
          src="/delba_oliveira.webp"
          alt="Avatar de usuario (EN SESION)"
          width={30}
          height={30}
        />
        <textarea
          onChange={handleChange}
          className="w-full resize-none pt-0.5 outline-none"
          rows={1}
          ref={textareaRef}
          name="content"
          placeholder="Share something"
          value={value}
        ></textarea>
        <button className="mt-1 size-6 text-gray-500">
          <FaceSmileIcon />
        </button>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-6">
          <Multimedia />
        </div>
        <button
          type="submit"
          className="rounded-3xl bg-black px-8 py-2 text-white"
        >
          Post
        </button>
      </div>

      <section
        className={`mb-4 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400 ${!toastVisibility && 'hidden'}`}
      >
        {!error && (
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <SuccessIcon />
            <span className="sr-only">Check icon</span>
          </div>
        )}

        {error && (
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <ErrorIcon />
            <span className="sr-only">Error icon</span>
          </div>
        )}

        <span className="ms-3 text-sm font-normal">
          {error && ERROR_MESSAGE}
          {!error && SUCCESS_MESSAGE}
        </span>
        <button
          onClick={closeToast}
          type="button"
          className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Close</span>

          <CloseIcon />
        </button>
      </section>
    </form>
  )
}
