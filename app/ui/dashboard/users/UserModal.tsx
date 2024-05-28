import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { TextField, styled } from '@mui/material'
import { FormEventHandler } from 'react'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const CustomButton = styled(Button)({
  backgroundColor: '#339FFF',
  color: 'white',
  '&:hover': {
    backgroundColor: '#007ACC', // Color cuando el botón está en estado hover
  },
})

interface Props {
  closeCreateModal: () => void
  createUser: (formData: FormData) => Promise<void>
  createModalVisibility: boolean
}

export default function UserModal({
  closeCreateModal,
  createModalVisibility,
  createUser,
}: Props) {
  const handleCreateUser: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const form = e.currentTarget
    console.log({ form })

    const email = form.email.value
    const username = form.username.value
    const fullname = form.fullname.value
    const password = form.password.value

    let formData = new FormData()
    formData.append('email', email)
    formData.append('username', username)
    formData.append('fullname', fullname)
    formData.append('password', password)

    createUser(formData)
  }

  return (
    <div>
      <Modal
        open={createModalVisibility}
        onClose={closeCreateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            onSubmit={handleCreateUser}
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                {
                  border: 'none',
                },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="email" label="Email" variant="filled" />
            <TextField id="username" label="Username" variant="filled" />
            <TextField id="fullname" label="Fullname" variant="filled" />
            <TextField id="password" label="Password" variant="filled" />

            <CustomButton
              type="submit"
              className="bg-blue-700 text-white"
              // sx={{ backgroundColor: '#339FFF', color: 'white' }}
              variant="contained"
            >
              Create
            </CustomButton>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
