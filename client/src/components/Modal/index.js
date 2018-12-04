import React from "react";
import {
  Wrapper,
  HeaderInput,
  BodyText,
  Footer,
  Main,
  Submit,
  Trash,
} from "./Styling";

class Modal extends React.Component {

  render() {
    const { bodyChange, headerChange, submitNewNote } = this.props;
    return (
      <Wrapper>
        <Main>
          <HeaderInput placeholder="Rubrik" onChange={headerChange} />
          <BodyText placeholder="Din memo" onChange={bodyChange} />
          <Footer>
            <Submit onClick={submitNewNote}>Spara</Submit>
          </Footer>
        </Main>
      </Wrapper>
    );
  }
}
export default Modal;
