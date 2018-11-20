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
    width: 240px;
    height: 225px;
    margin-right 30px;
    background: #B8D8D8;
    display: flex;
    outline: none;
    border-radius: 5px;
    border: none;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px 5px 20px;
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
