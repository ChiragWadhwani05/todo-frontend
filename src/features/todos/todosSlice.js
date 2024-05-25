import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    removeTodo: (state, action) => {
      delete state[action.payload];
    },
    updateTodo: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    addTodos: (state, action) => {
      if (Array.isArray(action.payload)) {
        action.payload.forEach(todo => {
          state[todo._id] = todo;
        });
      } else {
        state[action.payload._id] = action.payload;
      }
    },
  },
});

export const {addTodos, removeTodo, updateTodo} = todosSlice.actions;

export const selectAllTodo = state => state.todos;
export const selectTodo = (state, id) => state.todos[id];

export const todosReducer = todosSlice.reducer;
