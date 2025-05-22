// src/store/thunks/userThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import authService from "@/features/users/services/authService";
import type { User } from "@/features/users/types/User";

export const loginUser = createAsyncThunk<
  User,
  { username: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await authService.loginUser(credentials);
    console.info("User login successfully:", response);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.message || "Failed to fetch users");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});
