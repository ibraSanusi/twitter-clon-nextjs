'use server'

import db from '@/services/db'

// Hacer un post
export async function postTweet(formData: FormData) {
  const content = formData.get('content')?.toString()

  if (content) {
    const user = await db.user.findUnique({
      where: {
        email: 'isanu227@gmail.com',
      },
    })

    if (!user) {
      return null
    }

    await db.post.create({
      data: {
        userId: user?.id,
        content,
      },
    })
  }
}
