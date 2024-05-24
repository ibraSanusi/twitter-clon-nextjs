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
  tweetId: string
}

export default function TweetCardInteractions({
  isLiked,
  likeCount,
  commentCount,
  isReposted,
  repostCount,
  tweetId,
}: Props) {
  const [liked, setLiked] = useState(isLiked)
  const [reposted, setReposted] = useState(isReposted)
  const [tweetsCount, setTweetsCount] = useState(repostCount)
  const [likesCount, setLikesCount] = useState(likeCount)

  const handleLike = async () => {
    if (liked) {
      // TODO: GENERAR EL ENDPOINT DE DISLIKE
      // const response = await fetch('/api/delete/like', {
      //   method: 'DELETE',
      //   body: JSON.stringify({ tweetId }),
      // })
      // if (!response.ok) {
      //   alert('Error al eliminar el like del tweet con id: ' + tweetId)
      //   return
      // }
      // setLiked(!liked)
      // setLikesCount(likesCount - 1)
      // const dislikeResponse = await response.json()
      // console.log('dislikeResponse: ', dislikeResponse)
    } else {
      const response = await fetch('/api/post/like', {
        method: 'POST',
        body: JSON.stringify({ tweetId }),
      })

      if (!response.ok) {
        alert('Error al dar like al tweet con id: ' + tweetId)
        return
      }

      setLiked(!liked)
      setLikesCount(likesCount + 1)

      const likeResponse = await response.json()
      console.log('likeResponse: ', likeResponse)
    }
  }

  useEffect(() => {
    console.log('tweetId: ', tweetId)
  }, [tweetId])

  const handleRetweet = async () => {
    if (reposted) {
      // TODO: GENERAR EL ENDPOINT DE ELIMINAR RETWEET
      // const response = await fetch('/api/delete/retweet', {
      //   method: 'DELETE',
      //   body: JSON.stringify({ tweetId }),
      // })
      // if (!response.ok) {
      //   alert('Error al eliminar el retweet del tweet con id: ' + tweetId)
      //   return
      // }
      // setReposted(!reposted)
      // setCommentsCount(commentCount - 1)
      // const deleteRetweetResponse = await response.json()
      // console.log('deleteRetweetResponse: ', deleteRetweetResponse)
    } else {
      // TODO: CREAR EL ENPOINT PARA DAR RETWEET
      const response = await fetch('/api/post/retweet', {
        method: 'POST',
        body: JSON.stringify({ tweetId }),
      })

      if (!response.ok) {
        alert('Error al dar retweet al tweet con id: ' + tweetId)
        return
      }

      setReposted(!reposted)
      setTweetsCount(commentCount + 1)

      const retweetResponse = await response.json()
      console.log('retweetResponse: ', retweetResponse)
    }
  }

  return (
    <div className="flex flex-row gap-4 p-4">
      <button
        onClick={handleLike}
        className={clsx('flex flex-row items-center gap-1 hover:text-red-500', {
          'text-red-500': liked,
          'text-slate-600': !liked,
        })}
      >
        <div className="size-6">
          <HeartIcon />
        </div>
        <span className="text-sm">{likesCount}</span>
      </button>

      <button className="flex flex-row items-center gap-1 text-slate-600 hover:text-blue-500">
        <div className="size-6">
          <ChatBubbleBottomCenterIcon />
        </div>
        <span className="text-sm">{commentCount}</span>
      </button>

      <button
        onClick={handleRetweet}
        className={clsx(
          'flex flex-row items-center gap-1 hover:text-green-500',
          {
            'text-green-500': reposted,
            'text-slate-600': !reposted,
          },
        )}
      >
        <div className="size-6">
          <ArrowPathRoundedSquareIcon />
        </div>
        <span className="text-sm">{tweetsCount}</span>
      </button>
    </div>
  )
}
