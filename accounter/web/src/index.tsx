import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './tailwind.output.css';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { NODE_ENV, VERSION } from './config';

if (NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://91cf151a010240c5b9675f7fede2114c@o523541.ingest.sentry.io/5635703',
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 0.1,
    release: `connector@${VERSION}`
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
