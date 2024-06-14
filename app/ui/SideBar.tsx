'use client'

import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { useUserResponse } from '@/app/hooks/useResponse'

export default function SideBar() {
  const { response } = useUserResponse()

  return (
    <aside className="botder-[#DFDEDA] h-fit w-full rounded-xl border-[1px] bg-white pb-4 xl:max-w-[225px]">
      <section className="relative flex w-full flex-col items-center xl:gap-14">
        <div className="userBanner h-full min-h-[56.25px] w-full rounded-t-xl"></div>
        <Image
          className="absolute left-[90.5] top-5 scale-100 overflow-hidden rounded-full border-2 border-white"
          alt={`Foto de perfil de ${response?.username}`}
          src={`/${response?.avatarUrl}`}
          height={64}
          width={64}
        />
        <div className="mt-8 flex flex-col items-center xl:mt-0">
          <h2 className="">{response?.fullname}</h2>
          <span className="text-sm">
            {`${response?.followers.length}`} seguidores
          </span>
        </div>
        <button
          className="mt-2 rounded-xl bg-[#f4f2ee] px-4 py-2 text-xs text-black hover:bg-black hover:text-white xl:mt-0"
          onClick={() => {
            signOut()
          }}
        >
          Cerrar sesion
        </button>
      </section>
    </aside>
    // <section className={className}>
    //   <header className="w-full mb-8 flex flex-col gap-1 justify-center items-center">
    //     <Image
    //       src="/delba_oliveira.webp"
    //       alt="Imagen de perfil de delba TODO"
    //       width={80}
    //       height={80}
    //       className="rounded-full"
    //     />
    //     <strong>Delba Oliveira</strong>
    //     <span className="text-sm">@delba.dev</span>
    //   </header>

    //   <NavLinks />

    //   <footer>
    //     {/* TODO: mejorar diseno */}
    //     <button
    //       className="py-2 px-4 bg-orange-200 rounded-xl"
    //       onClick={() => {
    //         signOut()
    //       }}
    //     >
    //       SignOut
    //     </button>
    //   </footer>
    // </section>
  )
}
