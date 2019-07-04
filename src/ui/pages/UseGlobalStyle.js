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


  .rangeslider-horizontal {
    background: white !important;
    width: 100px !important;
    height: 8px !important;
  }

  .rangeslider__fill {
    background: rgb(10, 132, 255) !important;
  }

  .rangeslider__handle {
    width: 20px !important;
    height: 20px !important;

    ::after {
      display: none !important;
    }
  }

  .overflow-y {
    overflow: scroll;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .text-center {
    text-align: center;
  }
`;
