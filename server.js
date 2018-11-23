const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  console.log('New client connected');

  socket.on('propagate', (note) => {
    console.log('Note received at server: ', note);
    io.sockets.emit('propagate', note);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
});

server.listen(port, () => console.log(`Listening on port ${port}`));