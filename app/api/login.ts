import { NextApiRequest, NextApiResponse } from 'next'

export default async function login(
  request: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(request, res)
  return res.status(400).json('Inicio de sesion correctamente.')
}
