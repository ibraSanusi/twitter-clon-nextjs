'use client'

import SideBar from '@/app/ui/SideBar'
import PostSection from '@/app/ui/PostSection'
import TweetsSection from '@/app/ui/TweetsSection'
import UsersToFollow from '@/app/ui/UsersToFollow'

export default function Page() {
  return (
    <section className="m-auto mt-6 flex w-full flex-col gap-8 px-16 pb-6 pt-[55px] xl:max-w-[1128px] xl:flex-row xl:px-0">
      {/* <section className="mb-6 flex flex-row justify-between">
        <h1 className={`${banger.className} text-2xl font-bold`}>Feeds</h1>
        <div className="flex flex-row gap-4 font-bold">
          <span className="text-black">Friends</span>
          <span className="text-gray-300">Popular</span>
        </div>
      </section>

      <TweetPost />

      <section className="mt-6 flex flex-col gap-3">
        <TweetCards />
      </section> */}

      <SideBar />

      <main className="flex flex-col gap-4">
        <PostSection />
        <TweetsSection />
      </main>

      <UsersToFollow />
    </section>
  )
}
