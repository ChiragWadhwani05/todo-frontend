import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {createTheme, ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline for consistent styling
import {purple} from '@mui/material/colors';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Home from './components/Home';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: purple,
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
    primary: purple,
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

function App() {
  return (
    <ThemeProvider
      theme={
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? darkTheme
          : lightTheme
      }>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
