'use client'

import Image from 'next/image'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { FaceSmileIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { User } from '@/lib/interfaces'
import { ChangeEventHandler, useState } from 'react'

interface Props {
  response: User | undefined
  tweetId: string
}

export default function CommentPostSection({ response, tweetId }: Props) {
  const [textareaValue, setTextareaValue] = useState('')

  // Comentar el tweet
  const handleComment = async () => {
    if (textareaValue === '') {
      return
    }

    const response = await fetch('/api/post/comment', {
      method: 'POST',
      body: JSON.stringify({ content: textareaValue, tweetId }),
    })

    if (!response.ok) {
      alert('Error al comentar el tweet')
      return
    }

    // Limpiar el valor del textarea
    setTextareaValue('')

    const commentData = await response.json()

    console.log('commentData: ', commentData)
  }

  // Capturar los datos del textarea cada vez que cambie el input
  const handleTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const textareaValue = e.target.value

    setTextareaValue(textareaValue)
  }

  return (
    <div className="flex flex-row gap-2">
      <Image
        className="max-h-[40px] scale-100 overflow-hidden rounded-full border-2 border-white xl:max-w-[40px]"
        alt={`Foto de perfil de ${response?.username}`}
        src={`/${response?.avatarUrl}`}
        height={0}
        width={40}
      />

      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full flex-row rounded-3xl border p-2">
          <ReactTextareaAutosize
            value={textareaValue}
            onChange={handleTextAreaChange}
            rows={1}
            placeholder="Añadir un comentario..."
            id="commentTextarea"
            className="w-full rounded-xl text-sm"
          ></ReactTextareaAutosize>

          <div className="flex flex-row gap-4">
            <button className="size-6 cursor-pointer">
              <FaceSmileIcon />
            </button>
            <button className="size-6 cursor-pointer">
              <PhotoIcon />
            </button>
          </div>
        </div>

        {textareaValue !== '' && (
          <button
            onClick={handleComment}
            className="w-fit rounded-3xl bg-blue-500 p-1 px-2 text-xs font-semibold text-white hover:bg-blue-700"
            disabled={textareaValue === ''}
          >
            Publicar
          </button>
        )}
      </div>
    </div>
  )
}
