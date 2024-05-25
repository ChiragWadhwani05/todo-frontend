import {
  addTodos,
  removeTodo,
  updateTodo,
} from '../../features/todos/todosSlice';
import {apiSlice} from '../apiSlice';

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createTodo: builder.mutation({
      query: todo => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(addTodos(data.data));
        } catch (error) {
          console.error('Failed to create todo: ', error);
        }
      },
    }),
    getTodo: builder.query({
      query: ({_id}) => ({
        url: `/todos/${_id}`,
        method: 'GET',
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(addTodos(data.data));
        } catch (error) {
          console.error('Failed to get todo: ', error);
        }
      },
    }),
    getTodos: builder.query({
      query: () => ({
        url: `/todos`,
        method: 'GET',
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(addTodos(data.data));
        } catch (error) {
          console.error('Failed to get todos: ', error);
        }
      },
    }),
    updateTodo: builder.mutation({
      query: todo => ({
        url: `/todos/${todo._id}`,
        method: 'PATCH',
        body: todo,
      }),
      async onQueryStarted(todo, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
          dispatch(updateTodo(todo));
        } catch (error) {
          console.error('Failed to update todo: ', error);
        }
      },
    }),
    deleteTodo: builder.mutation({
      query: ({_id}) => ({
        url: `/todos/${_id}`,
        method: 'DELETE',
      }),
      async onQueryStarted({_id}, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
          dispatch(removeTodo(_id));
        } catch (error) {
          console.error('Failed to delete todo: ', error);
        }
      },
    }),
    updateCoverImage: builder.mutation({
      query: ({image, _id}) => ({
        url: `/todos/cover-image/${_id}`,
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: image,
      }),
    }),
  }),
});

export const {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodoQuery,
  useGetTodosQuery,
  useUpdateCoverImageMutation,
  useUpdateTodoMutation,
} = todoApiSlice;
