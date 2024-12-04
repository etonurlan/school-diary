import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store';
import { IStudentInfo } from './types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api', 
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;

        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }

        headers.set('Content-Type', 'application/json');
        return headers;
    },  
  }),
  endpoints: (builder) => ({
    myProfile: builder.query<number, {email: string}>({
        query: ({ email }) => ({
            url: 'profile/myProfile',
            method: 'POST',
            body: {email}
        })
    }),
    studentInfo: builder.query<IStudentInfo, number>({
        query: (id: number) => ({
            url: `students/${id}`,
        }),
        providesTags: (result, error, id) => [{ type: 'Student', id }],
    }),
    updateStudentInfo: builder.mutation<void, { id: number; body: IStudentInfo }>({
        query: ({ id, body }) => ({
          url: `students/${id}`,
          method: 'PUT',
          body,
        }),
        invalidatesTags: (result, error, { id }) => [{ type: 'Student', id }],
    }),
  })
})

export const { useMyProfileQuery, useStudentInfoQuery, useUpdateStudentInfoMutation } = userApi