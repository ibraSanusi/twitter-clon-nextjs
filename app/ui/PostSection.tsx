'use client'

import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { useUserResponse } from '@/app/hooks/useResponse'
import {
  Bars3CenterLeftIcon,
  CalendarDaysIcon,
  PhotoIcon,
} from '@heroicons/react/16/solid'
import PostModal from './PostModal'

const ERROR_MESSAGE = 'Fallo al publicar el post.'
const SUCCESS_MESSAGE = 'Tweet subido correctamente.'

export default function PostSection() {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const [postModalVisibility, setPostModalVisibility] = useState(false)

  // Mostrar la modal de la publicacion
  const handlePublishClick = () => {
    setPostModalVisibility(true)
  }

  // Cambia la visibilidad de la modal. Se pasa a otro componente
  const changeModalVisibility = (visibility: boolean) => {
    setPostModalVisibility(visibility)
  }

  const { response } = useUserResponse()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 3. Recuperar el contenido del textarea
    const content = value

    if (!content) {
      return
    }

    const postData: { content: string } = {
      content: content,
    }

    // 4. Llamar a la API para postear el tweet con el email
    // TODO: mejorar el tipado del response
    const res = await fetch('/api/post/tweet', {
      method: 'POST',
      body: JSON.stringify(postData),
    })

    if (res.status !== 201) {
      return
    }

    setValue('')

    // 5. Con la respuesta de la API confirmar si se ha subido
    const data: {
      id: string
      content: string
      createdAt: Date
      updatedAt: Date
      userId: string
    } = await res.json()

    // 6. Setear el error o no...
    if (!res.ok) {
      setError(true)
      return
    }
    setError(false)
  }

  // TODO: anadir funcionalidad de subir imagenes y demas archivos
  return (
    <section className="flex w-full flex-col gap-6 rounded-xl bg-white p-4 xl:max-h-[592px] xl:min-w-[555px] xl:max-w-[555px]">
      <div className="flex w-full flex-row gap-2">
        <Image
          className="scale-100 overflow-hidden rounded-full border-2 border-white"
          alt={`Foto de perfil de ${response?.username}`}
          src={`/${response?.avatarUrl}`}
          height={64}
          width={64}
        />
        <button
          onClick={handlePublishClick}
          className="w-full rounded-full border-[1px] border-black p-4 text-start text-sm font-semibold text-gray-600 hover:bg-[#F3F3F3] hover:text-black"
        >
          Crear publicacion
        </button>
      </div>

      <nav>
        <ul className="flex flex-row justify-around">
          <li>
            <button className="flex flex-row items-center gap-2 rounded-md hover:bg-[#f4f2ee]">
              <PhotoIcon className="w-8 text-blue-500" />
              <span>Contenido multimedia</span>
            </button>
          </li>
          <li>
            <button className="flex flex-row items-center gap-2 rounded-md hover:bg-[#f4f2ee]">
              <CalendarDaysIcon className="w-8 text-blue-500" />
              <span>Evento</span>
            </button>
          </li>
          <li>
            <button className="flex flex-row items-center gap-2 rounded-md hover:bg-[#f4f2ee]">
              <Bars3CenterLeftIcon className="w-8 text-blue-500" />
              <span>Escribir articulo</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* PostModal */}
      {postModalVisibility && (
        <PostModal changeModalVisibility={changeModalVisibility} />
      )}
    </section>
  )
}
