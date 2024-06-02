import db from '@/services/db'
import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from '@/middleware/authMiddleware'

export async function POST(request: NextRequest): Promise<Response> {
  const authResponse = await authMiddleware(request)
  if (authResponse.status !== 200) {
    return authResponse
  }

  try {
    const body: { tweetId: string } = await request.json()

    const userInSession = request.user
    if (!userInSession) {
      return new Response('Usuario no autenticado', { status: 401 })
    }

    const userId = userInSession.id

    const tweetId = body?.tweetId
    if (!tweetId) {
      return new Response('El id del tweet es requerido.', { status: 400 })
    }

    const newRetweet = await db.retweet.create({
      data: {
        userId,
        tweetId,
      },
    })

    return new Response(JSON.stringify(newRetweet), { status: 201 })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new Response('Error interno del servidor', { status: 500 })
  }
}

export async function DELETE(request: NextRequest): Promise<Response> {
  const authResponse = await authMiddleware(request)
  if (authResponse.status !== 200) {
    return authResponse
  }

  try {
    const body: { tweetId: string } = await request.json()

    const userInSession = request.user
    if (!userInSession) {
      return new Response('Usuario no autenticado', { status: 401 })
    }

    const userId = userInSession.id

    const tweetId = body?.tweetId
    if (!tweetId) {
      return new Response('El id del tweet es requerido.', { status: 400 })
    }

    const deletedRetweet = await db.retweet.delete({
      where: {
        userId_tweetId: {
          userId,
          tweetId,
        },
      },
    })

    return new Response(JSON.stringify(deletedRetweet), { status: 200 })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new Response('Error interno del servidor', { status: 500 })
  }
}
