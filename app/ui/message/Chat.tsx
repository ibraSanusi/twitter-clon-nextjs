'use client'

import Box from '@mui/material/Box'
import { Button, OutlinedInput } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { FormEventHandler, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

// function MyFormHelperText() {
//   const { focused } = useFormControl() || {}

//   const helperText = useMemo(() => {
//     if (focused) {
//       return 'This field is being focused'
//     }

//     return 'Helper text'
//   }, [focused])

//   return <FormHelperText>{helperText}</FormHelperText>
// }

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([])
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io('http://127.0.0.1:5000')
    setSocket(newSocket)

    newSocket.on('connect', () => {
      console.log('Connected with socket ID:', newSocket.id)

      newSocket.on('chat message', (data) => {
        setMessages((prevMessages) => [...prevMessages, data])
      })
    })

    newSocket.onAny((event, ...args) => {
      console.log(event, args)
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (socket) {
      const msg = e.currentTarget.message.value
      socket.emit('chat message', msg)
      e.currentTarget.message.value = ''
    }
  }

  return (
    <Box
      height={500}
      width={1028}
      my={4}
      display="flex"
      flexDirection={'column'}
      //   alignItems="end"
      //   justifyItems={'end'}
      //   justifyContent={'end'}
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
      <div className="flex h-full w-full flex-col justify-end gap-2">
        <ul className="flex h-full flex-col gap-2 overflow-scroll overflow-x-hidden">
          {messages.map((message, index) => {
            return <li key={index}>{message}</li>
          })}
        </ul>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-row gap-2"
          noValidate
          autoComplete="off"
        >
          <OutlinedInput
            id="message"
            className="w-full"
            placeholder="Please enter text"
          />
          {/* <TextareaAutosize className="h-full w-full" /> */}
          <Button
            className="bg-[#42A5F5] text-white"
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
          {/* <FormControl sx={{ width: '100%' }}>
          <MyFormHelperText />
        </FormControl> */}
        </form>
      </div>
    </Box>
  )
}
