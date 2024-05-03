'use client'

import SideBar from '@/app/ui/SideBar'
import { SessionProvider } from 'next-auth/react'
import HomeRigthSideBar from '../ui/HomeRigthSideBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <main className="m-auto grid max-w-[1300px] grid-cols-layout">
        <SideBar className="h-screen w-80 px-6 py-4" />
        <section className="flex flex-col px-6 py-4">{children}</section>
        <HomeRigthSideBar className="flex flex-col px-6 py-4" />
      </main>
    </SessionProvider>
  )
}
