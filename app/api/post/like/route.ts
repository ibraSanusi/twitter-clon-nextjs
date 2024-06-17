import db from '@/services/db'
import { decode } from 'next-auth/jwt'
import { NextRequest } from 'next/server'
import { authMiddleware } from '@/middleware/authMiddleware'

export async function POST(request: NextRequest): Promise<Response> {
  try {
    // Ejecutar el middleware de autenticación
    const authResponse = await authMiddleware(request)

    // Verificar si el middleware detectó un problema de autenticación
    if (authResponse.status !== 200) {
      return authResponse
    }

    // Si la autenticación es exitosa, continuar con el procesamiento de la solicitud

    const body: { tweetId: string } = await request.json()

    // Obtener el usuario autenticado del middleware
    const userInSession = (request as any).user
    if (!userInSession) {
      return new Response('Usuario no autenticado', { status: 401 })
    }

    const userId = userInSession.id

    const tweetId = body?.tweetId
    if (!tweetId) {
      return new Response('El id del tweet es requerido.', {
        status: 400,
      })
    }

    const newLike = await db.like.create({
      data: {
        userId,
        tweetId,
      },
    })

    return new Response(JSON.stringify(newLike), { status: 201 })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new Response('Error interno del servidor', { status: 500 })
  }
}
