import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { JFHApp } from '@jeffdude/frontend-helpers';

ReactDOM.render(
  <React.StrictMode>
    <JFHApp config={{backendURL: "http://192.168.0.88:3600"}}>
      <App />
    </JFHApp>
  </React.StrictMode>,
  document.getElementById('root')
);