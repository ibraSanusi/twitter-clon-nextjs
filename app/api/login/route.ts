import { login } from '@/lib/actions'
import { LoginStatus } from '@/lib/enums'
import { ResponseData } from '@/lib/interfaces'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const res = (
    message: string,
    { status, headers }: { status?: number; headers?: {} },
  ) => {
    return new Response(message, {
      status,
      headers,
    })
  }

  const data: { email: string; password: string } = await req.json()
  console.log(data)

  const formData: FormData = new FormData()
  formData.append('email', data.email)
  formData.append('password', data.password)

  const actionResponse: ResponseData = await login(formData)
  const { code: status, message, token } = actionResponse

  if (status === LoginStatus.Success) {
    return res(message, {
      status,
      headers: {
        'Set-Cookie': `token=${token}; HttpOnly; path=/; Max-Age=2592000; Secure`,
      },
    })
  } else {
    return res(message, { status })
  }
}
