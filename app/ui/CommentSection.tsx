import Image from 'next/image'
import { useUserResponse } from '@/app/hooks/useResponse'
import CommentPostSection from './CommentPostSection'
import { CommentFormatted } from '@/lib/interfaces'
import DotIcon from './DotIcon'
import { getPublishDateFormatted } from '@/lib/functions'
import CommentCardInteractions from './CommentCardInteractions'

interface Props {
  comments: CommentFormatted[] | undefined
  tweetId: string
}

export default function CommentSection({ comments, tweetId }: Props) {
  const { response } = useUserResponse()

  return (
    <section className="p-4">
      <CommentPostSection response={response} tweetId={tweetId} />

      <section className="mt-4 flex flex-col gap-4">
        {comments &&
          comments.map(
            ({
              commentId,
              avatarUrl,
              content,
              createdAt,
              likeCount,
              liked,
              mediaUrls,
              repostCount,
              reposted,
              tweetId,
              username,
            }) => {
              return (
                <article className="flex flex-row gap-1" key={commentId}>
                  <Image
                    className="scale-100 overflow-hidden rounded-full border-2 border-white xl:max-h-[40px] xl:max-w-[40px]"
                    alt={`Foto de perfil de ${username}`}
                    src={`/${avatarUrl}`}
                    height={40}
                    width={40}
                  />
                  <article className="w-full rounded-r-md rounded-bl-md bg-[#F2F2F2] p-2">
                    <section className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center gap-1">
                        <h3 className="font-bold">{username}</h3>
                        <DotIcon />
                        <span className="text-xs">Seguido</span>
                      </div>
                      <span className="text-xs">
                        {getPublishDateFormatted(createdAt)}
                      </span>
                    </section>

                    <p className="mt-2 text-sm">{content}</p>

                    <CommentCardInteractions
                      commentCount={0}
                      isLiked={liked}
                      isReposted={reposted}
                      likeCount={likeCount}
                      repostCount={repostCount}
                      commentId={commentId}
                    />
                  </article>
                </article>
              )
            },
          )}
      </section>
    </section>
  )
}
