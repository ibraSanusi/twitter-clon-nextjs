'use client'

import { useUserResponse } from '@/app/hooks/useResponse'
import SideBar from '@/app/ui/SideBar'
import TweetCards from '@/app/ui/TweetCards'
import PostSection from '@/app/ui/PostSection'
import { banger } from '@/app/ui/fonts'
import {
  Bars3CenterLeftIcon,
  CalendarDaysIcon,
  PhotoIcon,
} from '@heroicons/react/16/solid'
import Image from 'next/image'
import TweetsSection from '@/app/ui/TweetsSection'
import UsersToFollow from '@/app/ui/UsersToFollow'

export default function Page() {
  const { response } = useUserResponse()

  return (
    <>
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
    </>
  )
}
