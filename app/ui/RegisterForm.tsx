'use client'

import React, { useState } from 'react'
import { register } from '@/lib/actions/auth/register'
import { EyeSlashIcon } from '@heroicons/react/20/solid'
import { EyeIcon } from '@heroicons/react/16/solid'

export default function RegisterForm() {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const handleClick = () => {
    setPasswordVisibility(!passwordVisibility)
  }

  return (
    <form className="flex h-full w-full flex-col gap-4" action={register}>
      <input
        className="rounded-md bg-input p-4 placeholder:text-placeholder focus:outline-none"
        type="text"
        placeholder="Escribe tu email"
        name="email"
        required
      />
      <input
        className="rounded-md bg-input p-4 placeholder:text-placeholder focus:outline-none"
        type="text"
        placeholder="Escribe tu username"
        name="username"
        required
      />
      <input
        className="rounded-md bg-input p-4 placeholder:text-placeholder focus:outline-none"
        type="text"
        placeholder="Escribe tu nombre completo"
        name="fullname"
        required
      />
      <div className="flex flex-row items-center justify-between rounded-md bg-input p-4">
        <input
          className="bg-transparent placeholder:text-placeholder focus:outline-none"
          type={passwordVisibility ? 'text' : 'password'}
          placeholder="Escribe tu contraseña"
          name="password"
          required
        />
        <button
          type="button"
          onClick={handleClick}
          className="size-5 text-placeholder"
        >
          {passwordVisibility ? <EyeIcon /> : <EyeSlashIcon />}
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
      <button className="rounded-md bg-button p-4 text-white" type="submit">
        Registrar
      </button>
    </form>
  )
}
