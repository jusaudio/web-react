import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
const changes = "- Flag as not relevant\n- tracking background metrics";
// tslint:disable-next-line:no-console
console.info("release: 0.2.2\n" + changes);

Sentry.init({
  dsn: "https://c23e91dcbfb94702ae474aa5785d8e0f@sentry.io/1365148"
});

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
