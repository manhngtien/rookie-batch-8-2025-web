import { createSlice } from "@reduxjs/toolkit";

import type { User } from "@/features/users/types/User";
import {
  createUser,
  disableUser,
  fetchUsers,
  updateUser,
} from "@/store/thunks/userThunk";

interface UserState {
  users: User[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  total: 0,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsers(state) {
      state.users = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      })
      //Create user
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [action.payload.data, ...state.users];
        console.info("User created successfully", state.users);
        state.total += 1;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload.data;
        state.users = [
          updatedUser,
          ...state.users.filter(
            (user) => user.staffCode !== updatedUser.staffCode,
          ),
        ];
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      })
      //Disable user
      .addCase(disableUser.pending, (state) => {
        state.error = null;
      })
      .addCase(disableUser.fulfilled, (state) => {
        state.loading = false;
        state.total -= 1;
      })
      .addCase(disableUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetUsers } = userSlice.actions;
export default userSlice.reducer;
