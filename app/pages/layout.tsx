'use client'

import SideBar from '@/app/ui/SideBar'
import { SessionProvider } from 'next-auth/react'
import HomeRigthSideBar from '@/app/ui/HomeRigthSideBar'
import Header from '@/app/ui/Header'
import { useEffect } from 'react'
import { User } from '@/lib/interfaces'
import { useUserResponse } from '../hooks/useResponse'
import {
  UserResponseContext,
  UserResponseProvider,
} from '@/app/context/ResponseContext'

function LayoutSqueleton({ children }: { children: React.ReactNode }) {
  const { response, addResponse } = useUserResponse()
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/get/user')
      const userInSession: User = await res.json()

      console.log('userInSession: ', userInSession)

      // Setear el resultado en el contexto para que todas las rutas tengan la informacion del usuario en sesion
      if (response === undefined) {
        addResponse(userInSession)
      }
    }

    fetchData()
  }, [addResponse, response])

  useEffect(() => {
    console.log('userContextResponse: ', response)
  }, [response])

  return (
    <section className="bg-[#f7f3eb] pb-6">
      {/* <div className="absolute top-0 -z-10 h-full w-full bg-[#f4f2ee]">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(247,90,90,0.5)] opacity-50 blur-[80px]"></div>
      </div> */}
      <Header />

      {/* TODO: Convertirlo a un fragmento */}
      <section className="m-auto mt-6 flex w-full flex-row gap-8 pt-[55px] xl:max-w-[1128px]">
        {children}
      </section>

      <footer></footer>
    </section>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserResponseProvider>
        <LayoutSqueleton>{children}</LayoutSqueleton>
      </UserResponseProvider>
    </SessionProvider>
  )
}
