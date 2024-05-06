import db from '@/services/db'
import { NextRequest } from 'next/server'
import { decode } from 'next-auth/jwt'

export async function GET(request: NextRequest): Promise<Response> {
  try {
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

    // Obtener todos los usuarios a los que sigue el usuario en sesion
    const follow = await db.follow.findMany({
      where: {
        followerId: user.id,
      },
    })

    let followingUsers: {
      id: string
      fullname: string
      email: string
      username: string
      password: string
    }[] = []

    await Promise.all(
      follow.map(async ({ followingId }) => {
        const followingUser = await db.user.findUnique({
          where: {
            id: followingId,
          },
        })

        if (!followingUser) {
          return
        }

        followingUsers.push(followingUser)
      }),
    )

    return new Response(JSON.stringify(followingUsers), { status: 201 })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new Response('Error interno del servidor', { status: 500 })
  }
}
