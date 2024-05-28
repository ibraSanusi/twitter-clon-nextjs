import RegisterForm from '@/app/ui/RegisterForm'

import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
  return (
    <section className="grid w-full grid-cols-2 justify-center py-8">
      {/* Left section */}
      <article className="flex items-end justify-end">
        <div className="h-[664px] w-[629px]">
          <h1 className="mb-6 text-4xl font-bold">Sign Up to</h1>
          <h2 className="text-3xl">Sintoniza tu onda</h2>
          <div className="flex flex-row">
            <p className="h-min text-pretty pt-16">
              Si ya tienes una cuenta puedes iniciar sesión{' '}
              <Link className="text-auth" href={'/auth/login'}>
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
          <h2 className="w-full text-2xl">Sing Up</h2>
          <RegisterForm />
        </div>
      </article>
    </section>
  )
}
