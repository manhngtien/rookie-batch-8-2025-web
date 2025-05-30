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
    addThunkCases(builder, createAssignment);
  },
});

export const { resetAssignments } = assignmentSlice.actions;
export default assignmentSlice.reducer;
