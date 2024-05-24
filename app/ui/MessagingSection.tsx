'use client'

import { UsersFollowed } from '@/lib/interfaces'
import React, { useEffect, useState } from 'react'
import ChatHistorySection from './ChatHistorySection'
import ChatSection from './ChatSection'

export default function MessagingSection() {
  const [usersFollowed, setUsersFollowed] = useState<UsersFollowed[]>()

  useEffect(() => {
    const getUsersFollowed = async () => {
      const response = await fetch('/api/get/following')

      if (!response.ok) {
        console.log(
          'No se pudo recuperar los usuarios seguidos por el usuario en sesion ',
        )
        return
      }

      const usersFollowedResponse: UsersFollowed[] = await response.json()
      console.log('usersFollowedResponse: ', usersFollowedResponse)

      setUsersFollowed(usersFollowedResponse)
    }

    getUsersFollowed()
  }, [])

  return (
    <section className="flex h-full flex-row">
      <ChatHistorySection usersFollowed={usersFollowed} />
      <ChatSection />
    </section>
  )
}
