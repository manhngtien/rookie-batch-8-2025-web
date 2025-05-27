// src/store/thunks/userThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { isAxiosError } from "axios";

import authService from "@/features/users/services/authService";
import type {
  ChangePasswordPayload,
  Credentials,
} from "@/features/users/types/Auth";
import type { User } from "@/features/users/types/User";

export const loginUser = createAsyncThunk<
  User,
  Credentials,
  { rejectValue: { code?: number; message?: string } }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await authService.loginUser(credentials);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<{
        code?: number;
        message?: string;
      }>;
      return rejectWithValue(
        axiosError.response?.data ?? { message: axiosError.message },
      );
    }
    return rejectWithValue({ message: "An unexpected error occurred" });
  }
});

export const changePassword = createAsyncThunk<
  { code: number; message: string },
  ChangePasswordPayload,
  { rejectValue: string }
>("auth/changePassword", async (payload, { rejectWithValue }) => {
  try {
    await authService.changePassword(payload);
    return { code: 204, message: "Password changed successfully!" };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.message ?? "Failed to change password");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export const checkAuth = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.checkAuth();
      console.info(
        "User check auth successfully:",
        JSON.stringify(response.data),
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ?? "Invalid session",
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const refreshToken = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/refreshToken", async (_, { rejectWithValue }) => {
  try {
    const response = await authService.refreshToken();
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to refresh token",
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      console.info("User logged out successfully");
      return;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ?? "Failed to logout",
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);
