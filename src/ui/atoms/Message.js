import styled from "styled-components";

export const Message = styled.textarea`
  border-radius: 20px;
  background: rgba(0, 0, 0, 0);
  font-size: 1.1rem;
  padding: 10px 15px;
  width: 100%;
  height: 90%;
  margin: auto 0;
  border: none;
  color: rgb(209, 209, 214);
  font-family: "SF Display", Arial, Helvetica, sans-serif;
  font-weight: 500;
  line-height: 1.3rem;
  overflow-y: scroll;

  ::placeholder {
    color: rgb(99, 99, 102);
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;