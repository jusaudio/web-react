import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
const changes = "- Flag as not relevant\n- tracking background metrics";
// tslint:disable-next-line:no-console
console.info("release: 0.2.2\n" + changes);

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
