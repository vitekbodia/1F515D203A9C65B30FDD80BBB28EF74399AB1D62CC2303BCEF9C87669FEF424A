import styled from "styled-components";

export const SenderPrefs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  align-self: center;
  margin: auto;

  input:checked + label {
    background-color: rgb(88, 86, 214);
    color: white;
    opacity: 1;
  }

  input[type="radio"] {
    display: none;
  }
`;

export const PrefGroup = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  font-family: "SF Display", Arial, Helvetica,sans-serif;
      ${({ msgAttach }) =>
        msgAttach &&
        `
    height: 475px;
    align-items: flex-start;
  `}
      ${({ rightPanel }) =>
        rightPanel &&
        `
    justify-content: space-between;
    height: 300px;
    margin-left: 20px;
  `}
      ${({ blacklist }) =>
        blacklist &&
        `
    position: absolute;
    left: 0;
    right: 0;
    top: 20px;
    
  `};
`;

export const PrefItem = styled.label`
  width: 45px;
  height: 45px;
  background: rgba(58, 58, 60, 0.5);
  border-radius: 100%;
  color: rgba(122, 122, 127, 0.9);
  margin: 10px;
  font-size: 1.35rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${({ inset }) =>
    inset &&
    `
    position: absolute;
    bottom: 1%;
    right: 1%;
  `}
`;
