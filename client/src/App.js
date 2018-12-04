import React, {Component} from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
import AddButton from "./components/AddButton";
import Modal from "./components/Modal";
import Note from "./components/Note";
import styled from "styled-components";
import Header from "./components/MainPage/Header";

class App extends Component {
  constructor(props) {
    super(props);

    this.hasRecivedNotes = false;
    this.version = 0;

    this.socket = socketIOClient("http://localhost:5000/");
    this.socket.on("allNotes", notes => this.initNotes(notes));
    this.socket.on("noteUpdate", note => this.updateNote(note));
    this.socket.on("shareNotes", amountOfClients =>
        this.sendAllNotes(amountOfClients)
    );
  };

  shouldComponentUpdate() {
    return !this.state.modalState.open;
  }

  state = {
    noteToEdit: {},
    notes: {},
    modalState: {
      mode: "normal",
      id: -1,
      open: false,
      header: "",
      body: ""
    }
  };

  initNotes(notes) {
    if (!this.hasRecivedNotes || notes.version > this.version) {
      this.setState({notes: notes.notes});
      this.hasRecivedNotes = true;
      this.version = notes.version;
      console.log(this.state.notes);
    }
  };

  sendAllNotes(amountOfClients) {
    if (amountOfClients < 2) {
      this.hasRecivedNotes = true;
    }
    if (this.hasRecivedNotes) {
      this.socket.emit('allNotes', {
        notes: this.state.notes,
        version: this.version
      });
    }
  };

  propagateUpdate() {
    if (this.state.modalState.id !== -1) {
      this.socket.emit('noteUpdate', {
        ID: this.state.modalState.id,
        header: this.state.modalState.header,
        body: this.state.modalState.body,
      });
    }
  };

  updateNote(note) {
    const updatedNotes = this.state.notes;
    updatedNotes[note.ID] = note;
    this.setState({notes: updatedNotes});
    this.version++;
    console.log(this.state.notes);
    console.log(this.version);
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
    if (this.state.modalState.id === -1) {
      this.setNewNoteID();
    }
    this.setState({
      modalState: {...this.state.modalState, header: e.target.value}
    }, () => {
      this.propagateUpdate();
    });
  };

  handleBodyChange = e => {
    if (this.state.modalState.id === -1) {
      this.setNewNoteID();
    }
    this.setState({
      modalState: {...this.state.modalState, body: e.target.value}
    }, () => {
      this.propagateUpdate();
    });
  };

  handleModalState = () => {
    this.setState({
      modalState: {
        ...this.state.modalState,
        open: !this.state.modalState.open
      }
    });
  };

  editNote = (e, noteID) => {
    this.setState({
      noteToEdit: noteID,
      modalState: {
        ...this.state.modalState,
        mode: "edit",
        open: !this.state.modalState.open,
        header: this.state.notes[noteID].header,
        body: this.state.notes[noteID].body
      }
    });
  };

  submitNewNote = e => {
    this.setState({
      modalState: {...this.state.modalState, open: false}
    });
  };

  render() {
    const Background = styled.div`
      display: flex;
      flex-direction: row;
      background-color: #fff;
      position: fixed;
      width: 100%;
      flex-wrap: wrap;
      overflow: auto;
      overflow-y: hidden;
      height: 100%;
      z-index: 1000;
      padding: 30px;
    `;
    const modalState = this.state.modalState.open;
    console.log(this.state.modalState.mode);
    return (
      <div>
        <Header />
        <Background>
          <AddButton handleModalState={this.handleModalState} />
          {Object.keys(this.state.notes).map(note => (
            <Note
              key={this.state.notes[note].ID}
              id={this.state.notes[note].ID}
              header={this.state.notes[note].header}
              body={this.state.notes[note].body}
              editNote={this.editNote}
            />
          ))}
          {modalState && (
            <Modal
              modalMode={this.state.modalState.mode}
              modalstate
              noteToEdit={this.state.notes[this.state.noteToEdit]}
              headerChange={this.handleHeaderChange}
              bodyChange={this.handleBodyChange}
              submitNewNote={this.submitNewNote}
              submitEditedNote={this.submitEditedNote}
            />
          )}
        </Background>
      </div>
    );
  }
}

export default App;
