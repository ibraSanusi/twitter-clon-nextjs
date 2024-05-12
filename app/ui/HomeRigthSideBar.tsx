import Image from 'next/image'
import React, { FormEvent, MouseEventHandler, useEffect, useState } from 'react'

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
  const [unfollowedUsers, setUnfollowedUsers] = useState<UserData[]>([])

  // Seguir al usuario
  const handleFollow: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    const followingId: string = e.currentTarget.id

    console.log('Siguiendo a... => ', followingId)

    // Seguir al usuario
    // 2. Recuperar el email
    const postData = { followingId }

    // Si se ha seguido correctamente al usuario
    console.log('e.currentTarget: ', e.currentTarget)
    const buttonValue = e.currentTarget
    switch (buttonValue.innerHTML) {
      case 'Seguir':
        const followResponse = await fetch('/api/post/follow', {
          method: 'POST',
          body: JSON.stringify(postData),
        })

        if (!followResponse.ok) {
          return
        }

        buttonValue.innerHTML = 'Seguido'
        const data: UserData[] = await followResponse.json()

        break
      case 'Seguido':
        // TODO: manejar el unfollow del usuario cuando se le de click
        const unfollowResponse = await fetch('/api/post/unfollow', {
          method: 'POST',
          body: JSON.stringify(postData),
        })

        if (!unfollowResponse.ok) {
          return
        }

        buttonValue.innerHTML = 'Seguir'
        break
      default:
        break
    }

    // console.log('DATA follow: ', data)
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/get/unfollowedUsers', {
        method: 'GET',
      })

      const data: UserData[] = await response.json()

      console.log('DATA unfollowed users: ', data)

      setUnfollowedUsers(data)
    }
    fetchData()
  }, [])

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {}

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
            <section className="flex w-full flex-row justify-between">
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
                id={user.id}
                onClick={handleFollow}
                className="rounded-xl bg-orange-200 px-4 py-2"
                type="submit"
              >
                Seguir
              </button>
            </section>
          </article>
        ))}
      </section>
    </section>
  )
}
