import React from "react";
import styled from "styled-components";
import Header from "./Header";

class MainPage extends React.PureComponent {
    render() {
        const Background = styled.div`
      background-color: #ccfff2;
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 1000;
      padding: 30px; 
    `;
        return (
        <div>
            <Header/>
            <Background>
                hej jävla losers
            </Background>
        </div>
        );
    }
}

export default MainPage;
