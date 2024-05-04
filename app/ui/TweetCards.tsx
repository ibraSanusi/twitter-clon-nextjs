import Image from 'next/image'
import TweetIteractions from './TweetIteractions'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { PostResponse } from '@/lib/interfaces'

interface Comment {
  avatarUrl: string
  username: string
  createdAt: string
  content: string
  mediaUrl: string[]
  liked: boolean
  reposted: boolean
  likeCount: number
  repostCount: number
}

// interface PostResponse {
//   avatarUrl: string
//   username: string
//   createdAt: string
//   content: string
//   mediaUrl: string[]
//   liked: boolean
//   reposted: boolean
//   likeCount: number
//   repostCount: number
//   comments: Comment[]
// }

// interface Post {
//   id: string
//   content: string
//   createdAt: Date
//   updatedAt: Date
//   userId: string
// }

// interface UserData {
//   id: string
//   fullname: string
//   email: string
//   username: string
//   password: string
// }

export default function TweetCards() {
  const { data: session, status } = useSession()
  const [tweetCreatedAt, setTweetCreatedAt] = useState<string>()
  const [posts, setPosts] = useState<PostResponse[]>()
  // const posts: PostResponse[] = [
  //   {
  //     avatarUrl: '/kira.jpg',
  //     username: 'Kira',
  //     createdAt: 'hace 2 horas',
  //     content:
  //       'Hi everyone, today I was on the most beautiful mountain in the world 😍, I also want to say hi to Silena, Olya and Davis!',
  //     mediaUrl: ['url_del_media1', 'url_del_media2'],
  //     liked: false,
  //     reposted: false,
  //     likeCount: 10,
  //     repostCount: 5,
  //     comments: [
  //       {
  //         avatarUrl: '/kobe-bryant.jpg',
  //         username: 'Usuario2',
  //         createdAt: 'hace 1 hora',
  //         content:
  //           'I chose a wonderful coffe today, I wanted to tell you what product they have in stock - its a latte with coconut 🥥 milk.. delicious... its really incredibly tasty!!! 🤤',
  //         mediaUrl: [],
  //         liked: true,
  //         reposted: false,
  //         likeCount: 3,
  //         repostCount: 1,
  //       },
  //       // Puedes agregar más comentarios aquí si lo deseas
  //     ],
  //   },
  //   {
  //     avatarUrl: '/kobe-bryant.jpg',
  //     username: 'Kobe Bryant',
  //     createdAt: 'hace 5 horas',
  //     content:
  //       'I chose a wonderful coffe today, I wanted to tell you what product they have in stock - its a latte with coconut 🥥 milk.. delicious... its really incredibly tasty!!! 🤤',
  //     mediaUrl: [],
  //     liked: true,
  //     reposted: false,
  //     likeCount: 20,
  //     repostCount: 8,
  //     comments: [
  //       // Puedes agregar comentarios para este tweet si lo deseas
  //     ],
  //   },
  //   // Puedes agregar más tweets aquí si lo deseas
  // ]

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

        console.log('Response following tweets: ', response)

        const data: PostResponse[] = await response.json()

        setPosts(data)

        console.log('DATA following tweets: ', data)

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
    posts.map((post) => (
      <article
        className="flex flex-col gap-4 rounded-2xl bg-blue-200 p-8"
        key={post.id}
      >
        <header className="flex flex-row items-center justify-between gap-4">
          <Image
            className="rounded-full"
            // TODO: OBTENER URL DE LA RESPUESTA
            // src={`${post.avatarUrl}`}
            src={'/pedro-sanchez.jpg'}
            alt="Avatar del usuario del post"
            width={45}
            height={45}
          />
          <div className="w-full">
            {/* TODO: Por ahora => cambiar a post.username */}
            <h2 className="text-md font-bold">{post.id}</h2>
            {tweetCreatedAt && (
              <span className="text-sm">{tweetCreatedAt}</span>
            )}
          </div>

          {/* TODO: Opciones de los tweets (eliminar, editar o lo que sea...) */}
          <button className="box-border flex w-8 rounded-full border border-slate-500 p-2 text-black">
            <EllipsisVerticalIcon />
          </button>
        </header>

        <p>{post.content}</p>

        {/* TODO: Aqui irían las imagenes en caso de que el post tuviese */}
        {/* <section></section> */}

        <TweetIteractions />
      </article>
    ))
  )
}
