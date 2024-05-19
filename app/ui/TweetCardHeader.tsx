import { GlobeEuropeAfricaIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import DotIcon from '@/app/ui/DotIcon'
import { getPublishDateFormatted } from '@/lib/functions'

interface Props {
  username: string
  fullname: string
  createdAt: string
  avatarUrl: string
}

export default function TweetCardHeader({
  username,
  fullname,
  createdAt,
  avatarUrl,
}: Props) {
  return (
    <section className="flex flex-row items-center justify-between gap-2 p-4">
      <div className="flex flex-row items-center gap-2">
        <Image
          className="scale-100 overflow-hidden rounded-full border-2 border-white"
          alt={`Foto de perfil de ${username}`}
          src={`/${avatarUrl}`}
          height={64}
          width={64}
        />

        <div className="flex flex-col">
          <h2 className="font-bold">{username}</h2>
          <span className="text-xs">{fullname}</span>
          <span className="flex flex-row items-center gap-1 text-xs text-slate-600">
            {getPublishDateFormatted(createdAt)}
            <DotIcon />
            <div className="size-4">
              <GlobeEuropeAfricaIcon />
            </div>
          </span>
        </div>
      </div>
    </section>
  )
}
