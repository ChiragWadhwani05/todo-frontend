import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/auth/userSlice';
import {apiSlice} from './api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
