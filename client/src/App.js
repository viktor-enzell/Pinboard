import React, { Component } from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import socketIOClient from "socket.io-client"

class App extends Component {
  constructor(props) {
    super(props);

    this.propagateUpdate = this.propagateUpdate.bind(this);

    this.socket = socketIOClient('http://localhost:5000/');

    this.socket.on('propagate', note => this.updatePinboard(note));
  };

  state = {
    notes: {},
    modalState: {
      open: true,
      header: "",
      body: ""
    }
  };

  handleHeaderChange = e => {
    this.setState({ header: e.target.value });
    console.log(this.state.modalState.header);
  };

  handleModalState = e => {
    this.setState({ body: e.target.value });
    console.log(this.state.modalState.open);
  };

  handleBodyChange = e => {
    this.setState({ body: e.target.value });
    console.log(this.state.modalState.body);
  };

  updatePinboard(note) {
    this.setState({ open: false,
                    notes: { note }
    });
    console.log(this.state.notes);
  };

  propagateUpdate(note) {
    this.socket.emit('propagate', { note })
  };

  render() {
    const modalState = this.state.modalState.open;
    return (
      <MainPage
        propagateUpdate = {this.propagateUpdate}
        bodyChange={this.handleBodyChange}
        headerChange={this.handleHeaderChange}
        modalStateChange={this.handleModalState}
        modalState={modalState}
      />
    );
  }
}

export default App;
