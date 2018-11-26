import React from "react";
import styled from "styled-components";
import Header from "./Header";
import AddButton from "../../components/AddButton";
import Note from "../../components/Note";
import Modal from "../Modal/index";

class MainPage extends React.PureComponent {
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

    const {
      bodyChange,
      headerChange,
      submitNewNote,
      handleModalState,
      modalState,
      notes
    } = this.props;
    return (
      <div>
        <Header />
        <Background>
          <AddButton handleModalState={handleModalState} />
          {Object.keys(notes).map(note => (
            <Note key={notes[note].ID} header={notes[note].header} body={notes[note].body} editNote={handleModalState} />
          ))}
          {modalState && (
            <Modal
              bodyChange={bodyChange}
              headerChange={headerChange}
              submitNewNote={submitNewNote}
            />
          )}
        </Background>
      </div>
    );
  }
}

export default MainPage;
