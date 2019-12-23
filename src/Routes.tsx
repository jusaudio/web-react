import * as React from 'react';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './App.css';
import asyncComponent from './components/AsyncComponent';

const MusicListAsync = asyncComponent(() => import('./modules/player/MusicList'));
const MusicPlayerAsync = asyncComponent(() => import('./modules/player/Player'));

export default () =>
  <Router>
    <React.Fragment>
      <Route exact={true} path={`/`} component={MusicListAsync} />
      <Route exact={true} path={`/watch`} component={MusicListAsync} />
      <Route exact={true} path={`/player/:vidId`} component={MusicPlayerAsync} />
    </React.Fragment>
  </Router>