import styled from "styled-components";

export const SenderPrefs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  align-self: center;
  margin: auto;

  input:checked + label {
    background-color: rgb(0, 122, 255);
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
  justify-content: center;
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
  width: 40px;
  height: 40px;
  background: rgb(152, 152, 157);
  opacity: 0.775;
  border-radius: 100%;
  color: black;
  margin: 15px 10px;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ inset }) =>
    inset &&
    `
    position: absolute;
    bottom: 1%;
    right: 1%;
  `}
`;
