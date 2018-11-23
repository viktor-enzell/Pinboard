const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

var clientCounter = 0;

io.on('connection', socket => {
  console.log('New client connected');
  clientCounter++;

  // Request notes from connected clients
  io.sockets.emit('shareNotes', clientCounter);

  // Send notes to newly connected client
  socket.on('allNotes', (notes) => {
    console.log('Notes received at server: ', notes);
    io.sockets.emit('allNotes', notes);
  });

  // Propagate note to all clients
  socket.on('noteUpdate', (note) => {
    console.log('Note received at server: ', note);
    io.sockets.emit('noteUpdate', note);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    clientCounter--;
  })
});

server.listen(port, () => console.log(`Listening on port ${port}`));