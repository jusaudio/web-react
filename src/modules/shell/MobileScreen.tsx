import * as React from "react";
import styled from "styled-components";

export default ({
  children,
  noPadding = false,
  paddingTop }: { children: any, noPadding?: boolean, paddingTop?: string, }) => {
  return <MobileScreenStyled noPadding={noPadding} paddingTop={paddingTop}>
    { children }
  </MobileScreenStyled>
}

const MobileScreenStyled: any = styled.div`
  box-sizing: border-box;
  height: 90vh;
  width: auto;
  padding: ${(p: any) => p.noPadding ? "0rem" : "1rem"}
  padding-top: ${(p: any) => p.paddingTop ? p.paddingTop : "1rem"};
  display: flex;
  flex-flow: column;
  background: white;
  justify-content: start;
  margin: 0 auto;
`;
