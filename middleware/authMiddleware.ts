import { NextRequest, NextResponse } from 'next/server'
import { decode } from 'next-auth/jwt'
import db from '@/services/db'

export async function authMiddleware(request: NextRequest) {
  const cookieName =
    process.env.NODE_ENV === 'development'
      ? 'next-auth.session-token'
      : '__Host-next-auth.session-token'

  console.log({ cookieName })

  // Obtener el token JWT de la cookie
  const token = request.cookies.get(cookieName)?.value
  // const token =
  //   request.cookies.get('next-auth.session-token')?.value ||
  //   request.cookies.get('__Host-next-auth.session-token')?.value

  if (!token) {
    return NextResponse.json(
      { message: 'No se encontró el token de sesión' },
      { status: 401 },
    )
  }

  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) {
    return NextResponse.json(
      { message: 'No se encontró el secreto.' },
      { status: 401 },
    )
  }

  const decodedToken = await decode({ token, secret })

  if (!decodedToken) {
    return NextResponse.json(
      { message: 'Token de sesión inválido' },
      { status: 401 },
    )
  }

  const userEmail = decodedToken.email
  if (!userEmail) {
    return NextResponse.json(
      { message: 'El correo electrónico del usuario es requerido' },
      { status: 400 },
    )
  }

  const userInSession = await db.user.findUnique({
    where: {
      email: userEmail,
    },
  })

  if (!userInSession) {
    return NextResponse.json(
      { message: 'Usuario no encontrado' },
      { status: 404 },
    )
  }

  request.user = userInSession
  // Asigna el usuario autenticado a la propiedad `user`
  //   (request as any).user = userInSession
  return NextResponse.next()
}
