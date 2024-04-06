import { register } from '@/lib/actions/register'
import { EyeIcon } from '@heroicons/react/16/solid'
import { EyeSlashIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <section className="grid grid-cols-2 justify-center w-full h-dvh py-8">
      {/* Left section */}
      <article className="flex items-end justify-end">
        <div className="w-[629px] h-[664px]">
          <h1 className="text-4xl mb-6 font-bold">Sign Up to</h1>
          <h2 className="text-3xl">Sintoniza tu onda</h2>
          <div className="flex flex-row">
            <p className="pt-16 text-pretty h-min">
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
              className="w-[313px] h-[556px]"
            />
          </div>
        </div>
      </article>

      {/* Right section */}
      <article className="flex justify-center items-center w-full h-full">
        <div className="flex flex-col gap-6 w-[369px] h-[700px] mx-auto">
          <h2 className="w-full text-2xl">Sing Up</h2>
          <form className="flex flex-col gap-4 w-full h-full" action={register}>
            <input
              className="bg-input p-4 rounded-md placeholder:text-placeholder focus:outline-none"
              type="text"
              placeholder="Escribe tu email"
              name="email"
              required
            />
            <input
              className="bg-input p-4 rounded-md placeholder:text-placeholder focus:outline-none"
              type="text"
              placeholder="Escribe tu username"
              name="username"
              required
            />
            <input
              className="bg-input p-4 rounded-md placeholder:text-placeholder focus:outline-none"
              type="text"
              placeholder="Escribe tu nombre completo"
              name="fullname"
              required
            />
            <div className="flex flex-row justify-between items-center bg-input p-4 rounded-md">
              <input
                className="bg-transparent placeholder:text-placeholder focus:outline-none"
                type="password"
                placeholder="Escribe tu contraseña"
                name="password"
                required
              />
              <button className="size-5 text-placeholder">
                <EyeSlashIcon />
              </button>
            </div>
            {/* <div className="flex flex-row justify-between items-center bg-input p-4 rounded-md">
              <input
                className="bg-transparent placeholder:text-placeholder focus:outline-none"
                type="password"
                placeholder="Confirma la contraseña"
                name="confirmed_password"
                required
              />
              <button className="size-5 text-placeholder">
                <EyeSlashIcon />
              </button>
            </div> */}
            <button
              className="bg-button p-4 rounded-md text-white"
              type="submit"
            >
              Registrar
            </button>
          </form>
        </div>
      </article>
    </section>
  )
}
