import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { userLogin} from './types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api', 
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        return headers;
    },  
  }),
  endpoints: (builder) => ({
    login: builder.mutation<userLogin, { email: string; password: string }>({
      query: ({email, password}) => ({
        url: 'auth/login',
        method: 'POST',
        body: {
          email,
          password
        },
      }) 
    }),
    register: builder.mutation<void, {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      phoneNumber: string;
      role: string;
    }>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    refreshToken: builder.mutation<{ accessToken: string }, { refreshToken: string }>({
        query: (body) => ({
            url: 'auth/getRefreshToken',
            method: 'POST',
            body,
        })
    }),
    verify: builder.mutation<
        { accessToken: string; refreshToken: string; email: string; role: string; verified: boolean },
        { email: string; otp: string }
      >({
        query: ({ email, otp }) => ({
          url: 'auth/verify',
          method: 'POST',
          body: { email, otp },
        }),
    }),
    changePassword: builder.mutation<string, { email: string; password: string; confirmPassword: string }>({
      query: ({ email, password, confirmPassword }) => ({
          url: 'auth/reset-password',
          method: 'POST',
          body: {
              email,
              password,
              confirmPassword,
          },
      }),
    }),
  }),
})

export const { useLoginMutation, useRefreshTokenMutation,
  useRegisterMutation, useVerifyMutation, useChangePasswordMutation } = authApi