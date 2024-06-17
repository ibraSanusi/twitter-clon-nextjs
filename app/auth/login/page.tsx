'use client'

import LoginForm from '@/app/ui/LoginForm'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <section className="flex h-screen w-full flex-col pt-40 xl:grid xl:grid-cols-2 xl:justify-center xl:py-8 xl:pt-0">
      {/* Left section */}
      <article className="flex w-full justify-center xl:items-end xl:justify-end">
        <div className="pr-[20px] xl:h-[664px] xl:w-[629px] xl:pr-0">
          <h1 className="mb-6 text-4xl font-bold">Sign In to</h1>
          <h2 className="text-3xl">Sintoniza tu onda</h2>
          <div className="flex flex-row">
            <p className="text-pretty pt-4 xl:pt-16">
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
              className="hidden h-[556px] w-[313px] xl:block"
            />
          </div>
        </div>
      </article>

      {/* Right section */}
      <article className="mt-12 flex h-full w-full items-center justify-center xl:mt-0">
        <div className="mx-auto flex h-[700px] w-[369px] flex-col gap-6">
          <h2 className="hidden w-full text-2xl xl:block">Sing In</h2>
          <LoginForm />
        </div>
      </article>
    </section>
  )
}
