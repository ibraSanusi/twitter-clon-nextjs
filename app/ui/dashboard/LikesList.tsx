'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

const columns: GridColDef[] = [
  { field: 'userId', headerName: 'User ID', width: 300 },
  {
    field: 'tweetId',
    headerName: 'Tweet ID',
    width: 300,
  },
  { field: 'createdAt', headerName: 'CreatedAt', width: 300 },
]

interface Like {
  createdAt: Date
  userId: string
  tweetId: string
}

export default function LikesList() {
  const [likes, setLikes] = useState<Like[]>()
  // Obtener los usuarios de la bbdd
  useEffect(() => {
    const getLikes = async () => {
      const response = await fetch('/api/dashboard/get/likes')
      const data: Like[] = await response.json()

      console.log({ data })

      setLikes(data)
    }

    getLikes()
  }, [])

  return (
    <div className="m-auto grid h-dvh place-items-center">
      <div style={{ width: '75%', height: 400 }}>
        {likes && (
          <DataGrid
            rows={likes}
            columns={columns}
            getRowId={(row) => row.tweetId} // Aquí especificamos `tweetId` como el ID de fila
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
