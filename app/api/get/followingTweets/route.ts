import {
  checkIfPostLiked,
  checkIfPostReposted,
  countLikesForPost,
  getCommentsForPost,
  getRetweetsForPost,
} from '@/lib/functions'
import db from '@/services/db'
import { NextRequest } from 'next/server'
import { decode } from 'next-auth/jwt'

export async function GET(request: NextRequest): Promise<Response> {
  // Obtener el token JWT de la cookie
  const token = request.cookies.get('next-auth.session-token')?.value

  if (!token) {
    return new Response('No se encontró el token de sesión', { status: 401 })
  }

  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) {
    return new Response('No se encontró el secreto.', { status: 401 })
  }

  // Decodificar el token JWT para obtener los detalles de la sesión
  const decodedToken = await decode({
    token: token,
    secret: secret,
  })

  if (!decodedToken) {
    return new Response('Token de sesión inválido', { status: 401 })
  }

  // TODO: Verificar si el token ha expirado
  // if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
  //   return new Response('La sesión ha expirado', { status: 401 })
  // }

  // Obtener el correo electrónico del usuario de la sesión
  const userEmail = decodedToken.email

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

  const userSessionId = user.id

  const follows = await db.follow.findMany({
    where: {
      followerId: user.id,
    },
  })

  if (!follows || follows.length === 0) {
    return new Response(userEmail + ' no sigue a nadie.', { status: 400 })
  }

  const userIds = follows.map((follow) => follow.followingId)

  const followingUsersLastTweets = await db.tweet.findMany({
    where: {
      author: {
        in: userIds,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: userIds.length,
  })

  if (!followingUsersLastTweets || followingUsersLastTweets.length === 0) {
    return new Response(
      'No se encontraron publicaciones para los usuarios seguidos.',
      { status: 404 },
    )
  }

  const followingTweetsFormatted = await Promise.all(
    followingUsersLastTweets.map(
      async ({ id, author, content, createdAt, mediaUrls }) => {
        const user = await db.user.findUnique({
          where: {
            id: author,
          },
          select: {
            avatarUrl: true,
            username: true,
          },
        })

        const [comments, retweets, liked, reposted, likeCount] =
          await Promise.all([
            getCommentsForPost(id),
            getRetweetsForPost(id),
            checkIfPostLiked(id, userSessionId),
            checkIfPostReposted(id, userSessionId),
            countLikesForPost(id),
          ])

        const commentCount = comments?.length ?? 0
        const repostCount = retweets?.length ?? 0

        if (!user) {
          return
        }

        return {
          id,
          author,
          avatarUrl: user.avatarUrl,
          username: user.username ?? 'Unknown',
          createdAt,
          content,
          mediaUrls,
          liked,
          reposted,
          likeCount,
          repostCount,
          comments,
          commentCount,
        }
      },
    ),
  )

  return new Response(JSON.stringify(followingTweetsFormatted), { status: 200 })
}
