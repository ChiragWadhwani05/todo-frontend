import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {createTheme, ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline for consistent styling
import {purple} from '@mui/material/colors';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Home from './components/Home';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser, setUser} from './features/auth/userSlice';
import NotFound from './components/NotFound';
import Otp from './features/auth/Otp';

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
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  if (!user.authorizationToken) {
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      const decodedUser = JSON.parse(rawUser);
      if (decodedUser.authorizationToken) {
        dispatch(setUser(decodedUser));
      }
    }
  }

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
          {!user.authorizationToken && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/otp" element={<Otp />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
