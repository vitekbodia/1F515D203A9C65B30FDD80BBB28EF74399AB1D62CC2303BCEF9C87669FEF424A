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
  font-size: 1rem;
  font-weight: 300;
  opacity: 0.7;
  text-decoration: none;
`;

export const TextInfoMailing = styled.span`
  position: absolute;
  color: white;
  right: 10px;
  font-family: "SF Display", Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  opacity: 0.7;
  text-decoration: none;
  top: 10px;
`;
