import db from '@/services/db'
import { NextRequest } from 'next/server'
import { decode } from 'next-auth/jwt'

/**
 * Consigue los usuarios a los que no sigue el usuario en sesion
 * @param request
 * @returns
 */
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

    // Obtener todos los usuarios a los que NO sigue el usuario en sesion
    const unfollowedUsers = await db.user.findMany({
      where: {
        NOT: {
          followings: {
            some: {
              followerId: user.id,
            },
          },
        },
        AND: {
          NOT: {
            id: user.id,
          },
        },
      },
    })

    // Obtener todos los seguidores de cada usuario (unfollowedUsers)
    const formattedUnfollowedUsers = await Promise.all(
      unfollowedUsers.map(
        async ({ id, username, fullname, avatarUrl, email, role }) => {
          const followersCount = await db.follow.count({
            where: {
              followingId: id,
            },
          })

          // Formatear la respuesta
          return {
            id,
            username,
            fullname,
            avatarUrl,
            email,
            role,
            followed: false,
            followersCount,
          }
        },
      ),
    )

    return new Response(JSON.stringify(formattedUnfollowedUsers), {
      status: 201,
    })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new Response('Error interno del servidor', { status: 500 })
  }
}
