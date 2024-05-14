import Image from 'next/image'
import {
  BellAlertIcon,
  BriefcaseIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/16/solid'
import clsx from 'clsx'

export default function HeaderNav() {
  return (
    <div>
      <ul className="flex flex-row gap-2">
        <li
          className={clsx(
            'flex w-20 flex-col items-center justify-center border-b-2',
            {
              'border-b-black': true,
            },
          )}
        >
          <HomeIcon className="w-6" />
          <span className="text-xs">Inicio</span>
        </li>
        <li
          className={clsx('flex w-20 flex-col items-center justify-center', {
            'border-b-2 border-b-black': false,
          })}
        >
          <UsersIcon className="w-6 content-center text-gray-600" />
          <span className="text-xs">Mi red</span>
        </li>
        <li
          className={clsx('flex w-20 flex-col items-center justify-center', {
            'border-b-2 border-b-black': false,
          })}
        >
          <BriefcaseIcon className="w-6 content-center text-gray-600" />
          <span className="text-xs">Guardados</span>
        </li>
        <li
          className={clsx('flex w-20 flex-col items-center justify-center', {
            'border-b-2 border-b-black': false,
          })}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="w-6 content-center text-gray-600" />
          <span className="text-xs">Mensajes</span>
        </li>
        <li
          className={clsx('flex w-20 flex-col items-center justify-center', {
            'border-b-2 border-b-black': false,
          })}
        >
          <BellAlertIcon className="w-6 content-center text-gray-600" />
          <span className="text-xs">Notificaciones</span>
        </li>
        <li
          className={clsx('flex w-20 flex-col items-center justify-center', {
            'border-b-2 border-b-black': false,
          })}
        >
          <Image
            className="scale-100 overflow-hidden rounded-full"
            alt="Foto de perfil de (usuario)"
            src="/jordi-wild.webp"
            height={24}
            width={24}
          />
          <span className="text-xs">Yo</span>
        </li>
      </ul>
    </div>
  )
}
