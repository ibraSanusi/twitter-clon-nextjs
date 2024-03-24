'use server'

import type { NextApiRequest, NextApiResponse } from 'next'
import { emailSchema } from './schemas'
import { db } from '../services/db'
import { LoginStatus } from './enums'
import { redirect } from 'next/navigation'
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

// Iniciar sesion
export async function login(
  formData: FormData,
  res?: NextApiResponse,
): Promise<number> {
  const validatedFields = emailSchema.safeParse({
    email: formData.get('email'),
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return LoginStatus.ServerError
  }

  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) return LoginStatus.Unauthorized

  const findedUser = await db.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!findedUser) {
    return LoginStatus.Unauthorized
  }

  const userPasswordHash: string = findedUser.password
  const match = await bcrypt.compare(password, userPasswordHash)

  if (match) {
    redirect('/home')
  } else {
    return LoginStatus.Unauthorized
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
