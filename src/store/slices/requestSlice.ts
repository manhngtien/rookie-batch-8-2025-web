import { createSlice } from "@reduxjs/toolkit";

import type Request from "@/features/requests/types/Request";

import { fetchRequests } from "../thunks/requestThunk";

interface RequestState {
  requests: Request[];
  loading: boolean;
  total: number;
  error: string | null;
}
const initialState: RequestState = {
  requests: [],
  loading: false,
  total: 0,
  error: null,
};

const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    resetRequests(state) {
      state.requests = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.total;
        state.requests = action.payload.data;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export const { resetRequests } = requestSlice.actions;
export default requestSlice.reducer;
