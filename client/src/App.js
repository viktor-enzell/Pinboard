import React, { Component } from "react";
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

    this.socket = socketIOClient("http://localhost:5000/");
    this.socket.on("allNotes", notes => this.initNotes(notes));
    this.socket.on("noteUpdate", note => this.updateNote(note));
    this.socket.on("shareNotes", amountOfClients =>
      this.sendAllNotes(amountOfClients)
    );

  }
  shouldComponentUpdate() {
      return !this.state.modalState.open;
  }

  state = {
    notes: {1:{ID: 1, header: 'hej', body:'då'}, 2:{ID: 2, header: 'hej', body:'då'}},
    modalState: {
      open: false,
      header: "",
      body: ""
    }
  };

  initNotes(notes) {
    if (!this.hasRecivedNotes) {
      this.setState({ notes: notes.notes });
      this.hasRecivedNotes = true;
    }
  }

  sendAllNotes(amountOfClients) {
    if (amountOfClients < 2) {
      this.hasRecivedNotes = true;
    }
    if (this.hasRecivedNotes) {
      this.socket.emit("allNotes", { notes: this.state.notes });
    }
  }

  propagateUpdate(noteID) {
    this.socket.emit("noteUpdate", {
      ID: noteID,
      header: this.state.modalState.header,
      body: this.state.modalState.body
    });
  }

  updateNote(note) {
    const updatedNotes = this.state.notes;
    updatedNotes[note.ID] = note;
    this.setState({ notes: updatedNotes });
  }

  handleHeaderChange = e => {
    this.setState({
      modalState: { ...this.state.modalState, header: e.target.value }
    });
  };

  handleBodyChange = e => {
    this.setState({
      modalState: { ...this.state.modalState, body: e.target.value }
    });
  };

  handleModalState = () => {
    this.setState({
      modalState: { ...this.state.modalState, open: !this.state.modalState.open }
    });
  };

  submitNewNote = e => {
    this.setState({
      modalState: { ...this.state.modalState, open: false }
    });
    const noteID = Object.keys(this.state.notes).length + 1;
    this.propagateUpdate(noteID);
  };

  deleteNote = (id, e) => {
    //const notes = object.assign([],this.state.notes);
    //notes.splice(id,1);
    //this.setState({notes:notes});
  }

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
    console.log(this.state.modalState);
    const modalState = this.state.modalState.open;
    return (
        <div>
            <Header />
            <Background>
                <AddButton handleModalState={this.handleModalState}/>
                {Object.keys(this.state.notes).map(note =>(
                    <Note
                        key={this.state.notes[note].ID}
                        header={this.state.notes[note].header}
                        body={this.state.notes[note].body}
                        editNote={this.handleModalState}
                        //deleteNote={this.deleteNote.bind(this,ID)}
                    />
                ))}
                {modalState && <Modal
                    modalstate
                    headerChange={this.handleHeaderChange}
                    bodyChange={this.handleBodyChange}
                    submitNewNote={this.submitNewNote}
                />}
            </Background>
        </div>
    );
  }
}

export default App;
