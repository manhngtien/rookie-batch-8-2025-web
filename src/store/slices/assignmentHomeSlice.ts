import { createSlice } from "@reduxjs/toolkit";

import type { Assignment } from "@/features/assignments/types/Assignment";

import {
  fetchAssigmentsHome,
  replyAssignment,
  userReturnRequest,
} from "../thunks/assignmentHomeThunk";

interface AssignmentState {
  assignments: Assignment[];
  loading: boolean;
  total: number;
  error: string | null;
}
const initialState: AssignmentState = {
  assignments: [],
  loading: false,
  total: 0,
  error: null,
};

const assignmentHomeSlice = createSlice({
  name: "assignmentsHome",
  initialState,
  reducers: {
    resetAssignments(state) {
      state.assignments = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssigmentsHome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssigmentsHome.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.total;
        state.assignments = action.payload.data;
      })
      .addCase(fetchAssigmentsHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      })
      .addCase(replyAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(replyAssignment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(replyAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to reply to assignment";
      })
      // Add return request thunk handling
      .addCase(userReturnRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userReturnRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userReturnRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to send return request";
      });
  },
});

export const { resetAssignments } = assignmentHomeSlice.actions;
export default assignmentHomeSlice.reducer;
