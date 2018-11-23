import React from "react";
import { Wrapper, HeaderInput, BodyText, Footer, Main, Submit } from "./Styling";

class Modal extends React.PureComponent {

  render() {
    const { bodyChange, headerChange, propagateUpdate } = this.props;
    return (
      <Wrapper>
        <Main>
          <HeaderInput placeholder="Rubrik" onChange={headerChange} />
          <BodyText placeholder="Din memo" onChange={bodyChange}/>
          <Footer>
            <Submit onClick = {() => propagateUpdate("This message comes from the note button")}>Spara</Submit>
          </Footer>
        </Main>
      </Wrapper>
    );
  }
}
export default Modal;
