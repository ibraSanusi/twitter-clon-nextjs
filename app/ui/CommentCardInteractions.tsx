'use client'

import {
  ArrowPathRoundedSquareIcon,
  ChatBubbleBottomCenterIcon,
  HeartIcon,
} from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

interface Props {
  isLiked: boolean
  likeCount: number
  commentCount: number
  isReposted: boolean
  repostCount: number
  commentId: string
}

export default function CommentCardInteractions({
  isLiked,
  likeCount,
  commentCount,
  isReposted,
  repostCount,
  commentId,
}: Props) {
  const [liked, setLiked] = useState(isLiked)
  const [reposted, setReposted] = useState(isReposted)
  const [repostsCount, setRepostsCount] = useState(repostCount)
  const [likesCount, setLikesCount] = useState(likeCount)

  const handleLikeComment = async () => {
    if (liked) {
      // TODO: GENERAR EL ENDPOINT DE DISLIKE DEL COMENTARIO
      const response = await fetch('/api/post/likeComment', {
        method: 'DELETE',
        body: JSON.stringify({ commentId }),
      })
      if (!response.ok) {
        console.log(
          'Error al eliminar el like del comentario con id: ' + commentId,
        )
        return
      }
      setLiked(!liked)
      setLikesCount(likesCount - 1)
      const dislikeResponse = await response.json()
      console.log('dislikeResponse: ', dislikeResponse)
    } else {
      const response = await fetch('/api/post/likeComment', {
        method: 'POST',
        body: JSON.stringify({ commentId }),
      })

      if (!response.ok) {
        console.log('Error al dar like al comentario con id: ' + commentId)
        return
      }

      setLiked(!liked)
      setLikesCount(likesCount + 1)

      const commentLikeResponse = await response.json()
      console.log('commentLikeResponse: ', commentLikeResponse)
    }
  }

  useEffect(() => {
    console.log('commentId: ', commentId)
  }, [commentId])

  const handleRetweetComment = async () => {
    if (reposted) {
      const response = await fetch('/api/post/retweetComment', {
        method: 'DELETE',
        body: JSON.stringify({ commentId }),
      })
      if (!response.ok) {
        console.log(
          'Error al eliminar el retweet del comentario con id: ' + commentId,
        )
        return
      }
      setReposted(!reposted)
      setRepostsCount(repostsCount - 1)
      const deleteRetweetResponse = await response.json()
      console.log('deleteRetweetResponse: ', deleteRetweetResponse)
    } else {
      // TODO: CREAR EL ENPOINT PARA DAR RETWEET
      const response = await fetch('/api/post/retweetComment', {
        method: 'POST',
        body: JSON.stringify({ commentId }),
      })

      if (!response.ok) {
        console.log('Error al dar retweet al comment con id: ' + commentId)
        return
      }

      setReposted(!reposted)
      setRepostsCount(repostsCount + 1)

      const commentRetweetResponse = await response.json()
      console.log('commentRetweetResponse: ', commentRetweetResponse)
    }
  }

  // TODO: CREAR COMENTARIO DE COMENTARIO

  return (
    <div className="flex flex-row gap-4 py-2">
      <button
        onClick={handleLikeComment}
        className={clsx('flex flex-row items-center gap-1 hover:text-red-500', {
          'text-red-500': liked,
          'text-slate-600': !liked,
        })}
      >
        <div className="size-4">
          <HeartIcon />
        </div>
        <span className="text-sm">{likesCount}</span>
      </button>

      <button
        disabled
        className="flex cursor-not-allowed flex-row items-center gap-1 text-slate-600 hover:text-blue-500"
      >
        <div className="size-4">
          <ChatBubbleBottomCenterIcon />
        </div>
        <span className="text-sm">{commentCount}</span>
      </button>

      <button
        onClick={handleRetweetComment}
        className={clsx(
          'flex flex-row items-center gap-1 hover:text-green-500',
          {
            'text-green-500': reposted,
            'text-slate-600': !reposted,
          },
        )}
      >
        <div className="size-4">
          <ArrowPathRoundedSquareIcon />
        </div>
        <span className="text-sm">{repostsCount}</span>
      </button>
    </div>
  )
}
