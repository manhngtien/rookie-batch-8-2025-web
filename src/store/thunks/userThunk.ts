import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { isAxiosError } from "axios";

import userService from "@/features/users/services/userService";
import type {
  CreateUserRequest,
  FetchUsersParams,
  FetchUsersResponse,
  UpdateUserRequest,
  User,
} from "@/features/users/types/User";

export const fetchUsers = createAsyncThunk<
  FetchUsersResponse,
  FetchUsersParams,
  { rejectValue: string }
>(
  "users/fetchUsers",
  async (
    { page, pageSize, type, searchTerm, orderBy },
    { rejectWithValue },
  ) => {
    try {
      const response = await userService.getUsers({
        page,
        pageSize,
        type,
        searchTerm,
        orderBy,
      });
      return response;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message || "Failed to fetch users");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const createUser = createAsyncThunk<
  { data: User },
  CreateUserRequest,
  { rejectValue: string }
>("users/createUser", async (user, { rejectWithValue }) => {
  try {
    const response = await userService.createUser(user);
    return response;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.message || "Failed to create user");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export const updateUser = createAsyncThunk<
  { data: User },
  { staffCode: string; user: UpdateUserRequest },
  { rejectValue: string }
>("users/updateUser", async ({ user, staffCode }, { rejectWithValue }) => {
  try {
    const response = await userService.updateUser(staffCode, user);
    return response;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.message || "Failed to update user");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export const disableUser = createAsyncThunk<
  void,
  { userId: string }, // Adjust the payload type based on your API
  { rejectValue: { code?: number; message?: string } }
>("auth/disableUser", async ({ userId }, { rejectWithValue }) => {
  try {
    await userService.disableUser(userId);
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
