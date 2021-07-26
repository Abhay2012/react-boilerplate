/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'sanitize.css/sanitize.css';

// Import root app
import { App } from './app';

import { HelmetProvider } from 'react-helmet-async';

const MOUNT_NODE = document.getElementById('root');

const ConnectedApp = ({ Component }) => (
  <HelmetProvider>
    <React.StrictMode>
      <Component />
    </React.StrictMode>
  </HelmetProvider>
);
const render = Component => {
  ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
};

render(App);
