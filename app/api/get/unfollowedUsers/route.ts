import db from '@/services/db'
import { NextRequest } from 'next/server'

interface TweetInterface {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

/**
 * Consigue los usuarios a los que no sigue el usuario en sesion
 * @param request
 * @returns
 */

// TODO: CAMBIAR EL POST POR EL GET Y RECUPERAR LA SESION DEL USUARIO DEL HEADER
export async function POST(request: NextRequest): Promise<Response> {
  try {
    // console.log('Request: ', request)
    const body: { email: string } = await request.json()

    const userEmail = body?.email ?? body.email
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
          following: {
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

    return new Response(JSON.stringify(unfollowedUsers), { status: 201 })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new Response('Error interno del servidor', { status: 500 })
  }
}
