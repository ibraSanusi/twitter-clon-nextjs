'use server'

import { emailSchema } from './schemas'
import { db } from '../services/db'
import { LoginStatus, StatusTexts } from './enums'
import { redirect } from 'next/navigation'
import { ResponseData } from './interfaces'
import { NextApiResponse } from 'next'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
      statusText: StatusTexts.ServerError,
    }
  }

  const email = emailData?.toString()
  const password = passwordData?.toString()

  if (!email || !password) {
    return {
      code: LoginStatus.ServerError,
      statusText: StatusTexts.ServerError,
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
      statusText: StatusTexts.Unauthorized,
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
      statusText: StatusTexts.Success,
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
      statusText: StatusTexts.Unauthorized,
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
