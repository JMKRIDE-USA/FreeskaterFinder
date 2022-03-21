import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

import { JFHApp } from '@jeffdude/frontend-helpers';
import { GMapsAPIKeyProvider } from './modules/map-context';
import WindowSizeProvider from './modules/window-context';


const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#080808',
    },
    secondary: {
      main: '#00b0ff',
    },
    neutral: {
      main: '#dadada',
      contrastText: '#000'
    },
    background: {default: '#c8c8c8', paper: '#f3f3f3'},
  },
});


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <JFHApp config={{backendURL: process.env.REACT_APP_BACKEND_URL, debug: process.env?.REACT_APP_DEBUG || false}}>
        <GMapsAPIKeyProvider>
          <WindowSizeProvider>
            <App />
          </WindowSizeProvider>
        </GMapsAPIKeyProvider>
      </JFHApp>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);