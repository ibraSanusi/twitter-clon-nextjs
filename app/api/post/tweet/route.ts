import db from '@/services/db'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<Response> {
  try {
    // console.log('Request: ', request)
    // TODO: MEJORAR LA COMPROBACION DE SESION CON EL TOKEN DEL USUARIO QUE SE ENCUENTRA EN EL HEADER
    // TODO: SOLUCIONAR LA FECHA DE PUBLICACION ES INCORRECTA
    const body: { email: string; content: string } = await request.json()

    const userEmail = body?.email
    if (!userEmail) {
      return new Response('El correo electrónico del usuario es requerido', {
        status: 400,
      })
    }

    const userInSession = await db.user.findUnique({
      where: {
        email: userEmail,
      },
    })

    console.log('userInSession: ', JSON.stringify(userInSession))

    if (!userInSession) {
      return new Response('Usuario no encontrado', { status: 404 })
    }

    const author = userInSession.id

    const content = body?.content
    if (!content) {
      return new Response('El contenido del tweet es requerido', {
        status: 400,
      })
    }

    const newTweet = await db.tweet.create({
      data: {
        author,
        content,
      },
    })

    console.log('newTweet: ', JSON.stringify(newTweet))

    return new Response(JSON.stringify(newTweet), { status: 201 })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new Response('Error interno del servidor', { status: 500 })
  }
}
