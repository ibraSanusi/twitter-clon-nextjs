import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import db from '@/services/db'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'isanu227@gmail.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '********',
        },
      },
      async authorize(credentials, req) {
        const userFound = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        })

        if (!credentials?.password || !userFound?.password) {
          return null
        }

        const match = await bcrypt.compare(
          credentials.password,
          userFound.password,
        )

        if (!match) {
          return null
        }

        return {
          id: userFound?.id,
          name: userFound?.username,
          email: userFound?.email,
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
