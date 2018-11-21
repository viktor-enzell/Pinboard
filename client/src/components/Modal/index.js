import React from "react";
import { Wrapper, HeaderInput, BodyText, Footer, Main, Submit } from "./Styling";

class Modal extends React.PureComponent {
  state = {
    header: '',
    body: '',
    date: ''
  };

  handleHeaderChange = e => {
    this.setState({ header: e.target.value });
    console.log(this.state.header)
  };

  handleBodyChange = e => {
    this.setState({ body: e.target.value });
    console.log(this.state.body)
    };

  render() {
    return (
      <Wrapper>
        <Main>
          <HeaderInput placeholder="Rubrik" onChange={this.handleHeaderChange} />
          <BodyText placeholder="Din memo" onChange={this.handleBodyChange}/>
          <Footer>
            <Submit>hej</Submit>
          </Footer>
        </Main>
      </Wrapper>
    );
  }
}
export default Modal;
