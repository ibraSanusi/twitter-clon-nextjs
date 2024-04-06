'use server'

import { db } from '@/services/db'
import { LoginStatus, StatusTexts } from '../../enums'
import { emailSchema } from '../../schemas'
import { ResponseData } from '../../interfaces'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
  } else {
    return {
      code: LoginStatus.Unauthorized,
      statusText: StatusTexts.Unauthorized,
    }
  }
}
