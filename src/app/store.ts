import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './services/auth'
import authReducer from './slices/authSlice';
import { setTokens } from './slices/authSlice';
import { sheduleApi } from './services/shedule';
import { userApi } from './services/user';

const initializeAuth = (store) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const email = localStorage.getItem('email');
  if (accessToken && refreshToken) {
      store.dispatch(setTokens({ accessToken, refreshToken, email }));
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [sheduleApi.reducerPath]: sheduleApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, sheduleApi.middleware, userApi.middleware),
})

initializeAuth(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch