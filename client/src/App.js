import React, { Component } from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import socketIOClient from "socket.io-client"

class App extends Component {
  constructor(props) {
    super(props);

    this.hasRecivedNotes = false;

    this.socket = socketIOClient('http://localhost:5000/');
    this.socket.on('allNotes', notes => this.initNotes(notes));
    this.socket.on('noteUpdate', note => this.updateNote(note));
    this.socket.on('shareNotes', amountOfClients => this.sendAllNotes(amountOfClients));
  };

  state = {
    notes: {},
    modalState: {
      open: true,
      id: -1,
      header: "",
      body: ""
    }
  };

  initNotes(notes) {
    if(!this.hasRecivedNotes) {
      this.setState({ notes: notes.notes });
      this.hasRecivedNotes = true;
      console.log(this.state.notes);
    }
  };

  sendAllNotes(amountOfClients) {
    if(amountOfClients < 2) {
      this.hasRecivedNotes = true;
    }
    if(this.hasRecivedNotes) {
      this.socket.emit('allNotes', { notes: this.state.notes });
    }
  };

  propagateUpdate() {
    this.socket.emit('noteUpdate', { ID: this.state.modalState.id,
      header: this.state.modalState.header,
      body: this.state.modalState.body,
    });
  };

  updateNote(note) {
    var updatedNotes = this.state.notes;
    updatedNotes[note.ID] = note;
    this.setState({ notes: updatedNotes });
    console.log(this.state.notes);
  };

  setNewNoteID() {
    this.socket.emit('getNewID');
    this.socket.on('getNewID', noteID => {
      this.setState({
        modalState: {...this.state.modalState, id: noteID}
      });
      console.log(this.state.modalState.id);
    });
  };

  handleHeaderChange = e => {
    if(this.state.modalState.id === -1) {
      this.setNewNoteID();
    }
    this.setState({
      modalState: {...this.state.modalState, header: e.target.value}
    });
    this.propagateUpdate();
  };

  handleBodyChange = e => {
    this.setState({
      modalState: {...this.state.modalState, body: e.target.value}
    });
    this.propagateUpdate();
  };

  handleModalState = e => {
    this.setState({
      modalState: {...this.state.modalState, open: false}
    });
  };

  render() {
    const modalState = this.state.modalState.open;
    return (
      <MainPage
        bodyChange={this.handleBodyChange}
        headerChange={this.handleHeaderChange}
        modalStateChange={this.handleModalState}
        modalState={modalState}
      />
    );
  }
}

export default App;
