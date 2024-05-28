import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 300 },
  { field: 'username', headerName: 'Username', width: 90 },
  { field: 'fullname', headerName: 'Full Name', width: 100 },
  {
    field: 'email',
    headerName: 'Email',
    type: 'number',
    width: 90,
  },
  {
    field: 'avatarUrl',
    headerName: 'Avatar Url',
    width: 160,
  },
  { field: 'role', headerName: 'Last name', width: 60 },
  { field: 'password', headerName: 'Password', width: 130 },
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

interface User {
  id: string
  fullname: string
  email: string
  username: string
  password: string
  avatarUrl: string
  role: string
}

export default function UsersList() {
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

  return (
    <div className="m-auto grid h-dvh w-3/4 place-items-center">
      <div style={{ width: '100%', height: 400 }}>
        {users && (
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        )}
      </div>
    </div>
  )
}
