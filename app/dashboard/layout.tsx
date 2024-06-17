'use client'

import React, { useState } from 'react'
import Header from '../ui/dashboard/Header'
import MenuBar from '../ui/dashboard/MenuBar'

const useMenu = () => {
  const [open, setOpen] = useState(false)

  const openMenu = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  return {
    open,
    openMenu,
  }
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { open, openMenu } = useMenu()

  return (
    <section className="">
      <Header openMenu={openMenu} />
      <MenuBar open={open} openMenu={openMenu} />
      <main>{children}</main>
    </section>
  )
}
