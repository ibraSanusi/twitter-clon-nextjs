import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from '@/middleware/authMiddleware'
import db from '@/services/db'

export async function POST(request: NextRequest) {
  const authResponse = await authMiddleware(request)
  if (authResponse.status !== 200) {
    return authResponse
  }

  // Al llamar a `authMiddleware`, el `request` es modificado para incluir `user`
  const userInSession = request.user

  if (!userInSession) {
    return new Response('Usuario no autenticado', { status: 401 })
  }

  const body: { content: string } = await request.json()

  const content = body?.content
  if (!content) {
    return new Response('El contenido del tweet es requerido', { status: 400 })
  }

  const newTweet = await db.tweet.create({
    data: {
      author: userInSession.id,
      content,
    },
  })

  return new Response(JSON.stringify(newTweet), { status: 201 })
}
