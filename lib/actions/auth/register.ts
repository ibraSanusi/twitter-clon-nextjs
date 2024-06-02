'use server'

import db from '@/services/db'
import { $Enums, Role } from '@prisma/client'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

export async function register(formData: FormData): Promise<
  | {
      id: string
      fullname: string
      email: string
      username: string
      password: string
      avatarUrl: string
      role: $Enums.Role
    }
  | undefined
> {
  const fullname = formData.get('fullname')?.toString()
  const username = formData.get('username')?.toString()
  const email = formData.get('email')?.toString()
  const role = formData.get('role')?.toString()?.toUpperCase() as Role
  const password = formData.get('password')?.toString()

  const hashedPassword = await bcrypt.hash(password, 10)
  hashedPassword.toString()

  const data = { fullname, username, email, password } // Raro

  if (!fullname || !username || !email || !hashedPassword) {
    return undefined
  }

  // Validar que el role sea uno de los valores permitidos
  if (!Object.values(Role).includes(role)) {
    throw new Error('Role inválido')
  }

  const newUser = await db.user.create({
    data: {
      email,
      fullname,
      username,
      role,
      password: hashedPassword,
    },
  })

  if (!newUser) {
    return undefined
  }

  return newUser
}
