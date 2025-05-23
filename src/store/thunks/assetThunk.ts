import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import assetService from "@/features/asset-management/services/assetService";
import type { Asset } from "@/features/asset-management/types/Asset";

export const fetchAssets = createAsyncThunk<
  Asset[],
  void,
  { rejectValue: string }
>("assets/fetchAssets", async (_, { rejectWithValue }) => {
  try {
    const response = await assetService.getAssets();
    console.info("Assets fetched successfully:", response);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.message || "Failed to fetch assets");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});
