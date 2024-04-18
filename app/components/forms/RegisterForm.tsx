import React from 'react'
import { register } from '@/lib/actions/auth/register'
import { EyeSlashIcon } from '@heroicons/react/20/solid'

export default function RegisterForm() {
  return (
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
      <button className="bg-button p-4 rounded-md text-white" type="submit">
        Registrar
      </button>
    </form>
  )
}
