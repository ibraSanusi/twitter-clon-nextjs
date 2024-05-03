'use client'

import TweetCards from '@/app/ui/TweetCards'
import TweetPost from '@/app/ui/TweetPost'
import { banger } from '@/app/ui/fonts'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Page() {
  const { data: session, status } = useSession()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (status === 'authenticated' && session?.user) {
          console.log(session?.user)
          // 2. Recuperar el email
          const userSession = session.user
          const email = userSession?.email

          if (!email) {
            return
          }

          const res = await fetch('/api/get/followingTweets', {
            method: 'POST',
            body: email,
          })

          const data = await res.json()
          // Aquí puedes manejar la respuesta si es necesario
          console.log(data)
        }
      } catch (error) {
        console.error('Error al obtener datos:', error)
      }
    }

    fetchData()
  }, [session, status])

  return (
    <>
      <section className="mb-6 flex flex-row justify-between">
        <h1 className={`${banger.className} text-2xl font-bold`}>Feeds</h1>
        <div className="flex flex-row gap-4 font-bold">
          <span className="text-black">Friends</span>
          <span className="text-gray-300">Popular</span>
        </div>
      </section>

      <TweetPost />

      <section className="mt-6 flex flex-col gap-3">
        <TweetCards />
      </section>
    </>
  )
}
