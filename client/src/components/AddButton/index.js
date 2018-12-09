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
    margin-right: 30px;
    background: #AEC1CC;
    display: flex;
    outline: none;
    border-radius: 5px;
    border: none;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px 5px 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    &:hover {
    background: #9CB4C1;
    cursor: pointer;
    }
    `;
    const { addNote } = this.props;
    return (
      <Wrapper onClick={addNote}>
        <Span>+</Span>
        <B>Press me to add a note</B>
      </Wrapper>

    )
  }

}

export default AddButton;
