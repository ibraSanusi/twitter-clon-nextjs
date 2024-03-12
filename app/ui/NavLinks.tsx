'use client'

import {
  HomeIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/16/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentType } from 'react'

export default function NavLinks() {
  const pathname = usePathname()
  const links: {
    name: string
    href: string
    icon: ComponentType
  }[] = [
    {
      name: 'Home',
      href: '/home',
      icon: HomeIcon,
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: UserIcon,
    },
    {
      name: 'Explore',
      href: '/explore',
      icon: MagnifyingGlassIcon,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: WrenchScrewdriverIcon,
    },
    {
      name: 'Messages',
      href: '/messages',
      icon: PaperAirplaneIcon,
    },
  ]
  return (
    <div className="flex flex-col gap-3">
      {links.map((link, index) => {
        const LinkIcon: ComponentType = link.icon
        return (
          <Link
            href={link.href}
            key={index}
            className={clsx(
              'list-none flex flex-row gap-3 items-center px-4 py-2 rounded-2xl font-bold hover:bg-black hover:text-white',
              {
                'bg-black text-white hover:bg-black': pathname === link.href,
              }
            )}
          >
            <div className="size-8">
              <LinkIcon />
            </div>
            {link.name}
          </Link>
        )
      })}
    </div>
  )
}
