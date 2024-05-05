import db from '@/services/db'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body: { email: string; postId: string } = await request.json()

    const userEmail = body?.email
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

    const postId = body?.postId
    if (!postId) {
      return new Response('El id del post es requerido.', {
        status: 400,
      })
    }

    const newLike = await db.like.create({
      data: {
        userId,
        postId,
      },
    })

    return new Response(JSON.stringify(newLike), { status: 201 })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new Response('Error interno del servidor', { status: 500 })
  }
}
