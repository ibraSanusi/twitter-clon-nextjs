'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  BellAlertIcon,
  BriefcaseIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { useUserResponse } from '../hooks/useResponse'

export default function HeaderNav() {
  const { response } = useUserResponse()

  // TODO: Ajustar la barra que indica en que ruta esta.
  return (
    <div className="flex flex-row items-center">
      <ul className="flex flex-row items-center xl:gap-2">
        <li className="flex w-14 flex-col items-center justify-center xl:w-20 xl:border-b-2 xl:border-b-black">
          <Link href="/pages/home" className="flex flex-col items-center">
            <HomeIcon className="w-6" />
            <span className="hidden text-xs xl:inline-block">Inicio</span>
          </Link>
        </li>
        <li className="flex w-14 flex-col items-center justify-center xl:w-20">
          <Link href="" className="flex flex-col items-center">
            <UsersIcon className="w-6 content-center text-gray-600" />
            <span className="hidden text-xs xl:inline-block">Mi red</span>
          </Link>
        </li>
        <li className="flex w-14 flex-col items-center justify-center xl:w-20">
          <Link href="" className="flex flex-col items-center">
            <BriefcaseIcon className="w-6 content-center text-gray-600" />
            <span className="hidden text-xs xl:inline-block">Guardados</span>
          </Link>
        </li>
        <li className="flex w-14 flex-col items-center justify-center xl:w-20">
          <Link href="/pages/messages" className="flex flex-col items-center">
            <ChatBubbleOvalLeftEllipsisIcon className="w-6 content-center text-gray-600" />
            <span className="hidden text-xs xl:inline-block">Mensajes</span>
          </Link>
        </li>
        <li className="flex w-14 flex-col items-center justify-center xl:w-20">
          <Link href="" className="flex flex-col items-center">
            <BellAlertIcon className="w-6 content-center text-gray-600" />
            <span className="hidden text-xs xl:inline-block">
              Notificaciones
            </span>
          </Link>
        </li>
        <li className="ml-4 flex flex-col items-center justify-center xl:ml-0 xl:w-20">
          <Link href="" className="flex flex-col items-center">
            {response?.avatarUrl ? (
              <Image
                className="scale-100 overflow-hidden rounded-full"
                alt={`Foto de perfil de ${response?.username}`}
                src={`/${response?.avatarUrl}`}
                height={24}
                width={24}
              />
            ) : (
              <Image
                className="scale-100 overflow-hidden rounded-full"
                alt={`Foto de perfil de ${response?.username}`}
                src="/default-avatar.jpg"
                height={24}
                width={24}
              />
            )}
            <span className="hidden text-xs xl:inline-block">Yo</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}
