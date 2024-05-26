import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { green } from '@mui/material/colors';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: green,
    secondary: {
      main: '#757575',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#b0bec5',
      disabled: '#757575',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#29b6f6',
    },
    success: {
      main: '#66bb6a',
    },
    divider: '#b0bec5',
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      color: '#212121',
    },
    h2: {
      color: '#212121',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: green,
    secondary: {
      main: '#8687E780',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
      disabled: '#757575',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#29b6f6',
    },
    success: {
      main: '#66bb6a',
    },
    divider: '#b0bec5',
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      color: '#ffffff',
    },
    h2: {
      color: '#ffffff',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider
        theme={
          window.matchMedia('(prefers-color-scheme: dark)').matches
            ? darkTheme
            : lightTheme
        }
      >
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
