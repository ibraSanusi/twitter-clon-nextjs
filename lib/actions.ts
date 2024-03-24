'use server'

import { emailSchema } from './schemas'
import { db } from '../services/db'
import { LoginStatus } from './enums'
import { redirect } from 'next/navigation'
import { ResponseData } from './interfaces'
const bcrypt = require('bcrypt')

const UNAUTHORIZED_MESSAGE =
  'El nombre de tu cuenta o la contraseña son incorrectos.'
const SERVER_ERROR_MESSAGE = 'Error en el servidor.'

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
export async function login(formData: FormData): Promise<ResponseData> {
  const emailData = formData.get('email')
  const passwordData = formData.get('password')

  const validatedFields = emailSchema.safeParse({
    email: emailData,
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      code: LoginStatus.ServerError,
      message: SERVER_ERROR_MESSAGE,
    }
  }

  const email = emailData?.toString()
  const password = passwordData?.toString()

  if (!email || !password)
    return {
      code: LoginStatus.ServerError,
      message: UNAUTHORIZED_MESSAGE,
    }

  const findedUser = await db.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!findedUser) {
    return {
      code: LoginStatus.ServerError,
      message: UNAUTHORIZED_MESSAGE,
    }
  }

  const userPasswordHash: string = findedUser.password
  const match = await bcrypt.compare(password, userPasswordHash)

  if (match) {
    redirect('/home')
  } else {
    return {
      code: LoginStatus.ServerError,
      message: UNAUTHORIZED_MESSAGE,
    }
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
