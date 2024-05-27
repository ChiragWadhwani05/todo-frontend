import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileDialog: false,
  logoutDialog: false,
  addTaskDialog: false,
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
    toggleAddTaskDialog: (state) => {
      state.addTaskDialog = !state.addTaskDialog;
    },
  },
});

export const { toggleProfileDialog, toggleLogoutDialog, toggleAddTaskDialog } =
  dialogsSlice.actions;

export const dialogsReducer = dialogsSlice.reducer;
