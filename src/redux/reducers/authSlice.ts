import { createSlice } from '@reduxjs/toolkit';
import { ILogin } from 'typings/Auth';

const initialState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin: (state, payload: any) => {},

    authLoginFailure: (state, payload: any) => {},

    authLoginSuccess: (state, payload: any) => {},

    authLogout: (state, payload: any) => ({}),

    authLogoutSuccess: () => {},

    authRefreshUser: () => {},

    authRefreshUserSuccess: (payload: any) => {},
  },
});

export const {
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authLogout,
  authLogoutSuccess,
  authRefreshUser,
  authRefreshUserSuccess,
} = authSlice.actions;

export default authSlice.reducer;
