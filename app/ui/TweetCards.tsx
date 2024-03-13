import Image from 'next/image'
import TweetIteractions from './TweetIteractions'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'

interface Comment {
  avatarUrl: string
  username: string
  time: string
  content: string
  mediaUrl: string[]
  liked: boolean
  reposted: boolean
  likeCount: number
  repostCount: number
}

interface Post {
  avatarUrl: string
  username: string
  time: string
  content: string
  mediaUrl: string[]
  liked: boolean
  reposted: boolean
  likeCount: number
  repostCount: number
  comments: Comment[]
}

export default function TweetCards() {
  const posts: Post[] = [
    {
      avatarUrl: '/kira.jpg',
      username: 'Kira',
      time: 'hace 2 horas',
      content:
        'Hi everyone, today I was on the most beautiful mountain in the world 😍, I also want to say hi to Silena, Olya and Davis!',
      mediaUrl: ['url_del_media1', 'url_del_media2'],
      liked: false,
      reposted: false,
      likeCount: 10,
      repostCount: 5,
      comments: [
        {
          avatarUrl: '/kobe-bryant.jpg',
          username: 'Usuario2',
          time: 'hace 1 hora',
          content:
            'I chose a wonderful coffe today, I wanted to tell you what product they have in stock - its a latte with coconut 🥥 milk.. delicious... its really incredibly tasty!!! 🤤',
          mediaUrl: [],
          liked: true,
          reposted: false,
          likeCount: 3,
          repostCount: 1,
        },
        // Puedes agregar más comentarios aquí si lo deseas
      ],
    },
    {
      avatarUrl: '/kobe-bryant.jpg',
      username: 'Kobe Bryant',
      time: 'hace 5 horas',
      content:
        'I chose a wonderful coffe today, I wanted to tell you what product they have in stock - its a latte with coconut 🥥 milk.. delicious... its really incredibly tasty!!! 🤤',
      mediaUrl: [],
      liked: true,
      reposted: false,
      likeCount: 20,
      repostCount: 8,
      comments: [
        // Puedes agregar comentarios para este tweet si lo deseas
      ],
    },
    // Puedes agregar más tweets aquí si lo deseas
  ]
  return posts.map((post) => (
    <article
      className="flex flex-col gap-4 bg-blue-200 p-8 rounded-2xl"
      key={post.username}
    >
      <header className="flex flex-row justify-between items-center gap-4">
        <Image
          className="rounded-full"
          src={`${post.avatarUrl}`}
          alt="Avatar del usuario del post"
          width={45}
          height={45}
        />
        <div className="w-full">
          <h2 className="font-bold text-md">{post.username}</h2>
          <span className="text-sm">{post.time}</span>
        </div>

        {/* TODO: Opciones de los tweets (eliminar, editar o lo que sea...) */}
        <button className="text-black flex w-8 box-border border border-slate-500 rounded-full p-2">
          <EllipsisVerticalIcon />
        </button>
      </header>

      <p>{post.content}</p>

      {/* TODO: Irian las imagenes en caso de que el post tuviese */}
      {/* <section></section> */}

      <TweetIteractions />
    </article>
  ))
}
