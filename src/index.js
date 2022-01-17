import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { JFHApp } from '@jeffdude/frontend-helpers';
import { FFUserProvider } from './modules/user-context'

ReactDOM.render(
  <React.StrictMode>
    <JFHApp config={{backendURL: "http://192.168.0.88:3600"}}>
      <FFUserProvider>
        <App />
      </FFUserProvider>
    </JFHApp>
  </React.StrictMode>,
  document.getElementById('root')
);