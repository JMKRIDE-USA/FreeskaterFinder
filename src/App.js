import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Header from './components/mui-header';
import MapComponent from './components/map';

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
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header/>}>
              <Route index element={<MapComponent/>}/>
              <Route path="*" element={<PageNotFound/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
