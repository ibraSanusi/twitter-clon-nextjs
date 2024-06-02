const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    // TODO: Cambiar el origin a uno especifico para anadir mas seguridad
    origin: '*',
    methods: ['GET', 'POST'],
  },
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 2 * 60 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true,
  },
})

io.on('connection', (socket) => {
  console.log('Someone has connected')

  socket.on('chat message', (data) => {
    io.emit('chat message', data) // Emitir a todos los clientes conectados
    console.log('Message from client: ', data)
  })

  socket.on('disconnect', () => {
    console.log('Someone has disconnected')
  })
})

httpServer.listen(5000, () => {
  console.log('Server is listening to the port 5000')
})
