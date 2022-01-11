import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Header from './components/header';
import MapPage from './pages/map';
import CreateAccountPage from './pages/create-account.js';

import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/404';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#080808',
    },
    secondary: {
      main: '#ff1744',
    },
    background: {default: '#c8c8c8', paper: '#f3f3f3'},
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header/>}>
              <Route index element={<MapPage/>}/>
              <Route path="create-account" element={<CreateAccountPage/>}/>
              <Route path="*" element={<PageNotFound/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
