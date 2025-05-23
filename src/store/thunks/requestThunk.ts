import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import requestService from "@/features/requests/services/requestService";
import type Request from "@/features/requests/types/Request";

export const fetchRequests = createAsyncThunk<
  Request[],
  void,
  { rejectValue: string }
>("requests/fetchRequests", async (_, { rejectWithValue }) => {
  try {
    const response = await requestService.getRequests();
    console.info("Requests fetched successfully:", response);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.message || "Failed to fetch assets");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});
