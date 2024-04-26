import db from '@/services/db'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body: { email: string; content: string } = await request.json()
  console.log('BODY: ', body)

  // 1. Sacar el id del usuario
  const userEmail = body?.email ?? body.email
  if (!userEmail) {
    return
  }

  const user = await db.user.findUnique({
    where: {
      email: userEmail,
    },
  })

  if (!user) {
    return
  }

  const userId = user.id

  // 2. Poster el tweet con el id del usuario
  const content = body?.content
  if (!content) {
    return
  }
  const tweetPosted = db.post.create({
    data: {
      userId,
      content,
    },
  })

  // 3. Devolver respuesta de la subida
  return new Response(
    'Subido el tweet ' + (await tweetPosted).userId + ' correctamente',
  )
}
