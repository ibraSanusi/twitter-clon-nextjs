'use client'

import { FaceSmileIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import Multimedia from './Multimedia'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { useAutosizeTextArea } from '@/lib/UseAutosizeTextArea'
import { postTweet } from '@/lib/actions'

export default function TweetPost() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = useState('')

  useAutosizeTextArea(textareaRef.current, value)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea: HTMLTextAreaElement = e.currentTarget
    setValue(textarea.value)
  }

  return (
    <form
      className="flex flex-col p-8 bg-slate-200 gap-2 rounded-xl"
      action={postTweet}
    >
      <div className="flex flex-row gap-3 bg-white pr-2 pl-1 py-1 rounded-3xl">
        <Image
          className="rounded-full max-h-[30px]"
          src="/delba_oliveira.webp"
          alt="Avatar de usuario (EN SESION)"
          width={30}
          height={30}
        />
        <textarea
          onChange={handleChange}
          className={`w-full outline-none resize-none pt-0.5`}
          rows={1}
          ref={textareaRef}
          name="content"
          placeholder="Share something"
        ></textarea>
        <button className="size-6 mt-1 text-gray-500">
          <FaceSmileIcon />
        </button>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-6">
          <Multimedia />
        </div>
        <button
          type="submit"
          className="py-2 px-8 bg-black text-white rounded-3xl"
        >
          Post
        </button>
      </div>
    </form>
  )
}
