import { register } from '@/lib/actions/auth/register'
import { authMiddleware } from '@/middleware/authMiddleware'
import db from '@/services/db'
import { decode } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<Response> {
  try {
    // Aplicar el middleware de autenticación
    // const authResponse = await authMiddleware(request)
    // if (authResponse) {
    //   console.log({ authResponse })
    //   // return authResponse
    //   // return new Response(JSON.stringify({ authResponse }), { status: 401 })
    // }

    const formData = await request.formData()
    console.log({ formData })

    const newUser = register(formData)

    return new Response(JSON.stringify({ newUser }), { status: 201 })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new Response('Error interno del servidor', { status: 500 })
  }
}
