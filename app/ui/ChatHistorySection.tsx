import { UsersFollowed } from '@/lib/interfaces'
import Image from 'next/image'
import React from 'react'

interface Props {
  usersFollowed?: UsersFollowed[]
}

export default function ChatHistorySection({ usersFollowed }: Props) {
  return (
    <ul className="w-full outline outline-[0.3px] outline-gray-300 xl:max-w-[313px]">
      {usersFollowed &&
        usersFollowed.map(
          ({
            id: userId,
            username,
            fullname,
            avatarUrl,
            email,
            password,
            role,
          }) => {
            return (
              <li
                key={userId}
                className="flex flex-row justify-between px-2 py-3 hover:bg-gray-200"
              >
                <div className="flex flex-row gap-2">
                  <Image
                    className="scale-100 overflow-hidden rounded-full border-2 border-white"
                    alt={`Foto de perfil de ${username}`}
                    src={`/${avatarUrl}`}
                    height={44}
                    width={44}
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">{username}</span>
                    <span className="text-xs">{fullname}</span>
                  </div>
                </div>
              </li>
            )
          },
        )}
    </ul>
  )
}
