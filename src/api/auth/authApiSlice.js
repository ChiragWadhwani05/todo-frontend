import {apiSlice} from '../apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    registerOpt: builder.mutation({
      query: credentials => ({
        url: '/otp/mail/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: credentials => ({
        url: '/users/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    self: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterOptMutation,
  useRegisterMutation,
  useSelfQuery,
} = authApiSlice;
