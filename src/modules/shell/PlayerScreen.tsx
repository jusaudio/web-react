import * as React from "react";
import styled from "styled-components";

export default ({ children }: { children: any }) => {
  return <PlayerScreenStyled>
    { children }
  </PlayerScreenStyled>
}

const PlayerScreenStyled = styled.div`
  box-sizing: border-box;
  background: #222;
  color: #fff;
  height: 92vh;
  width: auto;
  padding: 1rem;
  padding-top: 2rem;
  display: flex;
  flex-flow: column;
  justify-content: start;
  margin: 0 auto;
`;
