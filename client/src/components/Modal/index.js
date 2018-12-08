import React from "react";
import {
  Wrapper,
  HeaderInput,
  BodyText,
  Footer,
  Main,
  Submit,
  Trash,
  TopDiv
} from "./Styling";

class Modal extends React.Component {
  handleClick = () => {
    this.props.deleteNote(this.props.noteToEdit.ID);
  };
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
              <HeaderInput placeholder="Title" onChange={headerChange} />
              <BodyText placeholder="Write your note here!" onChange={bodyChange} />
              <Footer>
                <Submit onClick={closeModal}>Save</Submit>
              </Footer>
            </Main>
          </Wrapper>
        )}
        {modalMode === "edit" && (
          <Wrapper>
            <Main>
              <TopDiv>
                <Trash onClick={this.handleClick}>X</Trash>
              </TopDiv>
              <HeaderInput
                onChange={headerChange}
                defaultValue={noteToEdit.header}
              />
              <BodyText onChange={bodyChange} defaultValue={noteToEdit.body} />
              <Footer>
                <Submit onClick={closeModal}>Save</Submit>
              </Footer>
            </Main>
          </Wrapper>
        )}
      </div>
    );
  }
}

export default Modal;
