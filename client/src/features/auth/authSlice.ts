import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

const initialState = {
  user: null,
  token: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      state.isAuth = true;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectAuthStatus = (state: RootState) => state.auth.isAuth;
export const selectCurrentUserData = (state: RootState) => state.auth;
