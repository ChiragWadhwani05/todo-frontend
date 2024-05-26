import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileDialog: false,
  logoutDialog: false,
};

const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    toggleProfileDialog: (state) => {
      state.profileDialog = !state.profileDialog;
    },
    toggleLogoutDialog: (state) => {
      state.logoutDialog = !state.logoutDialog;
    },
  },
});

export const { toggleProfileDialog, toggleLogoutDialog } = dialogsSlice.actions;

export const dialogsReducer = dialogsSlice.reducer;
