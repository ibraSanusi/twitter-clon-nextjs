import { Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

const openCreateModal = () => {}

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
  {
    field: '',
    headerName: '',
    headerClassName: 'last-grid-header-style',
    cellClassName: 'no-outline',
    renderHeader: () => (
      <Button
        onClick={openCreateModal}
        sx={{ borderRadius: '24px' }}
        variant="contained"
        color="primary"
      >
        Create
      </Button>
    ),
    flex: 1,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: 'right',
    resizable: false,
  },
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

interface Props {
  openCreateModal: () => void
  users: User[]
}

export default function UsersList({ openCreateModal, users }: Props) {
  return (
    <div className="m-auto grid h-dvh w-3/4 place-items-center">
      <div style={{ width: '100%', height: 400 }}>
        {users && (
          <DataGrid
            rows={users}
            columns={[
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
              {
                field: '',
                headerName: '',
                headerClassName: 'last-grid-header-style',
                cellClassName: 'no-outline',
                renderHeader: () => (
                  <Button
                    className="bg-blue-700 text-white"
                    onClick={openCreateModal}
                    sx={{ borderRadius: '24px' }}
                    variant="contained"
                    color="primary"
                  >
                    Create
                  </Button>
                ),
                flex: 1,
                sortable: false,
                disableColumnMenu: true,
                headerAlign: 'right',
                resizable: false,
              },
            ]}
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
