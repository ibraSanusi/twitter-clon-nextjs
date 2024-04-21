'use client'

import Image from 'next/image'
import NavLinks from './NavLinks'
import { signOut } from 'next-auth/react'

interface props {
  className: string
}

export default function SideBar({ className }: props) {
  return (
    <section className={className}>
      <header className="w-full mb-8 flex flex-col gap-1 justify-center items-center">
        <Image
          src="/delba_oliveira.webp"
          alt="Imagen de perfil de delba TODO"
          width={80}
          height={80}
          className="rounded-full"
        />
        <strong>Delba Oliveira</strong>
        <span className="text-sm">@delba.dev</span>
      </header>

      <NavLinks />

      <footer>
        {/* TODO: mejorar diseno */}
        <button
          className="py-2 px-4 bg-orange-200 rounded-xl"
          onClick={() => {
            signOut()
          }}
        >
          SignOut
        </button>
      </footer>
    </section>
  )
}
