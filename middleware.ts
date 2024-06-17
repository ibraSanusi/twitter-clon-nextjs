// export { default } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import db from './services/db'
import { decode } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('next-auth.session-token')?.value

  const url = req.nextUrl.clone()

  if (!token) {
    // Si el usuario no está autenticado, redirigir al login
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // const secret = process.env.NEXTAUTH_SECRET
  // if (!secret) {
  //   return NextResponse.json(
  //     { message: 'No se encontró el secreto.' },
  //     { status: 500 },
  //   )
  // }

  // let decodedToken
  // try {
  //   decodedToken = await decode({ token, secret })
  // } catch (error) {
  //   return NextResponse.json(
  //     { message: 'Token de sesión inválido' },
  //     { status: 401 },
  //   )
  // }

  // if (!decodedToken || !decodedToken.email) {
  //   return NextResponse.json(
  //     {
  //       message:
  //         'El token de sesión es inválido o no contiene un correo electrónico.',
  //     },
  //     { status: 401 },
  //   )
  // }

  // const userEmail = decodedToken.email

  // const userInSession = await db.user.findUnique({
  //   where: {
  //     email: userEmail,
  //   },
  // })

  // if (!userInSession) {
  //   return NextResponse.json(
  //     { message: 'Usuario no encontrado.' },
  //     { status: 404 },
  //   )
  // }

  // const role = userInSession.role

  // console.log({ pathname: url.pathname })

  // if (role !== 'ADMIN' && url.pathname.startsWith('/dashboard')) {
  //   url.pathname = '/login'
  //   return NextResponse.redirect(url)
  // }

  // Si el usuario está autenticado, continuar con la solicitud
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/home',
    '/dashboard/:path*',
    '/explore',
    '/message',
    '/profile',
    '/settings',
  ],
}
