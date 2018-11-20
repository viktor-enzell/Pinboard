import React from "react";
import styled from "styled-components";
import Header from "./Header";
import AddButton from "../../components/AddButton";
import Note from "../../components/Note";

class MainPage extends React.PureComponent {
  render() {
    const Background = styled.div`
      display: flex;
      flex-direction: row;
      background-color: #fff;
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 1000;
      padding: 30px;
    `;

    return (
      <div>
        <Header />
        <Background>
          <AddButton />
          <Note />
        </Background>
      </div>
    );
  }
}

export default MainPage;
