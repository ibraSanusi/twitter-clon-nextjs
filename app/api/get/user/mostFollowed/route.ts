// pages/api/user.ts
import db from '@/services/db'
import { NextRequest, NextResponse } from 'next/server'
import { decode } from 'next-auth/jwt'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const cookieName =
      process.env.NODE_ENV === 'development'
        ? 'next-auth.session-token'
        : '__Secure-next-auth.session-token'

    // Obtener el token JWT de la cookie
    const token = request.cookies.get(cookieName)?.value
    // const token =
    //   request.cookies.get('next-auth.session-token')?.value ||
    //   request.cookies.get('__Host-next-auth.session-token')?.value

    if (!token) {
      return new NextResponse('No se encontró el token de sesión', {
        status: 401,
      })
    }

    const secret = process.env.NEXTAUTH_SECRET
    if (!secret) {
      return new NextResponse('No se encontró el secreto.', { status: 401 })
    }

    // Decodificar el token JWT para obtener los detalles de la sesión
    const decodedToken = await decode({ token, secret })

    if (!decodedToken) {
      return new NextResponse('Token de sesión inválido', { status: 401 })
    }

    const userEmail = decodedToken.email
    if (!userEmail) {
      return new NextResponse(
        'El correo electrónico del usuario es requerido',
        { status: 400 },
      )
    }

    const user = await db.user.findUnique({
      where: { email: userEmail },
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
      return new NextResponse('Usuario no encontrado', { status: 404 })
    }

    // Obtener los top 5 usuarios más seguidos
    const topFollowedUsers = await db.user.findMany({
      take: 5,
      orderBy: { followers: { _count: 'desc' } },
      select: {
        id: true,
        username: true,
        followers: { select: { follower: true } },
      },
    })

    const response = topFollowedUsers.map((u) => ({
      id: u.id,
      username: u.username,
      followersCount: u.followers.length,
    }))

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new NextResponse('Error interno del servidor', { status: 500 })
  }
}
