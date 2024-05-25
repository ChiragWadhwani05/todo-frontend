import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from '../api/apiSlice';
import {todosReducer} from '../features/todos/todosSlice';
import {authReducer} from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    todos: todosReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
