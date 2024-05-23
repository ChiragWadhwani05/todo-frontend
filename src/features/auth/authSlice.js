import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  _id: null,
  username: null,
  email: null,
  givenName: null,
  familyName: null,
  authorizationToken: null,
  avatar: null,
  isLoggedIn: false,
  password: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem('authorizationToken');
      return initialState;
    },
    setCredentials: (state, action) => {
      Object.keys(state).forEach(key => {
        if (key in action.payload) state[key] = action.payload[key];
      });
    },
  },
});

export const {logout, setCredentials} = authSlice.actions;

export const selectCurrentUser = state => state.auth;

export default authSlice.reducer;
