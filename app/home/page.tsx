import TweetCards from '../ui/TweetCards'
import TweetPost from '../ui/TweetPost'
import { banger } from '../ui/fonts'

export default function Page() {
  return (
    <>
      <div className="flex flex-row justify-between mb-6">
        <h1 className={`${banger.className} text-2xl font-bold`}>Feeds</h1>
        <div className="flex flex-row gap-4 font-bold">
          <span className="text-black">Friends</span>
          <span className="text-gray-300">Popular</span>
        </div>
      </div>

      <TweetPost />

      <section className="flex flex-col gap-3 mt-6">
        <TweetCards />
      </section>
    </>
  )
}
