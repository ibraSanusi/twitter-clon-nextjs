import { Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { randomUUID } from 'crypto'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const openCreateModal = () => {}

// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 300 },
//   { field: 'username', headerName: 'Username', width: 90 },
//   { field: 'fullname', headerName: 'Full Name', width: 100 },
//   {
//     field: 'email',
//     headerName: 'Email',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'avatarUrl',
//     headerName: 'Avatar Url',
//     width: 160,
//   },
//   { field: 'role', headerName: 'Last name', width: 60 },
//   { field: 'password', headerName: 'Password', width: 130 },
//   {
//     field: '',
//     headerName: '',
//     headerClassName: 'last-grid-header-style',
//     cellClassName: 'no-outline',
//     renderHeader: () => (
//       <Button
//         onClick={openCreateModal}
//         sx={{ borderRadius: '24px' }}
//         variant="contained"
//         color="primary"
//       >
//         Create
//       </Button>
//     ),
//     flex: 1,
//     sortable: false,
//     disableColumnMenu: true,
//     headerAlign: 'right',
//     resizable: false,
//   },
// ]

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
            autoHeight
            columns={[
              { field: 'id', headerName: 'ID', width: 150 },
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
                width: 90,
              },
              { field: 'role', headerName: 'Last name', width: 60 },
              { field: 'password', headerName: 'Password', width: 90 },
              {
                field: 'actions',
                headerName: 'Actions',
                resizable: false,
                sortable: false,
                disableColumnMenu: true,
                width: 180,
                headerClassName: 'no-outline',
                cellClassName:
                  'no-outline flex flex-row gap-2 items-center h-full',
                renderCell: (params) => (
                  <>
                    <Button
                      className="bg-blue-700 text-white"
                      id={params.row.id}
                      sx={{ borderRadius: '24px' }}
                      // onClick={() => openEditModal(params.row.id)}
                      variant="contained"
                    >
                      Edit
                    </Button>
                    <Button
                      className="text-red-700 outline-red-700"
                      sx={{ borderRadius: '24px' }}
                      // onClick={() => handleDelete(params.row.id)}
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </>
                ),
              },
              {
                field: '',
                headerName: '',
                width: 180,
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
            rows={users}
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
