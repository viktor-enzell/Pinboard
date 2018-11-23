import React, { Component } from "react";
import "./App.css";
import MainPage from "./components/MainPage";


class App extends Component {
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
