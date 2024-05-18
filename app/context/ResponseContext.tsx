import { User } from '@/lib/interfaces'
import React, { createContext, useState } from 'react'

// TODO: tipar la interfaz correctamente
interface UserResponseContextType {
  response: User | undefined
  addResponse: (response: User) => void
}

const initialResponseContextValue: UserResponseContextType = {
  response: undefined,
  addResponse: () => {},
}

export const UserResponseContext = createContext<UserResponseContextType>(
  initialResponseContextValue,
)

export function UserResponseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: tipar response correctamente
  const [response, setResponse] = useState<any>()

  const addResponse = (response: any) => {
    setResponse(response)
  }

  const value = {
    response,
    addResponse,
  }

  return (
    <UserResponseContext.Provider value={value}>
      {children}
    </UserResponseContext.Provider>
  )
}
