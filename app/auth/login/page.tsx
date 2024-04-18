'use client'

import LoginForm from '@/app/components/forms/LoginForm'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <section className="grid grid-cols-2 justify-center w-full h-screen py-8">
      {/* Left section */}
      <article className="flex items-end justify-end">
        <div className="w-[629px] h-[664px]">
          <h1 className="text-4xl mb-6 font-bold">Sign In to</h1>
          <h2 className="text-3xl">Sintoniza tu onda</h2>
          <div className="flex flex-row">
            <p className="pt-16 text-pretty">
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
              className="w-[313px] h-[556px]"
            />
          </div>
        </div>
      </article>

      {/* Right section */}
      <article className="flex justify-center items-center w-full h-full">
        <div className="flex flex-col gap-6 w-[369px] h-[700px] mx-auto">
          <h2 className="w-full text-2xl">Sing In</h2>
          <LoginForm />
        </div>
      </article>
    </section>
  )
}
