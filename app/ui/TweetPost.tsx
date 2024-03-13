import { FaceSmileIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import Multimedia from './Multimedia'

export default function TweetPost() {
  return (
    <form className="flex flex-col p-8 bg-gray-300 gap-2 rounded-xl" action="#">
      <div className="flex flex-row gap-3 bg-white items-center pr-2 pl-1 py-1 rounded-3xl">
        <Image
          className="rounded-full"
          src="/delba_oliveira.webp"
          alt="Avatar de usuario (EN SESION)"
          width={30}
          height={30}
        />
        <textarea
          className={`w-full outline-none resize-none`}
          rows={1}
          placeholder="Share something"
        ></textarea>
        <div className="size-6 text-gray-500">
          <FaceSmileIcon />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-6">
          <Multimedia />
        </div>
        <button className="py-2 px-8 bg-black text-white rounded-3xl">
          Post
        </button>
      </div>
    </form>
  )
}
