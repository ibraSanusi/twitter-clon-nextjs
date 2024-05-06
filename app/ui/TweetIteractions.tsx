import { ArrowPathIcon, HeartIcon } from '@heroicons/react/20/solid'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { ComponentType, FormEvent, useState } from 'react'

interface InteractionButtons {
  count: number
  icon: ComponentType
  liked?: boolean
  reposted?: boolean
}

interface Props {
  likesCount: number
  repostsCount: number
  commentsCount: number
  liked: boolean
  reposted: boolean
  tweetId: string
}

export default function TweetIteractions({
  likesCount,
  repostsCount,
  commentsCount,
  liked,
  reposted,
  tweetId,
}: Props) {
  const [like, setLike] = useState(false)
  const interactionButtons: InteractionButtons[] = [
    {
      count: commentsCount,
      icon: ChatBubbleLeftRightIcon,
    },
    {
      count: likesCount,
      icon: HeartIcon,
      liked,
    },
    {
      count: repostsCount,
      icon: ArrowPathIcon,
      reposted,
    },
  ]
  // TODO: CREAR FORMULARIO PARA LIKE, REPOST Y COMMENT
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const postId: string = e.currentTarget.interaction.value

    const likePost = { postId }
    const likeResponse = await fetch('/api/post/like', {
      method: 'POST',
      body: JSON.stringify(likePost),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (likeResponse.status === 201) {
      setLike(true)
    }
  }
  return (
    <section className="flex flex-row gap-2">
      {interactionButtons.map((interaction) => {
        const ButtonIcon: ComponentType = interaction.icon

        return (
          <>
            <form key={tweetId} onSubmit={handleSubmit}>
              <input
                type="text"
                className="hidden"
                value={tweetId}
                id="interaction"
              />
              <button
                key={interaction.count}
                className={clsx(
                  'flex flex-row items-center gap-1 hover:text-red-500',
                  {
                    'text-red-500': interaction?.liked || interaction?.reposted,
                    'text-slate-600':
                      !interaction?.liked && !interaction?.reposted,
                  },
                )}
              >
                <div className="size-4">
                  <ButtonIcon />
                </div>
                <span className="text-sm">{interaction.count}</span>
              </button>
            </form>
          </>
        )
      })}
    </section>
  )
}
