'use server'

import { emailSchema } from './schemas'
import { db } from '../services/db'
import { LoginStatus } from './enums'
import { redirect } from 'next/navigation'
import { ResponseData } from './interfaces'
import { NextApiResponse } from 'next'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
}

// Iniciar sesion
export async function login(formData: FormData): Promise<ResponseData> {
  const res = (
    body: string,
    {
      status,
      statusText,
      headers,
    }: { status?: number; statusText?: string; headers?: Headers },
  ) => {
    return new Response(body, { headers, status, statusText })
  }

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

  if (!email || !password) {
    return {
      code: LoginStatus.ServerError,
      message: SERVER_ERROR_MESSAGE,
    }
  }

  const findedUser = await db.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!findedUser) {
    return {
      code: LoginStatus.Unauthorized,
      message: UNAUTHORIZED_MESSAGE,
    }
  }

  const userPasswordHash: string = findedUser.password
  const match = await bcrypt.compare(password, userPasswordHash)

  // Si las credenciales son correctas sacamos el id y el nombre de usuario de la base de datos
  if (match) {
    const { id, username } = findedUser

    const token = jwt.sign(
      {
        id,
        username,
        roles: ['user'],
      },
      'midudev',
      { expiresIn: '1h' },
      { algorithm: 'RS256' },
    )

    return {
      code: LoginStatus.Success,
      message: 'Success',
      token,
    }

    // redirect('/home')

    // // Verificar un token
    // const decoded = jwt.verify(token, 'secret')

    // // Extraer información del token
    // const username = decoded.username
    // const email = decoded.email
    // const roles = decoded.roles
  } else {
    return {
      code: LoginStatus.Unauthorized,
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
