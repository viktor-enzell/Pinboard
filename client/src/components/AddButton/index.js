import React from "react";
import styled from "styled-components";

class AddButton extends React.PureComponent {
  render() {

    const Span = styled.span`
      font-size: 120px;
         
    `;

    const B = styled.span`
      font-size: 15px;
      
    `;


    const Wrapper = styled.button`
    width: 200px;
    height: 200px;
    background: #B8D8D8;
    outline: none;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:hover {
    background: #92bcbc;
    }
    `;



    return (
      <Wrapper>
        <Span>+</Span>
        <B>Press me to add a note</B>
      </Wrapper>

    )
  }

}

export default AddButton;
