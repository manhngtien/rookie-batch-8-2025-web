import { createSlice } from "@reduxjs/toolkit";

import type Request from "@/features/requests/types/Request";

import { cancleRequest, fetchRequests } from "../thunks/requestThunk";

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
        state.error = action.payload ?? "An error occurred";
      })
      .addCase(cancleRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancleRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(cancleRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to cancel request";
      });
  },
});

export const { resetRequests } = requestSlice.actions;
export default requestSlice.reducer;
