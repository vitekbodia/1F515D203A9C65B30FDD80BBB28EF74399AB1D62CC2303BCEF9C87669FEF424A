import styled from "styled-components";

export const TextInfo = styled.span`
  font-size: 1rem;
  font-family: "SF Display", Arial, Helvetica, sans-serif;
  font-size: 400;
  color: rgb(177, 177, 183);
  position: absolute;
  top: 10px;
  right: 20px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TextInfoCredits = styled.a`
  position: absolute;
  color: white;
  bottom: 10px;
  right: 10px;
  font-family: "SF Display", Arial, Helvetica, sans-serif;
  font-size: 1.1rem;
  font-weight: 300;
  opacity: 0.7;
  text-decoration: none;
`;

export const TextInfoMailing = styled.span`
  color: white;
  font-family: "SF Display", Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  opacity: 0.7;
  text-decoration: none;
  margin: 3px 0;
`;

export const TextInfoMailingWrap = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;

  display: flex;
  flex-direction: column;
`;
