import React from "react";
import styled from "styled-components";

class Header extends React.PureComponent {
  render() {
    const TopBar = styled.div`
      align-items: center;
      background-color: #004d00;
      border-bottom: 10px solid #339933;
      height: 150px;
      padding-top: 75px;
      color: #cccccc;
      text-align: center;
      font-size: 42px;
      font-family: sans-serif;
      font-weight: 800;
      
    `;
    return <TopBar>
      REMINDEER
    </TopBar>;
  }
}

export default Header;
