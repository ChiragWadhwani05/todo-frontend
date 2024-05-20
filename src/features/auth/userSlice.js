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
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {
        _id,
        username,
        email,
        givenName,
        familyName,
        authorizationToken,
        avatar,
        isLoggedIn,
      } = action.payload;

      state._id = _id;
      state.username = username;
      state.email = email;
      state.givenName = givenName;
      state.familyName = familyName;
      state.authorizationToken = authorizationToken;
      state.avatar = avatar;
      state.isLoggedIn = isLoggedIn;
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
    },
  },
});

export const selectUser = state => state.user;

export const {logout, setUser} = userSlice.actions;

export default userSlice.reducer;
