import db from '@/services/db'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<Response> {
  // TODO: Obtener los post de los usuarios a los que sigue de la base de datos
  const userEmail = await request.text()

  if (!userEmail) {
    return new Response('El correo electrónico del usuario es requerido', {
      status: 400,
    })
  }

  const user = await db.user.findUnique({
    where: {
      email: userEmail,
    },
  })

  if (!user) {
    return new Response('Usuario no encontrado', { status: 404 })
  }

  // Sacar a los usuario a los que sigue para poder mostrar sus tweets
  // 1. Sacar a los usuarios a los que sigue
  const followingUsers = await db.follow.findMany({
    where: {
      followingId: user.id,
    },
  })

  if (!followingUsers) {
    return new Response(userEmail + ' no sigue a nadie.', { status: 400 })
  }

  // TODO: exportar el tipo
  let lastUserFollowingTweets: {
    id: string
    content: string
    createdAt: Date
    updatedAt: Date
    userId: string
  }[] = []

  // 2. Obtener el ultimo tweet de cada usuario al que sigue
  //   TODO: CREAR EL API PARA SEGUIR OTRO USUARIO
  console.log('followingUsers.length: ', followingUsers)
  followingUsers.map(async (followingUser) => {
    const followingUserId = followingUser.id
    const lastUserFollowingTweet = await db.post.findFirstOrThrow({
      where: {
        id: followingUserId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    console.log(
      'id: ',
      lastUserFollowingTweet.id,
      ' content: ',
      lastUserFollowingTweet.content,
    )

    lastUserFollowingTweets.push(lastUserFollowingTweet)
  })

  return new Response(JSON.stringify(lastUserFollowingTweets), { status: 200 })
}
