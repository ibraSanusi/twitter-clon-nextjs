import { Post } from '@prisma/client'
import { NextApiRequest } from 'next'
import db from '@/services/db'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

export async function get(req: NextApiRequest): Promise<Post[]> {
  const token: string = req.body

  // Verificar un token
  const decoded = jwt.verify(token, 'secret')

  // Extraer información del token
  const username = decoded.username
  const email = decoded.email
  const roles = decoded.roles

  const posts: Post[] = await db.post.findMany({
    where: {},
  })

  return posts
}
