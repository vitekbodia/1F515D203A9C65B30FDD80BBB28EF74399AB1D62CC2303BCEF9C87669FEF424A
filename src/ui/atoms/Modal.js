import styled from "styled-components";

export const Modal = styled.div`
  display: flex;
  width: ${props => props.w};
  height: ${props => props.h};
  background: ${props => props.bg};
  border-radius: 20px;
  opacity: 0.7;
  border-radius: 20px;
  box-shadow: 2px 6px 15px #111111;
  align-items: center;

  ${({ profile }) =>
    profile &&
    `
     flex-direction: column;
     justify-content: center;
     align-items: center;
     margin: auto;
  `}

${({ switches }) =>
  switches &&
  `
    flex-direction: column;
    justify-content: space-around;
  `}

  ${({ prefGroup }) =>
    prefGroup &&
    `
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    margin: 20px 40px;
  `}

${({ message }) =>
  message &&
  `
  flex-flow: row wrap;
  align-items: center;
    padding: 2px 6px;
    position: relative;
    margin-bottom: 15px;
  `}

${({ gallery }) =>
  gallery &&
  `
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
    padding: 2px 6px;
    position: absolute;
    z-index: 10;
    opacity: 0.9;
    top: 10%;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      display: none
    }
  `}

${({ attachments }) =>
  attachments &&
  `
  align-items: center;
  margin: 0;
  margin-top: 25px;
  `}

${({ displayMessage }) =>
  displayMessage &&
  `
  margin: 25px 0;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  font-family: 'SF Display', Arial;
  padding: 15px;
  overflow-y: scroll;
  height: auto;
  min-height: auto;

  ::-webkit-scrollbar { 
    display: none; 
}
  `}

${({ blacklist }) =>
  blacklist &&
  `
  position: absolute;
  margin: auto 0;
  top: 10%;
  z-index: 10;
  overflow-y: scroll;

  ::-webkit-scrollbar { 
    display: none; 
}
  `}

${({ messageBlock }) =>
  messageBlock &&
  `
  padding: 15px;
  font-weight: bold;
  margin: 15px;
  cursor: pointer;
  position: relative;
  `}
`;

export const ModalGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 600px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
