'use client'

import { FaceSmileIcon, XMarkIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import { useUserResponse } from '@/app/hooks/useResponse'
import { PhotoIcon } from '@heroicons/react/16/solid'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { ChangeEventHandler, useState } from 'react'

export default function PostModal({
  changeModalVisibility,
}: {
  changeModalVisibility: (visibility: boolean) => void
}) {
  const { response } = useUserResponse()
  const [textareaValue, setTextareaValue] = useState('')

  const handleClick = () => {
    changeModalVisibility(false)
  }

  // Publicar tweet. Llamar a la Api
  const handlePost = async () => {
    if (textareaValue === '') {
      return
    }

    const response = await fetch('/api/post/tweet', {
      method: 'POST',
      body: JSON.stringify({ content: textareaValue }),
    })

    if (!response.ok) {
      alert('Error al publicar el tweet')
      return
    }

    // Limpiar el valor del textarea
    setTextareaValue('')

    const tweetData = await response.json()

    console.log('tweetData: ', tweetData)
  }

  // Capturar los datos del textarea cada vez que cambie el input
  const handleTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const textareaValue = e.target.value

    setTextareaValue(textareaValue)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center overscroll-none bg-black bg-opacity-80">
      <section className="mx-8 flex w-full flex-col justify-center gap-8 rounded-xl bg-white p-8 opacity-100 xl:mx-0 xl:max-w-[744px]">
        <section className="flex flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-2">
            <Image
              className="scale-100 overflow-hidden rounded-full border-2 border-white"
              alt={`Foto de perfil de ${response?.username}`}
              src={`/${response?.avatarUrl}`}
              height={64}
              width={64}
            />

            <div>
              <h2>{response?.fullname}</h2>
              <span>Publicar tweet</span>
            </div>
          </div>
          <XMarkIcon
            onClick={handleClick}
            className="w-10 cursor-pointer text-gray-400 hover:text-black"
          />
        </section>

        <div className="xl:h-[299px]">
          <ReactTextareaAutosize
            value={textareaValue}
            onChange={handleTextAreaChange}
            className="focus:outline-hidden w-full resize-none overflow-auto text-xl outline-none placeholder:text-xl placeholder:text-gray-500 xl:max-h-[299px]"
            rows={4}
            placeholder="¿Sobre qué quieres hablar?"
            id="postTextarea"
          />
        </div>

        <div className="flex flex-row gap-2">
          <button className="cursor-pointer">
            <FaceSmileIcon className="w-6 text-gray-400" />
          </button>
          <button className="cursor-pointer">
            <PhotoIcon className="w-6 text-gray-400" />
          </button>
        </div>

        <div className="flex w-full justify-end border-t-2 py-4">
          <button
            onClick={handlePost}
            className={`rounded-3xl px-[16px] py-[6px] ${textareaValue === '' && 'cursor-not-allowed bg-[#8c8c8c33] text-[#0000004d]'} ${textareaValue !== '' && 'bg-blue-500 text-white hover:bg-blue-700'}`}
            disabled={textareaValue === ''}
          >
            Publicar
          </button>
        </div>
      </section>
    </div>
  )
}
