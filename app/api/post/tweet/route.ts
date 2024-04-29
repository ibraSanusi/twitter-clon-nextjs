import db from '@/services/db'
import { NextRequest } from 'next/server'

interface TweetInterface {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body: { email: string; content: string } = await request.json()

    const userEmail = body?.email ?? body.email
    if (!userEmail) {
      return new Response('El correo electrónico del usuario es requerido', {
        status: 400,
      })
    }

    const user = await db.user.findUnique({
      where: {
        email: userEmail,
      },
    })

    if (!user) {
      return new Response('Usuario no encontrado', { status: 404 })
    }

    const userId = user.id

    const content = body?.content
    if (!content) {
      return new Response('El contenido del tweet es requerido', {
        status: 400,
      })
    }

    const newTweet = await db.post.create({
      data: {
        userId,
        content,
      },
    })

    return new Response(JSON.stringify(newTweet), { status: 201 })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new Response('Error interno del servidor', { status: 500 })
  }
}
