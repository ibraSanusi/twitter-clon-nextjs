import db from '@/services/db'
import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from '@/middleware/authMiddleware'

export async function POST(request: NextRequest): Promise<Response> {
  const authResponse = await authMiddleware(request)
  if (authResponse.status !== 200) {
    return authResponse
  }

  try {
    const body: { commentId: string } = await request.json()

    const userInSession = request.user
    if (!userInSession) {
      return new Response('Usuario no autenticado', { status: 401 })
    }

    const userId = userInSession.id

    const commentId = body?.commentId
    if (!commentId) {
      return new Response('El id del post es requerido.', { status: 400 })
    }

    const newCommentRetweet = await db.commentRetweet.create({
      data: {
        userId,
        commentId,
      },
    })

    return new Response(JSON.stringify(newCommentRetweet), { status: 201 })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new Response('Error interno del servidor', { status: 500 })
  }
}
