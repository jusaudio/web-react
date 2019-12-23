import styled from "styled-components";

export const TextMain = styled.h3`
  color: rgba(0, 0, 0, 0.87);
  font-family: 'Roboto', arial, sans-serif;
  font-weight: 500;
  font-size: 1.4rem;
  align-self: ${(p: any) => p.position ? "start" : "center"};
  text-align: ${(p: any) => p.position ? p.position : "center"};
  margin: .5rem 0rem;
`;

export const TextBody = styled.p`
  color: rgba(0, 0, 0, 0.54);
  font-family: 'Roboto', arial, sans-serif;
  font-weight: 400;
  font-size: 1.15rem;
  align-self: center;
  text-align: center;
  width: 270px;
  margin-top: 0rem;
  margin-bottom: 2rem;
`;
