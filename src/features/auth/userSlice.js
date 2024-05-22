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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload.email) {
        state.email = action.payload.email;
      }
      if (action.payload.givenName) {
        state.givenName = action.payload.givenName;
      }
      if (action.payload.familyName) {
        state.familyName = action.payload.familyName;
      }
      if (action.payload.username) {
        state.username = action.payload.username;
      }
      if (action.payload.avatar) {
        state.avatar = action.payload.avatar;
      }
      if (action.payload.authorizationToken) {
        state.authorizationToken = action.payload.authorizationToken;
      }
      if (action.payload._id) {
        state._id = action.payload._id;
      }
      if (typeof action.payload.isLoggedIn === 'boolean') {
        state.isLoggedIn = action.payload.isLoggedIn;
      }
      if (action.payload.password) {
        state.password = action.payload.password;
      }

      // Save user to local storage
      if (state.isLoggedIn) {
        localStorage.setItem('user', JSON.stringify(state));
      }
    },
    logout: state => {
      state._id = null;
      state.username = null;
      state.email = null;
      state.givenName = null;
      state.familyName = null;
      state.authorizationToken = null;
      state.avatar = null;
      state.isLoggedIn = false;
      state.password = null;
    },
  },
});

export const selectUser = state => state.user;

export const {logout, setUser} = userSlice.actions;

export default userSlice.reducer;
