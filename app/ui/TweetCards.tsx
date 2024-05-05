import Image from 'next/image'
import TweetIteractions from './TweetIteractions'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { PostResponse } from '@/lib/interfaces'

export default function TweetCards() {
  const { data: session, status } = useSession()
  const [tweetCreatedAt, setTweetCreatedAt] = useState<string>()
  const [posts, setPosts] = useState<PostResponse[]>()

  // RECUPERAR LOS TWEETS DE LA BASE DE DATOS
  useEffect(() => {
    async function fetchData() {
      if (status === 'authenticated' && session?.user) {
        // 2. Recuperar el email
        const email = { email: session.user.email }
        const response = await fetch('/api/get/followingTweets', {
          method: 'POST',
          body: JSON.stringify(email),
        })

        const data: PostResponse[] = await response.json()

        setPosts(data)

        // Supongamos que tienes el timestamp en formato ISO 8601
        const timestampISO8601: string = '2024-05-03T14:22:13.295Z'

        // Convertir el timestamp a un objeto Date
        const publicationDate: Date = new Date(timestampISO8601)

        // Obtener la fecha y hora actual
        const now: Date = new Date()

        // Calcular la diferencia en milisegundos
        const timeDifferenceMs: number =
          now.getTime() - publicationDate.getTime()

        // Convertir la diferencia de milisegundos a segundos, minutos, horas, días, meses y años
        const seconds: number = Math.floor(timeDifferenceMs / 1000)
        const minutes: number = Math.floor(seconds / 60)
        const hours: number = Math.floor(minutes / 60)
        const days: number = Math.floor(hours / 24)
        const months: number = Math.floor(days / 30)
        const years: number = Math.floor(months / 12)

        // Crear un mensaje para mostrar la diferencia de tiempo
        // TODO: ADAPTAR EL MENSAJE PARA PONERLO EN EL TWEET
        if (years > 0) {
          const message = `${years} año${years > 1 ? 's' : ''}, `
          setTweetCreatedAt(message)
        } else if (months > 0) {
          const message = `${months} mes${months > 1 ? 'es' : ''}, `
          setTweetCreatedAt(message)
        } else if (days > 0) {
          const message = `${days} día${days > 1 ? 's' : ''}, `
          setTweetCreatedAt(message)
        } else if (hours > 0) {
          const message = `${hours} hora${hours > 1 ? 's' : ''}, `
          setTweetCreatedAt(message)
        } else if (minutes > 0) {
          const message = `${minutes} minuto${minutes > 1 ? 's' : ''}, `
          setTweetCreatedAt(message)
        } else if (seconds > 0) {
          const message = `${seconds} segundo${seconds > 1 ? 's' : ''}`
          setTweetCreatedAt(message)
        }

        // console.log(`El post fue publicado hace ${tweetCreatedAt}`)
      }
    }
    fetchData()
  }, [status, session?.user])

  return (
    posts &&
    posts.map(
      ({
        id,
        userId,
        username,
        avatarUrl,
        commentCount,
        content,
        createdAt,
        likeCount,
        liked,
        mediaUrl,
        repostCount,
        reposted,
        comments,
      }) => (
        <article
          className="flex flex-col gap-4 rounded-2xl bg-blue-200 p-8"
          key={id}
        >
          <header className="flex flex-row items-center justify-between gap-4">
            <Image
              className="rounded-full"
              // TODO: OBTENER URL DE LA RESPUESTA
              src={`${avatarUrl}`}
              alt="Avatar del usuario del post"
              width={45}
              height={45}
            />
            <div className="w-full">
              <h2 className="text-md font-bold">@{username}</h2>
              {tweetCreatedAt && (
                <span className="text-sm">{tweetCreatedAt}</span>
              )}
            </div>

            {/* TODO: Opciones de los tweets (eliminar, editar o lo que sea...) */}
            <button className="box-border flex w-8 rounded-full border border-slate-500 p-2 text-black">
              <EllipsisVerticalIcon />
            </button>
          </header>

          <p>{content}</p>

          {/* TODO: Aqui irían las imagenes en caso de que el post tuviese */}
          {/* <section></section> */}

          <TweetIteractions
            tweetId={id}
            liked={liked}
            reposted={reposted}
            likesCount={likeCount}
            commentsCount={commentCount}
            repostsCount={repostCount}
          />
        </article>
      ),
    )
  )
}
