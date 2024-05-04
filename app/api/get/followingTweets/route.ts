import { CommentFormatted, RetweetsFormatted } from '@/lib/interfaces'
import db from '@/services/db'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<Response> {
  const body: { email: string } = await request.json()
  const userEmail = body.email

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

  const follows = await db.follow.findMany({
    where: {
      followerId: user.id,
    },
  })

  if (!follows || follows.length === 0) {
    return new Response(userEmail + ' no sigue a nadie.', { status: 400 })
  }

  const userIds = follows.map((follow) => follow.followingId)

  const lastUserFollowingTweets = await db.post.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: userIds.length,
  })

  if (!lastUserFollowingTweets || lastUserFollowingTweets.length === 0) {
    return new Response(
      'No se encontraron publicaciones para los usuarios seguidos.',
      { status: 404 },
    )
  }

  const response = await Promise.all(
    lastUserFollowingTweets.map(async ({ id, userId, content, createdAt }) => {
      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          avatarUrl: true,
          username: true,
        },
      })

      if (!user) {
        return
      }

      const [comments, retweets, liked, reposted, likeCount] =
        await Promise.all([
          getCommentsForPost(id),
          getRetweetsForPost(id),
          checkIfPostLiked(id, userId),
          checkIfPostReposted(id, userId),
          countLikesForPost(id),
        ])

      const commentCount = comments?.length ?? 0
      const repostCount = retweets?.length ?? 0

      return {
        id,
        userId,
        avatarUrl: user.avatarUrl ?? '/default-avatar.jpg',
        username: user.username ?? 'Unknown',
        createdAt,
        content,
        mediaUrl: ['url_del_media1', 'url_del_media2'],
        liked,
        reposted,
        likeCount,
        repostCount,
        comments,
        commentCount,
      }
    }),
  )

  return new Response(JSON.stringify(response), { status: 200 })
}

async function getCommentsForPost(
  id: string,
): Promise<CommentFormatted[] | undefined> {
  const comments = await db.comment.findMany({
    where: {
      userId: id,
    },
  })

  const commentsReformatted: CommentFormatted[] | undefined = []
  comments.map(async ({ userId, content, createdAt, id, postId, mediaUrl }) => {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        avatarUrl: true,
        username: true,
      },
    })

    if (!user) {
      return undefined
    }

    const liked = await checkIfPostLiked(id, userId)
    const reposted = await checkIfPostReposted(id, userId)

    const likeCount = await countLikesForPost(id)
    // const commentCount = comments.length
    const retweets = await getRetweetsForPost(id)

    const repostCount = retweets?.length ?? 0

    const commentReformatted: CommentFormatted = {
      postId,
      avatarUrl: user.avatarUrl ?? '/default-avatar.jpg',
      username: user.username,
      createdAt,
      content,
      mediaUrl,
      liked,
      reposted,
      likeCount,
      repostCount,
    }
    commentsReformatted.push(commentReformatted)
  })

  return commentsReformatted
}

async function getRetweetsForPost(
  id: string,
): Promise<RetweetsFormatted[] | undefined> {
  const retweets = await db.post.findMany({
    where: {
      userId: id,
    },
  })

  if (!retweets) {
    return undefined
  }

  let retweetsFormatted: RetweetsFormatted[] | undefined = []
  retweets.map(async ({ id, userId, content, createdAt, mediaUrl }) => {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return
    }

    const liked = await checkIfPostLiked(id, userId)
    const reposted = await checkIfPostReposted(id, userId)

    const likeCount = await countLikesForPost(id)
    const repostCount = retweets.length

    const retweetFormatted = {
      avatarUrl: user.avatarUrl ?? '/default.jpg',
      username: user.username,
      createdAt,
      content,
      mediaUrl,
      liked,
      reposted,
      likeCount,
      repostCount,
    }
    retweetsFormatted.push(retweetFormatted)
  })

  if (!retweetsFormatted) {
    return undefined
  }

  return retweetsFormatted
}

async function checkIfPostLiked(
  postId: string,
  userId: string,
): Promise<boolean> {
  // 1. Comprobar si el post esta en LIKE y si el usuario en sesion le ha dado like
  const like = await db.like.findFirst({
    where: {
      postId,
      AND: {
        userId,
      },
    },
  })

  return like ? true : false
}

async function checkIfPostReposted(
  postId: string,
  userId: string,
): Promise<boolean> {
  // 1. Comprobar si el post esta en LIKE y si el usuario en sesion le ha dado like
  const retweet = await db.retweet.findFirst({
    where: {
      postId,
      AND: {
        userId,
      },
    },
  })

  return retweet ? true : false
}

async function countLikesForPost(id: string): Promise<number> {
  // Obtener de la tabla like los likes del tweet (id)
  const like = await db.like.findMany({
    where: {
      postId: id,
    },
  })

  const likeCount = like.length
  return likeCount
}
