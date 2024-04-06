import { login } from '@/lib/actions/auth/login'
import { LoginStatus } from '@/lib/enums'
import { ResponseData } from '@/lib/interfaces'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const res = (
    statusText: string,
    { status, headers }: { status?: number; headers?: {} },
  ) => {
    return new Response(statusText, {
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
  const { code: status, statusText, token } = actionResponse

  if (status === LoginStatus.Success) {
    return res(statusText, {
      status,
      headers: {
        'Set-Cookie': `token=${token}; HttpOnly; path=/; Max-Age=2592000; Secure`,
      },
    })
  } else {
    return res(statusText, { status })
  }
}
