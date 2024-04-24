import TweetCards from '@/app/ui/TweetCards'
import TweetPost from '@/app/ui/TweetPost'
import { banger } from '@/app/ui/fonts'

export default function Page() {
  return (
    <>
      <section className="flex flex-row justify-between mb-6">
        <h1 className={`${banger.className} text-2xl font-bold`}>Feeds</h1>
        <div className="flex flex-row gap-4 font-bold">
          <span className="text-black">Friends</span>
          <span className="text-gray-300">Popular</span>
        </div>
      </section>

      <TweetPost />

      <section className="flex flex-col gap-3 mt-6">
        <TweetCards />
      </section>
    </>
  )
}
