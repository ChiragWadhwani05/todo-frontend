import {logout, setCredentials} from '../../features/auth/authSlice';
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
      onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
        try {
          const {data} = await queryFulfilled;

          dispatch(
            setCredentials({
              ...data.data,
              authorizationToken: localStorage.getItem('authorizationToken'),
              isLoggedIn: true,
            }),
          );
        } catch (error) {
          dispatch(logout());
          console.error('Failed to fetch user data: ', error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterOptMutation,
  useRegisterMutation,
  useSelfQuery,
} = authApiSlice;
