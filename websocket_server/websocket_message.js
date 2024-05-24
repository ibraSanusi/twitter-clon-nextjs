const { createServer, METHODS } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    // TODO: Cambiar el origin a uno especifico para anadir mas seguridad
    origin: '*',
    METHODS: ['GET', 'POST'],
  },
})

io.on('connection', async (socket) => {
  socket.on('myevent', (data) => {
    console.log('Message from client: ', data)
    socket.emit('responseEvent', 'Hello client')
  })
})

httpServer.listen(5000, () => {
  console.log('Server is listening to the port 5000')
})
