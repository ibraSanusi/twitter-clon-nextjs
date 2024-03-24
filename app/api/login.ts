'use server'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function login(
  request: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(request, res)
  return res.status(401).json({ message: 'Inicio de sesion correctamente.' })
}
