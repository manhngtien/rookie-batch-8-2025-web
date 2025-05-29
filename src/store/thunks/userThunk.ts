import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import userService from "@/features/users/services/userService";
import type {
  CreateUserRequest,
  FetchUsersParams,
  FetchUsersResponse,
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
