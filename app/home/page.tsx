'use client'

import TweetCards from '@/app/ui/TweetCards'
import TweetPost from '@/app/ui/TweetPost'
import { banger } from '@/app/ui/fonts'

export default function Page() {
  return (
    <>
      <section className="mb-6 flex flex-row justify-between">
        <h1 className={`${banger.className} text-2xl font-bold`}>Feeds</h1>
        <div className="flex flex-row gap-4 font-bold">
          <span className="text-black">Friends</span>
          <span className="text-gray-300">Popular</span>
        </div>
      </section>

      <TweetPost />

      <section className="mt-6 flex flex-col gap-3">
        <TweetCards />
      </section>
    </>
  )
}
