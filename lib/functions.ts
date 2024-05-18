import { CommentFormatted, RetweetsFormatted } from '@/lib/interfaces'
import db from '@/services/db'

export async function getCommentsForPost(
  id: string,
): Promise<CommentFormatted[] | undefined> {
  const comments = await db.comment.findMany({
    where: {
      author: id,
    },
  })

  const commentsReformatted: CommentFormatted[] | undefined = []
  comments.map(
    async ({ author, content, createdAt, id, tweetId, mediaUrls }) => {
      const user = await db.user.findUnique({
        where: {
          id: author,
        },
        select: {
          avatarUrl: true,
          username: true,
        },
      })

      if (!user) {
        return undefined
      }

      const liked = await checkIfPostLiked(id, author)
      const reposted = await checkIfPostReposted(id, author)

      const likeCount = await countLikesForPost(id)
      // const commentCount = comments.length
      const retweets = await getPostRetweets(id)

      const repostCount = retweets?.length ?? 0

      const commentReformatted: CommentFormatted = {
        tweetId,
        avatarUrl: user.avatarUrl ?? '/default-avatar.jpg',
        username: user.username,
        createdAt,
        content,
        mediaUrls,
        liked,
        reposted,
        likeCount,
        repostCount,
      }
      commentsReformatted.push(commentReformatted)
    },
  )

  return commentsReformatted
}

export async function getPostRetweets(
  tweetId: string,
): Promise<RetweetsFormatted[] | undefined> {
  const retweets = await db.retweet.findMany({
    where: {
      tweetId,
    },
  })

  if (!retweets) {
    return undefined
  }

  console.log('retweets: ', retweets.length)

  return retweets
}

export async function checkIfPostLiked(
  tweetId: string,
  userId: string,
): Promise<boolean> {
  // 1. Comprobar si el post esta en LIKE y si el usuario en sesion le ha dado like
  const like = await db.like.findFirst({
    where: {
      userId,
      AND: {
        tweetId,
      },
    },
  })

  return like ? true : false
}

export async function checkIfPostReposted(
  tweetId: string,
  userId: string,
): Promise<boolean> {
  // 1. Comprobar si el post esta en LIKE y si el usuario en sesion le ha dado like
  const retweet = await db.retweet.findFirst({
    where: {
      tweetId,
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
      tweetId: id,
    },
  })

  const likeCount = like.length
  return likeCount
}
