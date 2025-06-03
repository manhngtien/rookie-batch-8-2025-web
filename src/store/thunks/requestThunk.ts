import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import requestService from "@/features/requests/services/requestService";
import {
  type FetchRequestsParams,
  type FetchRequestsResponse,
} from "@/features/requests/types/Request";

export const fetchRequests = createAsyncThunk<
  FetchRequestsResponse,
  FetchRequestsParams,
  { rejectValue: string }
>(
  "requests/fetchRequests",
  async (
    { page, pageSize, state, searchTerm, orderBy },
    { rejectWithValue },
  ) => {
    try {
      const response = await requestService.getRequests({
        page,
        pageSize,
        state,
        searchTerm,
        orderBy,
      });
      return response;
    } catch (error: unknown) {
      console.error("Caught error:", error);
      if (isAxiosError(error)) {
        return rejectWithValue(error.message || "Failed to fetch assets");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);
