import { createGlobalStyle } from "styled-components";

export const UseGlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }

  body {
    overflow: hidden;
    background: black;

  }

  #root {
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
  }
`;
