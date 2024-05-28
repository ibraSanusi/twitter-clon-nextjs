'use client'

import UsersList from '@/app/ui/dashboard/UsersList'
import UserModal from '@/app/ui/dashboard/users/UserModal'
import { User } from '@prisma/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [createModalVisibility, setCreateModalVisibility] = useState(false)
  const [users, setUsers] = useState<User[]>()

  // Obtener los usuarios de la bbdd
  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch('/api/dashboard/get/users')
      const data: User[] = await response.json()

      console.log({ data })

      setUsers(data)
    }

    getUsers()
  }, [])

  const openCreateModal = () => {
    setCreateModalVisibility(true)
  }

  const closeCreateModal = () => {
    setCreateModalVisibility(false)
  }

  const createUser = async (formData: FormData) => {
    console.log('holaaaaa?????')
    const response = await fetch('/api/dashboard/post/user', {
      method: 'POST',
      body: formData,
    })

    console.log({ response })
    const newUser: User = await response.json()

    console.log({ newUser })

    setUsers((prevUsers) => (prevUsers ? [...prevUsers, newUser] : [newUser]))
  }

  return (
    <>
      {users && <UsersList users={users} openCreateModal={openCreateModal} />}
      {createModalVisibility && (
        <UserModal
          createUser={createUser}
          closeCreateModal={closeCreateModal}
          createModalVisibility={createModalVisibility}
        />
      )}
    </>
  )
}
