import { createSlice } from "@reduxjs/toolkit";

import type { Asset } from "@/features/asset-management/types/Asset";
import {
  createAsset,
  fetchAssets,
  fetchAssetsByParams,
} from "@/store/thunks/assetThunk";

interface AssetState {
  assets: Asset[];
  shouldRefetch: boolean;
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: AssetState = {
  assets: [],
  shouldRefetch: true,
  total: 0,
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
      })
      .addCase(fetchAssetsByParams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssetsByParams.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload.assets;
        state.total = action.payload.total;
      })
      .addCase(fetchAssetsByParams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      })
      // Create asset
      .addCase(createAsset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAsset.fulfilled, (state, action) => {
        state.loading = false;
        state.assets.unshift(action.payload);
        state.shouldRefetch = false;
        state.total += 1;
      })
      .addCase(createAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      });
  },
});

export const { resetAssets } = assetSlice.actions;

export default assetSlice.reducer;
