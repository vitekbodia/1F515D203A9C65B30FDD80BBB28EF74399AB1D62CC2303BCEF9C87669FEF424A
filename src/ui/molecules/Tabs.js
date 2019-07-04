import styled from "styled-components";

export const Tab = styled.div`
  width: 75px;
  height: 25px;
  border: 1.65px solid rgb(10, 132, 255);
  border-right: none;
  border-left: none;
  line-height: 20px;
  text-align: center;
  font-family: "SF Display", Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  background: ${props => (props.blue ? "rgb(10, 132, 255)" : "none")};

  &:nth-child(2) {
    border-right: 1.65px solid rgb(10, 132, 255);
  }

  &:first-child {
    border-radius: 10px 0 0 10px;
    border: 1.65px solid rgb(10, 132, 255);
  }

  &:last-child {
    border-radius: 0 10px 10px 0;
    border: 1.65px solid rgb(10, 132, 255);
  }
`;

export const TabsWrapper = styled.div`
  width: 100%;
  height: 25px;
  margin: 30px auto;
  display: flex;
  justify-content: center;
`;
