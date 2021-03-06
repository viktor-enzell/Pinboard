import React from "react";
import styled from "styled-components";

class Header extends React.PureComponent {
  render() {
    const TopBar = styled.div`
      align-items: center;
      background-color: #001021;
      color: #F4F6F7;
      height: 20%
      padding-top: 45px;
      padding-bottom: 45px;
      text-align: center;
      font-size: 42px;
      font-family: sans-serif;
      font-weight: 800;
    `;
    return <TopBar>Notice</TopBar>;
  }
}

export default Header;
