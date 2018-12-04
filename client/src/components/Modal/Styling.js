import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  padding: 20px;
  background: #b8d8d8;
  border-radius: 5px;
  width: 40%;
  height: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Submit = styled.button`
  outline: none;
  border-radius: 5px;
  border: none;
  background: #e2efef;
  height: 30px;
  width: 50px;
  &:hover {
    background: #e9f3f3;
  }
`;

export const HeaderInput = styled.input`
  width: auto;
  font-size: 32px;
  padding: 0.2em;
  margin-top: 20px;
  margin-bottom: 0.5em;
  font-weight: 700;
  background: #a5c2c2;
  outline: none;
  border: black 2px;
  border-radius: 3px;
`;

export const BodyText = styled.textarea`
  width: auto;
  top: 0;
  resize: none;
  height: 70%;
  font-size: 14px;
  padding: 0.5em;
  margin-bottom: 30px;
  background: #a5c2c2;
  outline: none;
  border: black 2px;
  border-radius: 3px;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

export const Trash = styled.button`
  font-size: 14px;
  left: 20px;
  border: none;
  line-height: 25px;
  width: 25px;
  //background: none;
  border-radius: 5px;
  outline: none;
  &:hover {
    background: #92bcbc;
  }
`;

export const TopDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;