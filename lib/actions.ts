'use server'

import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { db } from '../services/db'
const bcrypt = require('bcrypt')

// Hacer un post
export async function postTweet(formData: FormData) {
  const content = formData.get('content')?.toString()

  if (content) {
    await db.post.create({
      data: {
        content,
      },
    })
  }

  console.log(content)
}

type ResponseData = {
  error?: string
  message?: string
}

// Esquema para el email
const schema = z.object({
  email: z.string({
    invalid_type_error: 'Invalid Email',
  }),
})

// Iniciar sesion
export async function login(formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  // console.log(email, password)

  if (!email || !password) return

  const findedUser = await db.user.findUnique({
    where: {
      email: email,
    },
  })

  // Crear respuesta
  const invalidCredentials = new Response('Credenciales inválidas', {
    status: 401,
    headers: {
      'Content-Type': 'text/plain',
    },
  })

  const validCredentials = new Response('Inicio de sesión correctamente', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  })

  if (!findedUser) {
    return invalidCredentials
  }

  const userPasswordHash: string = findedUser.password
  const match = await bcrypt.compare(password, userPasswordHash)

  if (match) {
    // console.log('Inicio de sesión correctamente')

    return validCredentials
  } else {
    return invalidCredentials
  }
}

// Registrarse
export async function register(formData: FormData) {
  const fullname = formData.get('fullname')?.toString()
  const username = formData.get('username')?.toString()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  const hashedPassword = await bcrypt.hash(password, 10)
  hashedPassword.toString()

  const data = { fullname, username, email, password }

  if (fullname && username && email && hashedPassword) {
    await db.user.create({
      data: {
        email,
        fullname,
        username,
        password: hashedPassword,
      },
    })
  }

  console.log(email, fullname, username, password)
}
