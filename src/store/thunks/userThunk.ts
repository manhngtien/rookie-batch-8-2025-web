// src/store/thunks/userThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import userService from "@/features/users/services/userService";
import type { User } from "@/features/users/types/User";

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getUsers();
    console.info("Users fetched successfully:", response);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.message || "Failed to fetch users");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});
