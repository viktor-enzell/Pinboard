import React from "react";
import styled from "styled-components";

class Note extends React.PureComponent {
  handleNoteClick = () => {
      this.props.editNote(this.props.id)
  };
  render() {
    const Wrapper = styled.div`
      display: flex;
      padding: 20px 20px 5px 20px;
      margin: 0 30px 30px 0;
      flex-direction: column;
      width: 200px;
      height: 200px;
      background: #AEC1CC;
      border-radius: 5px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
      &:hover {
        background: #9CB4C1;
        cursor: pointer;
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

    const { header, body} = this.props;
    return (
           <Wrapper
                onClick={this.handleNoteClick}>
                <Heading>{header}</Heading>
                <BodyText>{body}</BodyText>
                <Date>12/11-2018</Date>
            </Wrapper>
    );
  }
}
export default Note;
