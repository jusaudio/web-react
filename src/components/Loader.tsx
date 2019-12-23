import * as React from 'react';
import styled from "styled-components";
import { CircularProgress } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Theme from '../utils/Theme';

const Loader = () =>
  <MuiThemeProvider theme={Theme}>
    <LoaderContainer>
      <CircularProgress color="primary" size={50} />
    </LoaderContainer>
  </MuiThemeProvider>

export const LoaderMusicPlayer = ({ message }: any) =>
  <MuiThemeProvider theme={Theme}>
    <TrackLoader>
      {message ? <span>{message}</span> : null}
    </TrackLoader>
  </MuiThemeProvider>

const LoaderContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const TrackLoader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default Loader;