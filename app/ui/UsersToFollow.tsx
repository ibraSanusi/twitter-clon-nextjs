'use client'

import { FollowResponse, UnfollowedUsersResponse } from '@/lib/interfaces'
import Image from 'next/image'
import { MouseEventHandler, useEffect, useState } from 'react'
import FollowCard from './FollowCard'

export default function UsersToFollow() {
  const [unfollowedUsers, setUnfollowedUsers] =
    useState<UnfollowedUsersResponse[]>()
  const [isFollowed, setIsFollowed] = useState(false)

  // Obtener usuarios a los que no sigue el ususario en sesion
  useEffect(() => {
    const getUnfollowedUsers = async () => {
      const response = await fetch('/api/get/unfollowedUsers')
      const unfollowedUsersResponse: UnfollowedUsersResponse[] =
        await response.json()

      if (!response.ok) {
        return
      }

      setUnfollowedUsers(unfollowedUsersResponse)
      console.log('unfollowedUsersResponse: ', unfollowedUsersResponse)
    }

    getUnfollowedUsers()
  }, [])

  return (
    <aside className="hidden h-fit w-full rounded-md bg-white p-4 xl:inline-block">
      <h3 className="text-xl font-bold">A quién seguir...</h3>

      <section className="mt-2 flex flex-col gap-2">
        {unfollowedUsers &&
          unfollowedUsers.map(
            ({
              id: userId,
              username,
              fullname,
              avatarUrl,
              email,
              followed,
              followersCount,
              role,
            }) => {
              return (
                <FollowCard
                  avatarUrl={avatarUrl}
                  fullname={fullname}
                  followed={followed}
                  userId={userId}
                  username={username}
                  key={userId}
                />
              )
            },
          )}
      </section>
    </aside>
  )
}
