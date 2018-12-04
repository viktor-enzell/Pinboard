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
      closeModal,
      noteToEdit,
      modalMode
    } = this.props;
    return (
        <div>
          {modalMode === "normal" && (
              <Wrapper>
                <Main>
                  <HeaderInput placeholder="Header" onChange={headerChange}/>
                  <BodyText placeholder="Write here!" onChange={bodyChange}/>
                  <Footer>
                    <Submit onClick={closeModal}>Spara</Submit>
                  </Footer>
                </Main>
              </Wrapper>
          )}
          {modalMode === "edit" && (
              <Wrapper>
                <Main>
                  <HeaderInput onChange={headerChange} defaultValue={noteToEdit.header}/>
                  <BodyText onChange={bodyChange} defaultValue={noteToEdit.body}/>
                  <Footer>
                    <Submit onClick={closeModal}>Spara</Submit>
                  </Footer>
                </Main>
              </Wrapper>
          )}
        </div>
    );
  }
}

export default Modal;
