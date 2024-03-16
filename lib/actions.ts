'use server'

import { db } from '../services/db'

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
export async function login(formData: FormData) {
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

// Registrarse
export async function register(formData: FormData) {
  const fullname = formData.get('fullname')?.toString()
  const username = formData.get('username')?.toString()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  const data = { fullname, username, email, password }

  if (fullname && username && email && password) {
    await db.user.create({
      data: {
        email,
        fullname,
        username,
        password,
      },
    })
  }

  console.log(email, fullname, username, password)
}
