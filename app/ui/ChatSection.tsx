'use client'

import React from 'react'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'

export default function ChatSection() {
  //TODO: Cargar los mensajes que se tienen, con el id...
  const socket = io('http://127.0.0.1:5000')

  const [buttonCont, setButtonCont] = useState('Send event')

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket: ', socket.id)

      socket.on('responseEvent', (data) => {
        setButtonCont('Recived response from de server: ' + data)
      })

      return () => {
        socket.disconnect()
      }
    })
  }, [socket])

  const sendSocketEvent = () => {
    socket.emit('myevent', 'hello server!')
  }

  return (
    <section>
      <header>
        <span>Nombre</span>
      </header>

      <button className="rounded-md bg-gray-400 p-2" onClick={sendSocketEvent}>
        {buttonCont}
      </button>
    </section>
  )
}
