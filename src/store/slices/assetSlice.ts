import { createSlice } from "@reduxjs/toolkit";

import type { Asset } from "@/features/asset-management/types/Asset";
import { fetchAssets } from "@/store/thunks/assetThunk";

interface AssetState {
  assets: Asset[];
  loading: boolean;
  error: string | null;
}

const initialState: AssetState = {
  assets: [],
  loading: false,
  error: null,
};

const assetSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    resetAssets(state) {
      state.assets = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch assets
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      });
  },
});

export const { resetAssets } = assetSlice.actions;
export default assetSlice.reducer;
