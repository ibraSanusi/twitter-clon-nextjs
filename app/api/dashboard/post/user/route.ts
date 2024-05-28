import db from '@/services/db'
import { decode } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<Response> {
  try {
    // console.log('Request: ', request)
    const body: { content: string } = await request.json()

    // Obtener el token JWT de la cookie
    const token = request.cookies.get('next-auth.session-token')?.value

    if (!token) {
      return new Response('No se encontró el token de sesión', { status: 401 })
    }

    const secret = process.env.NEXTAUTH_SECRET
    if (!secret) {
      return new Response('No se encontró el secreto.', { status: 401 })
    }

    // Decodificar el token JWT para obtener los detalles de la sesión
    const decodedToken = await decode({
      token: token,
      secret: secret,
    })

    if (!decodedToken) {
      return new Response('Token de sesión inválido', { status: 401 })
    }

    // TODO: Verificar si el token ha expirado
    // if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
    //   return new Response('La sesión ha expirado', { status: 401 })
    // }

    // Obtener el correo electrónico del usuario de la sesión
    const userEmail = decodedToken.email
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
