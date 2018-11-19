import React from "react";
import styled from "styled-components";

class Header extends React.PureComponent {
  render() {
    const TopBar = styled.div`
      align-items: center;
      background-color: #A1A499;
      height: 150px;
      padding-top: 75px;
      color: #FE5F55;
      text-align: center;
      font-size: 42px;
      font-family: sans-serif;
      font-weight: 800;
      
    `;
    return <TopBar>
      Notice
    </TopBar>;
  }
}

export default Header;
