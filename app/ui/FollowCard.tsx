import { FollowResponse } from '@/lib/interfaces'
import clsx from 'clsx'
import Image from 'next/image'
import React, { MouseEventHandler, useState } from 'react'

interface Props {
  userId: string
  username: string
  avatarUrl: string
  followed: boolean
  fullname: string
}

export default function FollowCard({
  userId,
  username,
  avatarUrl,
  followed,
  fullname,
}: Props) {
  const [isFollowed, setIsFollowed] = useState(followed)
  // Seguir a usuario
  const handleFollow: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const followingId = e.currentTarget.id

    console.log('followingId: ', followingId)

    if (!isFollowed) {
      const response = await fetch('/api/post/follow', {
        method: 'POST',
        body: JSON.stringify({ followingId }),
      })

      if (!response.ok) {
        return
      }

      setIsFollowed(true)
      const followResponse: FollowResponse = await response.json()
    } else {
      const response = await fetch('/api/post/unfollow', {
        method: 'POST',
        body: JSON.stringify({ followingId }),
      })

      if (!response.ok) {
        return
      }

      setIsFollowed(false)
    }
  }
  //   TODO: DEJAR DE SEGUIR A USUARIO TRAS SEGUIR

  return (
    <article className="flex flex-row justify-between">
      <div className="flex flex-row gap-2">
        <Image
          className="scale-100 overflow-hidden rounded-full border-2 border-white"
          alt={`Foto de perfil de ${username}`}
          src={`/${avatarUrl}`}
          height={28}
          width={28}
        />
        <div className="flex flex-col">
          <span className="text-xs font-semibold">{username}</span>
          <span className="text-xs">{fullname}</span>
        </div>
      </div>

      <button
        className={clsx(
          'rounded-md bg-[#f4f2ee] px-2 py-1 text-xs text-black',
          {
            'hover:bg-blue-700 hover:text-white': !isFollowed,
            'bg-white text-red-500 outline outline-1 hover:bg-red-500 hover:text-white':
              isFollowed,
          },
        )}
        id={userId}
        onClick={handleFollow}
      >
        {isFollowed && 'Seguido'}
        {!isFollowed && 'Seguir'}
      </button>
    </article>
  )
}
