import db from '@/services/db'
import { decode } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body: { commentId: string } = await request.json()

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

    const user = await db.user.findUnique({
      where: {
        email: userEmail,
      },
    })

    if (!user) {
      return new Response('Usuario no encontrado', { status: 404 })
    }

    const userId = user.id

    const commentId = body?.commentId
    if (!commentId) {
      return new Response('El id del post es requerido.', {
        status: 400,
      })
    }

    const newLike = await db.commentLike.create({
      data: {
        userId,
        commentId,
      },
    })

    return new Response(JSON.stringify(newLike), { status: 201 })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new Response('Error interno del servidor', { status: 500 })
  }
}
