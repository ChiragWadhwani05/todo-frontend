import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://todo-backend-production-1fc6.up.railway.app/api/v1',
  credentials: 'include',
  prepareHeaders: headers => {
    const token = localStorage.getItem('authorizationToken');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: builder => ({
    health: builder.query({
      query: () => '/health',
    }),
  }),
});
