import * as React from 'react';
import Routes from './Routes';
import { Provider } from "redux-zero/react";
import store from './store';

const App = () =>
  <Provider store={store}>
    <Routes />
  </Provider>

export default App;
