import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMarks, ISheduleStudent } from './types';
import { RootState } from '../store';

export const sheduleApi = createApi({
  reducerPath: 'sheduleApi',
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
    getDayShedule: builder.query<ISheduleStudent, {id: number; date: string}>({
        query: ({id, date}) => ({
            url: `students/lessons`,
            params: {
                id,
                date
            }
        }),
    }),
    getMarks: builder.query<IMarks, number>({
        query: (id: number) => ({
            url: `students/marks/${id}`
        })
    })
    })
})

export const { useGetDaySheduleQuery, useGetMarksQuery } = sheduleApi