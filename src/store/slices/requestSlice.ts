import { createSlice } from "@reduxjs/toolkit";

import type Request from "@/features/requests/types/Request";

import { fetchRequests } from "../thunks/requestThunk";

interface RequestState {
  requests: Request[];
  loading: boolean;
  error: string | null;
}
const initialState: RequestState = {
  requests: [],
  loading: false,
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
        state.requests = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      });
  },
});

export const { resetRequests } = requestSlice.actions;
export default requestSlice.reducer;
