import { CommentFormatted, RetweetsFormatted } from '@/lib/interfaces'
import db from '@/services/db'

export async function getCommentsForPost(
  tweetId: string,
): Promise<CommentFormatted[] | undefined> {
  const comments = await db.comment.findMany({
    where: {
      tweetId,
    },
  })

  if (comments.length === 0) {
    return undefined
  }

  const commentsReformatted: (CommentFormatted | undefined)[] =
    await Promise.all(
      comments.map(
        async ({
          author,
          content,
          createdAt,
          id: commentId,
          tweetId,
          mediaUrls,
        }) => {
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

          const liked = await checkIfCommentLiked(commentId, author)
          const reposted = await checkIfCommentReposted(commentId, author)
          const likeCount = await countLikesForComment(commentId)
          const retweets = await getCommentRetweets(commentId)
          const repostCount = retweets?.length ?? 0

          return {
            commentId,
            tweetId,
            avatarUrl: user.avatarUrl ?? '/default-avatar.jpg',
            username: user.username,
            createdAt: createdAt.toISOString(),
            content,
            mediaUrls,
            liked,
            reposted,
            likeCount,
            repostCount,
          }
        },
      ),
    )

  // Filtrar cualquier comentario que haya resultado en undefined
  const filteredComments = commentsReformatted.filter(
    (comment) => comment !== undefined,
  ) as CommentFormatted[]

  // console.log('commentsReformatted: ', JSON.stringify(filteredComments[0]))

  return filteredComments
}

export async function getPostRetweets(tweetId: string): Promise<
  | {
      createdAt: Date
      userId: string
      tweetId: string
    }[]
  | undefined
> {
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

export async function getCommentRetweets(commentId: string): Promise<
  | {
      createdAt: Date
      userId: string
      commentId: string
    }[]
  | undefined
> {
  const commentsReposted = await db.commentRetweet.findMany({
    where: {
      commentId,
    },
  })

  if (!commentsReposted) {
    return undefined
  }

  console.log('commentsReposted: ', commentsReposted.length)

  return commentsReposted
}

export async function checkIfCommentLiked(
  commentId: string,
  userId: string,
): Promise<boolean> {
  // 1. Comprobar si el post esta en LIKE y si el usuario en sesion le ha dado like
  const commentLike = await db.commentLike.findFirst({
    where: {
      userId,
      AND: {
        commentId,
      },
    },
  })

  return commentLike ? true : false
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

export async function checkIfCommentReposted(
  commentId: string,
  userId: string,
): Promise<boolean> {
  const commentReposted = await db.commentRetweet.findFirst({
    where: {
      commentId,
      AND: {
        userId,
      },
    },
  })

  return commentReposted ? true : false
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

export async function countLikesForComment(commentId: string): Promise<number> {
  const like = await db.commentLike.findMany({
    where: {
      commentId,
    },
  })

  const likeCount = like.length
  return likeCount
}

export const getPublishDateFormatted = (timestampISO8601: string) => {
  // Supongamos que tienes el timestamp en formato ISO 8601

  // Convertir el timestamp a un objeto Date
  const publicationDate: Date = new Date(timestampISO8601)

  // Obtener la fecha y hora actual
  const now: Date = new Date()

  // Calcular la diferencia en milisegundos
  const timeDifferenceMs: number = now.getTime() - publicationDate.getTime()

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
    return `${years} año${years > 1 ? 's' : ''} `
  } else if (months > 0) {
    return `${months} mes${months > 1 ? 'es' : ''} `
  } else if (days > 0) {
    return `${days} día${days > 1 ? 's' : ''} `
  } else if (hours > 0) {
    return `${hours} hora${hours > 1 ? 's' : ''} `
  } else if (minutes > 0) {
    return `${minutes} minuto${minutes > 1 ? 's' : ''} `
  } else if (seconds > 0) {
    return `${seconds} segundo${seconds > 1 ? 's' : ''}`
  }
}
