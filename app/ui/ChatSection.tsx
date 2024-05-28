'use client'

import React, { FormEventHandler, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export default function ChatSection() {
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
    <section className="w-full">
      <header>
        <span>Nombre</span>
      </header>

      <form
        className="flex flex-col justify-between border-t-[1px] border-solid"
        onSubmit={handleSubmit}
      >
        <ul>
          {messages.map((message, index) => {
            return <li key={index}>{message}</li>
          })}
        </ul>
        <div className="flex h-fit w-full flex-row gap-2 bg-gray-800 px-4 py-2">
          <input
            className="w-full focus:outline-none"
            id="message"
            type="text"
            placeholder="Type a message"
          />
          <button className="rounded-md bg-gray-400 p-2" type="submit">
            Send
          </button>
        </div>
      </form>
    </section>
  )
}
