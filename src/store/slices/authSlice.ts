import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { User } from "@/features/users/types/User";
import {
  changePassword,
  checkAuth,
  loginUser,
  refreshToken,
} from "@/store/thunks/authThunk";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  isCheckingAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  isCheckingAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.isCheckingAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      // check auth
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isCheckingAuth = false;
      })
      // refreshToken
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export { changePassword };
export default authSlice.reducer;
