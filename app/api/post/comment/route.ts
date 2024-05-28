import db from '@/services/db'
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

    const body: { content: string; tweetId: string } = await request.json()

    // Obtener el usuario autenticado del middleware
    const userInSession = (request as any).user
    if (!userInSession) {
      return new Response('Usuario no autenticado', { status: 401 })
    }

    const author = userInSession.id

    const content = body?.content
    if (!content) {
      return new Response('El contenido del tweet es requerido', {
        status: 400,
      })
    }

    const tweetId = body?.tweetId
    if (!tweetId) {
      return new Response('El id del tweet es requerido', {
        status: 400,
      })
    }

    // CREAR COMENTARIO EN LA BBDD
    const newComment = await db.comment.create({
      data: {
        author,
        content,
        tweetId,
      },
    })

    console.log('newComment: ', JSON.stringify(newComment))

    return new Response(JSON.stringify(newComment), { status: 201 })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new Response('Error interno del servidor', { status: 500 })
  }
}
