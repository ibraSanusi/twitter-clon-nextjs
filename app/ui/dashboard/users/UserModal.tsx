import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { TextField, styled } from '@mui/material'

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

export default function UserModal() {
  const [open, setOpen] = React.useState(true)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
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
              sx={{ background: '#339FFF', color: 'white' }}
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
