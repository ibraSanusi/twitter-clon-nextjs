import db from '@/services/db'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<Response> {
  try {
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
