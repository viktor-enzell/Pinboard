import React from "react";
import {
  Wrapper,
  HeaderInput,
  BodyText,
  Footer,
  Main,
  Submit,
  CloseButton
} from "./Styling";

class Modal extends React.PureComponent {
  render() {
    const { bodyChange, headerChange, submitNewNote } = this.props;
    return (
      <Wrapper>
        <Main>
          <CloseButton />
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
