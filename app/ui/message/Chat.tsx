'use client'

import Box from '@mui/material/Box'
import { Button, OutlinedInput } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { FormEventHandler, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import clsx from 'clsx'
import { useUserResponse } from '@/app/hooks/useResponse'

export default function Chat() {
  const { response } = useUserResponse()
  const [messages, setMessages] = useState<{ username: string; msg: string }[]>(
    [],
  )
  const [socket, setSocket] = useState<Socket | null>(null)
  const [message, setMessage] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    console.log(response?.username)
  }, [response])

  useEffect(() => {
    const newSocket = io('http://127.0.0.1:5000')
    setSocket(newSocket)

    if (!response?.username) {
      // console.log('No ha usuario')
      return
    }
    const newUsername = response.username
    setUsername(newUsername)

    // Enviar nombre de usuario al conectarse
    newSocket.emit('set username', newUsername)

    newSocket.on('connect', () => {
      console.log('Connected with socket ID:', newSocket.id)
    })

    newSocket.on('chat message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data])
    })

    newSocket.onAny((event, ...args) => {
      console.log(event, args)
    })

    return () => {
      newSocket.disconnect()
    }
  }, [response])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (socket && message) {
      socket.emit('chat message', message)
      setMessage('')
    }
  }

  return (
    <Box
      height={500}
      width={1028}
      my={4}
      display="flex"
      flexDirection={'column'}
      gap={4}
      p={2}
      sx={{
        border: '2px solid grey',
        // maxHeight: '500px',
        // maxWidth: '1028px',
        // width: '100%',
        // height: '100%',
      }}
    >
      <div className="flex h-full w-full flex-col justify-end gap-2">
        <ul className="flex h-full flex-col gap-2 overflow-scroll overflow-x-hidden">
          {messages.map((message, index) => (
            <li
              className={clsx({
                'text-end': message.username === username,
                'text-start': message.username !== username,
              })}
              key={index}
            >
              <strong>{message.username}</strong>: {message.msg}
            </li>
          ))}
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            className="bg-[#42A5F5] text-white"
            variant="contained"
            endIcon={<SendIcon />}
            type="submit"
          >
            Send
          </Button>
        </form>
      </div>
    </Box>
  )
}
