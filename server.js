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

  // Client requesting to edit note
  socket.on('requestToEdit', (noteID) => {
    if(notesBeingEdited.includes(noteID.ID)) {
      socket.emit('requestDenied');
    } else {
      notesBeingEdited.push(noteID.ID);
      socket.emit('requestAccepted');
    }
  });

  // Client is finished editing note. Lock gets dropped
  socket.on('finishedEditing', (noteID) => {
    for(var i = 0; i < notesBeingEdited.length-1; i++){
      if(notesBeingEdited[i] === noteID.ID) {
        notesBeingEdited.splice(i, 1);
      }
    }
    io.sockets.emit('lockDropped', noteID);
  });

  // Propagate note to all clients
  socket.on('noteUpdate', (note) => {
    console.log('Note received at server: ', note);
    io.sockets.emit('noteUpdate', note);
  });

  // Distribute new note id
  socket.on('getNewID', () => {
    noteID++;
    socket.emit('getNewID', noteID);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    clientCounter--;
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));