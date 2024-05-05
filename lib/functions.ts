import { CommentFormatted, RetweetsFormatted } from '@/lib/interfaces'
import db from '@/services/db'

export async function getCommentsForPost(
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

export async function getRetweetsForPost(
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

export async function checkIfPostLiked(
  postId: string,
  userId: string,
): Promise<boolean> {
  // 1. Comprobar si el post esta en LIKE y si el usuario en sesion le ha dado like
  const like = await db.like.findFirst({
    where: {
      userId,
      AND: {
        postId,
      },
    },
  })

  return like ? true : false
}

export async function checkIfPostReposted(
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

export async function countLikesForPost(id: string): Promise<number> {
  // Obtener de la tabla like los likes del tweet (id)
  const like = await db.like.findMany({
    where: {
      postId: id,
    },
  })

  const likeCount = like.length
  return likeCount
}
