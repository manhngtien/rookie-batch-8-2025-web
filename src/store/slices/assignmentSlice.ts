import { createSlice } from "@reduxjs/toolkit";

import type { Assignment } from "@/features/assignments/types/Assignment";
import { addThunkCases } from "@/utils/addThunkCases";

import { createAssignment, fetchAssignments } from "../thunks/assignmentThunk";

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
  },
});

export const { resetAssignments } = assignmentSlice.actions;
export default assignmentSlice.reducer;
