import {apiSlice} from '../../app/api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: 'users/login/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {...credentials},
      }),
    }),
  }),
});

export const {useLoginMutation} = userApiSlice;
