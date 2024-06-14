const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
})

const users = {} // Objeto para almacenar los nombres de usuario

io.on('connection', (socket) => {
  console.log('Someone has connected')

  socket.on('set username', (username) => {
    users[socket.id] = username
    console.log(`User connected with username: ${username}`)
  })

  socket.on('disconnect', () => {
    console.log(`User with username ${users[socket.id]} has disconnected`)
    delete users[socket.id] // Eliminar el usuario desconectado
  })

  socket.on('chat message', (msg) => {
    const username = users[socket.id]
    io.emit('chat message', { username, msg }) // Emitir a todos los clientes conectados
    console.log(`Message from user ${username}: ${msg}`)
  })

  if (!socket.recovered) {
    // Recuperar los mensajes sin conexión
  }
})

httpServer.listen(5000, () => {
  console.log('Server is listening to the port 5000')
})
