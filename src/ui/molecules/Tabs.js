import styled from "styled-components";

export const Tab = styled.div`
  width: 75px;
  height: 25px;
  border: 1.65px solid rgb(88, 86, 214);
  border-right: none;
  border-left: none;
  line-height: 20px;
  text-align: center;
  font-family: "SF Display", Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  font-weight: bold;
  color: rgb(209, 209, 214);
  cursor: pointer;
  background: ${props => (props.blue ? "rgb(88, 86, 214)" : "none")};

  &:nth-child(2) {
    border-right: 1.65px solid rgb(88, 86, 214);
  }

  &:first-child {
    border-radius: 10px 0 0 10px;
    border: 1.65px solid rgb(88, 86, 214);
  }

  &:last-child {
    border-radius: 0 10px 10px 0;
    border: 1.65px solid rgb(88, 86, 214);
  }
`;

export const TabsWrapper = styled.div`
  width: 100%;
  height: 25px;
  margin: 30px auto;
  display: flex;
  justify-content: center;
`;
