'use client'

import LoginForm from '@/app/ui/LoginForm'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <section className="grid h-screen w-full grid-cols-2 justify-center py-8">
      {/* Left section */}
      <article className="flex items-end justify-end">
        <div className="h-[664px] w-[629px]">
          <h1 className="mb-6 text-4xl font-bold">Sign In to</h1>
          <h2 className="text-3xl">Sintoniza tu onda</h2>
          <div className="flex flex-row">
            <p className="text-pretty pt-16">
              Si no tienes una cuenta puedes registrarte{' '}
              <Link className="text-auth" href="/auth/register">
                aquí!
              </Link>
            </p>

            <Image
              src="/chatter-icon.png"
              alt="Imagen de persona chateando con un movil."
              width={313}
              height={556}
              className="h-[556px] w-[313px]"
            />
          </div>
        </div>
      </article>

      {/* Right section */}
      <article className="flex h-full w-full items-center justify-center">
        <div className="mx-auto flex h-[700px] w-[369px] flex-col gap-6">
          <h2 className="w-full text-2xl">Sing In</h2>
          <LoginForm />
        </div>
      </article>
    </section>
  )
}
