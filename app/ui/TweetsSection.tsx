import { TweetResponse } from '@/lib/interfaces'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import TweetCardInteractions from './TweetCardInteractions'
import TweetCardHeader from './TweetCardHeader'
import CommentSection from './CommentSection'

export default function TweetsSection() {
  const [tweets, setTweets] = useState<TweetResponse[]>()
  // Recuperar los tweets de los usuarios a los que sigue el usuario en sesion
  useEffect(() => {
    const getFollowingTweets = async () => {
      const response = await fetch('/api/get/followingTweets')

      if (!response.ok) {
        alert('Error al intentar conseguir los tweets.')
        return
      }

      const followingTweets: TweetResponse[] = await response.json()
      setTweets(followingTweets)

      console.log('followingTweets: ', followingTweets)
    }

    getFollowingTweets()
  }, [])

  return (
    <section className="flex flex-col gap-4">
      {tweets &&
        tweets.map(
          ({
            tweetId,
            userId,
            fullname,
            avatarUrl,
            commentCount,
            content,
            createdAt,
            likeCount,
            liked,
            mediaUrls,
            repostCount,
            reposted,
            username,
            comments,
          }) => {
            return (
              <article
                className="flex w-full flex-col gap-6 rounded-xl bg-white xl:min-w-[555px] xl:max-w-[555px]"
                key={tweetId}
              >
                <TweetCardHeader
                  avatarUrl={avatarUrl}
                  createdAt={createdAt}
                  fullname={fullname}
                  username={username}
                />

                <p className="px-4">{content}</p>

                {mediaUrls.length > 0 && (
                  <Image
                    className="w-full"
                    alt={`Foto de contenido de ${username}`}
                    src={`/${mediaUrls[0]}`}
                    height={0}
                    width={555}
                  />
                )}

                <div className="flex flex-col">
                  <TweetCardInteractions
                    tweetId={tweetId}
                    commentCount={commentCount}
                    likeCount={likeCount}
                    isLiked={liked}
                    repostCount={repostCount}
                    isReposted={reposted}
                  />

                  <CommentSection comments={comments} tweetId={tweetId} />
                </div>
              </article>
            )
          },
        )}
    </section>
  )
}
