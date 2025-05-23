// src/store/thunks/userThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
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
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await authService.loginUser(credentials);
    console.info("User login successfully:", response);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        return rejectWithValue("Unauthorized"); // <-- catch 401
      }

      return rejectWithValue(error.response?.data?.message || "Request failed");
    }

    return rejectWithValue("An unexpected error occurred");
  }
});

export const changePassword = createAsyncThunk<
  { message: string },
  ChangePasswordPayload,
  { rejectValue: string }
>("auth/changePassword", async (payload, { rejectWithValue }) => {
  try {
    await authService.changePassword(payload);
    return { message: "Password changed successfully!" };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.message || "Failed to change password");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});
