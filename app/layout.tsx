import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { exo2 } from './ui/fonts'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Radio Patio',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // TODO: PORVEER A TODA LA APLICACION DE LA SESSION
  return (
    <html lang="en">
      <body className={`${exo2.className} antialiased`}>{children}</body>
    </html>
  )
}
