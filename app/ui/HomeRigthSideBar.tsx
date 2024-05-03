import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { FormEvent, useEffect, useState } from 'react'

interface Props {
  className: string
}

interface UserData {
  id: string
  fullname: string
  email: string
  username: string
  password: string
}

export default function HomeRightSideBar({ className }: Props) {
  const { data: session, status } = useSession()
  const [unfollowedUsers, setUnfollowedUsers] = useState<UserData[]>([])

  // Seguir al usuario
  const handleFollow = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const followingId: string = e.currentTarget.userId.value

    console.log('Siguiendo a... => ', followingId)

    // Seguir al usuario
    if (status === 'authenticated' && session?.user) {
      // 2. Recuperar el email
      const postData = { email: session.user.email, followingId }

      const response = await fetch('/api/post/follow', {
        method: 'POST',
        body: JSON.stringify(postData),
      })

      const data: UserData[] = await response.json()

      console.log('DATA: ', data)

      //TODO: Setear follow a true para cambiar el boton de seguir a seguido
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (status === 'authenticated' && session?.user) {
        // 2. Recuperar el email
        const email = { email: session.user.email }
        // Puedes esperar aquí
        const response = await fetch('/api/get/unfollowedUsers', {
          method: 'POST',
          body: JSON.stringify(email),
        })

        const data: UserData[] = await response.json()

        console.log('DATA: ', data)

        setUnfollowedUsers(data)
      }
    }
    fetchData()
  }, [status, session?.user])

  // TODO: Recuperar todos los usuarios a los que sigue el usuario en sesión
  // TODO: RECUPERAR LA IMAGEN DE LA BASE DE DATOS (url)

  return (
    <section className={className}>
      <h3 className="h-fit text-2xl font-extrabold">Suggestions</h3>
      <section className="flex flex-col">
        {unfollowedUsers.map((user) => (
          <article className="flex flex-row gap-2" key={user.id}>
            <Image
              className="rounded-full"
              src={'/pedro-sanchez.jpg'}
              alt=""
              width={45}
              height={45}
            />
            <form
              onSubmit={handleFollow}
              className="flex w-full flex-row justify-between"
            >
              <input
                className="hidden"
                name="userId"
                value={user.id}
                type="text"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-purple-400">
                  @{user.username}
                </span>
                <span className="text-xs font-extrabold text-purple-400">
                  {user.fullname}
                </span>
              </div>
              <button
                className="rounded-xl bg-orange-200 px-4 py-2"
                type="submit"
              >
                Seguir
              </button>
            </form>
          </article>
        ))}
      </section>
    </section>
  )
}
