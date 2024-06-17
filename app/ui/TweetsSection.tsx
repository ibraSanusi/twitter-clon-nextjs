import { TweetResponse } from '@/lib/interfaces'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import TweetCardInteractions from './TweetCardInteractions'
import TweetCardHeader from './TweetCardHeader'
import CommentSection from './CommentSection'
import { IconButton, Skeleton } from '@mui/material'
import { GridMoreVertIcon } from '@mui/x-data-grid'

interface Props {
  tweets?: TweetResponse[]
}

export default function TweetsSection({ tweets }: Props) {
  return (
    <section className="flex flex-col gap-4">
      {tweets ? (
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
        )
      ) : (
        <article className="flex w-full flex-col gap-6 rounded-xl bg-white xl:min-w-[555px] xl:max-w-[555px]">
          <header className="flex flex-row gap-4 p-4">
            <Skeleton
              animation="wave"
              variant="circular"
              width={64}
              height={56.15}
            />
            <div className="flex w-full flex-col justify-center">
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={10}
                width="40%"
                style={{ marginBottom: 6 }}
              />
            </div>
          </header>
          <Skeleton
            sx={{ height: 330 }}
            animation="wave"
            variant="rectangular"
          />
          <div className="w-full p-4">
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              width="40%"
              style={{ marginBottom: 6 }}
            />
          </div>
        </article>
      )}
    </section>
  )
}
