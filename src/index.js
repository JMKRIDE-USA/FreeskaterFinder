import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { JFHApp } from '@jeffdude/frontend-helpers';
import { GMapsAPIKeyProvider } from './modules/map-context';

ReactDOM.render(
  <React.StrictMode>
    <JFHApp config={{backendURL: "http://192.168.1.8:3600"}}>
      <GMapsAPIKeyProvider>
        <App />
      </GMapsAPIKeyProvider>
    </JFHApp>
  </React.StrictMode>,
  document.getElementById('root')
);