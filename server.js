const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

var clientCounter = 0;
var noteID = 0;
var notesBeingEdited = {};
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
    if (notesBeingEdited.hasOwnProperty(noteID)) {
      socket.emit('requestAnswer', false);
    } else {
      notesBeingEdited[noteID] = socket.id;
      socket.emit('requestAnswer', true);
    }
  });

  // Client is finished editing note. Lock gets dropped
  socket.on('finishedEditing', noteID => {
    delete notesBeingEdited[noteID];
  });

  // Propagate note to all clients
  socket.on('noteUpdate', (note) => {
    io.sockets.emit('noteUpdate', note);
    version++;
  });

  // Tell clients to delete node
  socket.on('deleteNote', noteID => {
    io.sockets.emit('deleteNote', noteID);
  });

  // Distribute new note id
  socket.on('getNewID', () => {
    noteID++;
    socket.emit('getNewID', noteID);
    notesBeingEdited[noteID] = socket.id;
  });

  // Tell clients to share their notes every 10 sec
  setInterval(() => {
    io.sockets.emit('shareNotes', clientCounter);
  }, 10000);

  // Remove lock from note being edited by client if client disconnects
  socket.on('disconnect', () => {
    console.log('user disconnected');
    if (Object.values(notesBeingEdited).indexOf(socket.id) > -1) {
      const key = Object.keys(notesBeingEdited).find(key => notesBeingEdited[key] === socket.id);
      delete notesBeingEdited[key];
    }
    clientCounter--;
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));