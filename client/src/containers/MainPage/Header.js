import React from "react";
import styled from "styled-components";

class Header extends React.PureComponent {
  render() {
    const TopBar = styled.div`
      align-items: center;
      background-color: #b3ffb3;
      height: 150px;
      padding-top: 75px;
      text-align: center;
      font-size: 32px;
      font-family: sans-serif;
      font-weight: 800;
      
    `;
    return <TopBar>
      REMINDEER
    </TopBar>;
  }
}

export default Header;
