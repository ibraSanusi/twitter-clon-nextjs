'use server'

// const { sql } = require('@vercel/postgres')
import { sql } from '@vercel/postgres'

export async function postTweet(formData: FormData) {
  const content = formData.get('content')?.toString()

  const client = await sql.connect()

  const insertPost = client.sql`
    INSERT INTO "Post" (content)
    values (${content})
  `

  console.log(content)
}
