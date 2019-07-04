import styled from "styled-components";

export const ProfileAvatar = styled.div`
  width: ${props => props.w};
  height: ${props => props.h};
  border-radius: 100%;
  background: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;

  ${({ modal }) =>
    modal &&
    `
    margin: 20px 0;
  `}
`;

export const ProfileText = styled.span`
  color: #333333;
  margin: 15px 0;
  font-family: "SF Display", Arial, Helvetica, sans-serif;

  ${({ title }) =>
    title &&
    `
    font-size: 2rem;
  `}
  ${({ about }) =>
    about &&
    `
    font-size: 1.2rem;
  `};
`;
