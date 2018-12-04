const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

var clientCounter = 0;
var noteID = 0;
var notesBeingEdited = [];
var version = 0;

io.on('connection', socket => {
  console.log('New client connected');
  clientCounter++;

  // Request notes from connected clients
  io.sockets.emit('shareNotes', clientCounter);

  // Send notes to newly connected client
  socket.on('allNotes', (notes) => {
    io.sockets.emit('allNotes', notes);
    if (notes.version > version) {
      version = notes.version;
    }
  });

  // Client requesting to edit note
  socket.on('requestToEdit', noteID => {
    if (notesBeingEdited.includes(noteID)) {
      socket.emit('requestAnswer', false);
    } else {
      notesBeingEdited.push(noteID);
      socket.emit('requestAnswer', true);
    }
  });

  // Client is finished editing note. Lock gets dropped
  socket.on('finishedEditing', noteID => {
    var index = notesBeingEdited.indexOf(noteID);
    if (index !== -1) notesBeingEdited.splice(index, 1);
  });

  // Propagate note to all clients
  socket.on('noteUpdate', (note) => {
    io.sockets.emit('noteUpdate', note);
    version++;
  });

  // Distribute new note id
  socket.on('getNewID', () => {
    noteID++;
    socket.emit('getNewID', noteID);
    notesBeingEdited.push(noteID);
  });

  // Tell clients to share their notes every 10 sec
  setInterval(() => {
    io.sockets.emit('shareNotes', clientCounter);
  }, 10000);

  socket.on('disconnect', () => {
    console.log('user disconnected');
    clientCounter--;
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));