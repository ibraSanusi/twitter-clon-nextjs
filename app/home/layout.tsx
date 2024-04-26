'use client'

import SideBar from '@/app/ui/SideBar'
import { SessionProvider } from 'next-auth/react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <main className="grid grid-cols-layout max-w-[1300px] m-auto">
        <SideBar className="px-6 py-4 h-screen w-80" />
        <section className="flex flex-col px-6 py-4">{children}</section>
        {/* <SideBar className="px-6 py-4 h-screen w-80" /> */}
      </main>
    </SessionProvider>
  )
}
