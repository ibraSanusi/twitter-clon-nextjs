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
    <div>
      <ul className="flex flex-row gap-2">
        <li className="flex w-20 flex-col items-center justify-center border-b-2 border-b-black">
          <Link href="/pages/home" className="flex flex-col items-center">
            <HomeIcon className="w-6" />
            <span className="text-xs">Inicio</span>
          </Link>
        </li>
        <li className="flex w-20 flex-col items-center justify-center">
          <Link href="" className="flex flex-col items-center">
            <UsersIcon className="w-6 content-center text-gray-600" />
            <span className="text-xs">Mi red</span>
          </Link>
        </li>
        <li className="flex w-20 flex-col items-center justify-center">
          <Link href="" className="flex flex-col items-center">
            <BriefcaseIcon className="w-6 content-center text-gray-600" />
            <span className="text-xs">Guardados</span>
          </Link>
        </li>
        <li className="flex w-20 flex-col items-center justify-center">
          <Link href="/pages/messages" className="flex flex-col items-center">
            <ChatBubbleOvalLeftEllipsisIcon className="w-6 content-center text-gray-600" />
            <span className="text-xs">Mensajes</span>
          </Link>
        </li>
        <li className="flex w-20 flex-col items-center justify-center">
          <Link href="" className="flex flex-col items-center">
            <BellAlertIcon className="w-6 content-center text-gray-600" />
            <span className="text-xs">Notificaciones</span>
          </Link>
        </li>
        <li className="flex w-20 flex-col items-center justify-center">
          <Link href="" className="flex flex-col items-center">
            <Image
              className="scale-100 overflow-hidden rounded-full"
              alt={`Foto de perfil de ${response?.username}`}
              src={`/${response?.avatarUrl}`}
              height={24}
              width={24}
            />
            <span className="text-xs">Yo</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}
