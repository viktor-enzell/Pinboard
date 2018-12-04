import React from "react";
import {
  Wrapper,
  HeaderInput,
  BodyText,
  Footer,
  Main,
  Submit
} from "./Styling";

class Modal extends React.Component {
  render() {
    const {
      bodyChange,
      headerChange,
      submitNewNote,
      submitEditedNote,
      modalMode,
      noteToEdit
    } = this.props;
    console.log()
    return (
      <div>
        {modalMode === "normal" && (
          <Wrapper>
            <Main>
              <HeaderInput placeholder="Rubrik" onChange={headerChange} />
              <BodyText placeholder="Din memo" onChange={bodyChange} />
              <Footer>
                <Submit onClick={submitNewNote}>Spara</Submit>
              </Footer>
            </Main>
          </Wrapper>
        )}
        {modalMode === "edit" && (
          <Wrapper>
            <Main>
              <HeaderInput onChange={headerChange} value={noteToEdit.header} />
              <BodyText onChange={bodyChange} value={noteToEdit.body} />
              <Footer>
                <Submit onClick={submitEditedNote}>Spara</Submit>
              </Footer>
            </Main>
          </Wrapper>
        )}
      </div>
    );
  }
}
export default Modal;
