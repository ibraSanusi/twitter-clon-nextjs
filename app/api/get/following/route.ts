import db from '@/services/db'
import { NextRequest } from 'next/server'
import { authMiddleware } from '@/middleware/authMiddleware'

export async function GET(request: NextRequest): Promise<Response> {
  try {
    // Aplicar el middleware de autenticación
    const authResponse = await authMiddleware(request)
    if (authResponse) {
      return authResponse
    }

    // Obtener el usuario autenticado del request
    const user = request.user
    if (!user) {
      return new Response('Usuario no autenticado', { status: 401 })
    }

    // Obtener todos los usuarios a los que sigue el usuario autenticado
    const follow = await db.follow.findMany({
      where: {
        followerId: user.id,
      },
    })

    // Recopilar los detalles de los usuarios seguidos
    const followingUsers = await Promise.all(
      follow.map(async ({ followingId }) => {
        const followingUser = await db.user.findUnique({
          where: {
            id: followingId,
          },
        })
        return followingUser
      }),
    )

    // Filtrar los usuarios nulos o indefinidos
    const filteredFollowingUsers = followingUsers.filter((user) => user)

    return new Response(JSON.stringify(filteredFollowingUsers), { status: 200 })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new Response('Error interno del servidor', { status: 500 })
  }
}
