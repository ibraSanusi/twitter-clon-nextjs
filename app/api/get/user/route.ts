import db from '@/services/db'
import { NextRequest } from 'next/server'
import { decode } from 'next-auth/jwt'
import { User } from '@/lib/interfaces'

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const cookieName =
      process.env.NODE_ENV === 'development'
        ? 'next-auth.session-token'
        : '__Secure-next-auth.session-token'

    console.log({ cookieName })

    // Obtener el token JWT de la cookie
    const token = request.cookies.get(cookieName)?.value
    // const token =
    //   request.cookies.get('next-auth.session-token')?.value ||
    //   request.cookies.get('__Host-next-auth.session-token')?.value

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
      select: {
        id: true,
        fullname: true,
        email: true,
        username: true,
        avatarUrl: true,
        role: true,
      },
    })

    if (!user) {
      return new Response('Usuario no encontrado', { status: 404 })
    }

    const userId = user.id

    // Seguidores del usuario en sesion
    const followers = await db.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        followings: {
          select: {
            follower: true,
          },
        },
      },
    })

    if (!followers) {
      return new Response('Usuario no encontrado', { status: 404 })
    }

    const followersFormatted = followers.followings.map(({ follower }) => {
      const { id, avatarUrl, email, fullname, role, username } = follower
      return {
        id,
        avatarUrl,
        email,
        fullname,
        role,
        username,
      }
    })

    // Respuesta formateada
    const userResponseFormatted: User = {
      ...user,
      followers: followersFormatted,
    }

    return new Response(JSON.stringify(userResponseFormatted), { status: 201 })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new Response('Error interno del servidor', { status: 500 })
  }
}
