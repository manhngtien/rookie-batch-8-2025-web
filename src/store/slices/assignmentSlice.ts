import { createSlice } from "@reduxjs/toolkit";

import type { Assignment } from "@/features/assignments/types/Assignment";
import { addThunkCases } from "@/utils/addThunkCases";

import {
  createAssignment,
  deleteSingleAssignment,
  editAssignment,
  fetchAssignments,
  returnSingleAssignment,
} from "../thunks/assignmentThunk";

interface AssignmentState {
  data: Assignment[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: AssignmentState = {
  data: [],
  total: 0,
  loading: false,
  error: null,
};

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    resetAssignments(state) {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    addThunkCases(builder, fetchAssignments);

    // Create assignment, added as a separate case from the one above
    // TODO: Separate this?
    builder
      .addCase(createAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload.data, ...state.data];
      })
      .addCase(createAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "An unknown error occurred";
      });

    // Edit assignment
    builder
      .addCase(editAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload.data, ...state.data];
      })
      .addCase(editAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "An unknown error occurred";
      });

    // Delete assignment
    builder
      .addCase(deleteSingleAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSingleAssignment.fulfilled, (state) => {
        state.loading = false;
        state.total--;
      })
      .addCase(deleteSingleAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "An unknown error occurred";
      });

    // Return assignment
    builder
      .addCase(returnSingleAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(returnSingleAssignment.fulfilled, (state) => {
        state.loading = false;
        state.total--;
      })
      .addCase(returnSingleAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "An unknown error occurred";
      });
  },
});

export const { resetAssignments } = assignmentSlice.actions;
export default assignmentSlice.reducer;
