import { useContext } from 'react'
import { UserResponseContext } from '@/app/context/ResponseContext'

export const useUserResponse = () => {
  const context = useContext(UserResponseContext)

  if (context === undefined) {
    throw new Error('useResponse must be used within a ResponseProvider')
  }

  return context
}
