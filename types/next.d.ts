// types/next.d.ts
import { NextRequest } from 'next/server'
import { User } from '@prisma/client' // Ajusta esto según tu modelo de usuario

declare module 'next/server' {
  interface NextRequest {
    user?: User
  }
}
