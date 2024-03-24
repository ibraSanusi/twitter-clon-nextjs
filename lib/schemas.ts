import { z } from 'zod'

// Esquema para el email
export const emailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})
