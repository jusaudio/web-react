import * as React from 'react';
import Routes from './Routes';
import { Provider } from "redux-zero/react";
import store from './store';

import SentryErrorBoundary from "./components/SentryErrorBoundary";

const App = () =>
  <Provider store={store}>
    <SentryErrorBoundary>
      <Routes />
    </SentryErrorBoundary>
  </Provider>

export default App;
