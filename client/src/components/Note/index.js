import React from "react";
import styled from "styled-components";

class Note extends React.PureComponent {
  render() {
    const Wrapper = styled.button`
      display: flex;
      padding: 20px 20px 5px 20px;
      margin-right: 30px;
      flex-direction: column;
      width: 240px;
      height: 225px;
      background: #b8d8d8;
      border-radius: 5px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
      &:hover {
        background: #92bcbc;
      }
    `;

    const Heading = styled.span`
      font-weight: 700;
      margin-bottom: 5px;
    `;

    const BodyText = styled.div`
      font-size: 14px;
      max-height: 140px;
      overflow: auto;
      overflow-style: auto;
    `;

    const Date = styled.span`
      position: absolute;
      margin-top: 180px;
      margin-left: 135px;
    `;
    const { header, body, editNote } = this.props;
    return (
      <Wrapper onClick={editNote}>
        <Heading>{header}</Heading>
        <BodyText>{body}</BodyText>
        <Date>12/11-2018</Date>
      </Wrapper>
    );
  }
}
export default Note;
