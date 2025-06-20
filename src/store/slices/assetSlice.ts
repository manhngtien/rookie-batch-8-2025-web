import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Asset } from "@/features/asset-management/types/Asset";
import {
  createAsset,
  deleteAssetById,
  fetchAssetById,
  fetchAssets,
  fetchAssetsByParams,
  updateAssetById,
} from "@/store/thunks/assetThunk";

export const emptyAsset: Asset = {
  assetCode: "",
  assetName: "",
  specification: "",
  location: 0,
  installedDate: new Date().toLocaleDateString("sv-SE"),
  state: "available",
  category: {
    id: 0,
    categoryName: "",
    prefix: "",
    total: 0,
  },
  assignments: [],
};

interface AssetState {
  assets: Asset[];
  shouldRefetch: boolean;
  page: number;
  total: number;
  loading: boolean;
  error: string | null;
  selectedAsset: Asset;
  selectedLoading?: boolean;
  updatingLoading?: boolean;
  editingLoading?: boolean;
  deletingLoading?: boolean;
}

const initialState: AssetState = {
  assets: [],
  shouldRefetch: true,
  page: 1,
  total: 0,
  loading: false,
  error: null,
  selectedAsset: emptyAsset,
  selectedLoading: false,
  updatingLoading: false,
  editingLoading: false,
  deletingLoading: false,
};

const assetSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    resetAssets(state) {
      state.assets = [];
      state.error = null;
    },
    setShouldRefetch: (state, action: PayloadAction<boolean>) => {
      state.shouldRefetch = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter(
        (asset) => asset.assetCode !== action.payload,
      );
    },
    clearSelectedAsset(state) {
      state.selectedAsset = emptyAsset;
    },
    resetError: (state) => {
      state.error = null;
    },
    addAsset: (state, action: PayloadAction<Asset>) => {
      // Prevent duplicates by assetCode
      if (
        !state.assets.some(
          (asset) => asset.assetCode === action.payload.assetCode,
        )
      ) {
        state.assets.unshift(action.payload);
        state.total += 1;
      }
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
      })
      .addCase(fetchAssetById.pending, (state) => {
        state.selectedLoading = true;
        state.error = null;
      })
      .addCase(fetchAssetById.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.selectedAsset = action.payload;
      })
      .addCase(fetchAssetById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.error = action.payload ?? "Error fetching asset";
      })
      .addCase(updateAssetById.pending, (state) => {
        state.updatingLoading = true;
        state.error = null;
      })
      .addCase(updateAssetById.fulfilled, (state, action) => {
        state.updatingLoading = false;
        state.assets = state.assets.filter(
          (asset) => asset.assetCode !== action.payload.assetCode,
        );
        state.selectedAsset = emptyAsset;
        state.assets.unshift(action.payload);
        state.shouldRefetch = false;
      })
      .addCase(updateAssetById.rejected, (state, action) => {
        state.updatingLoading = false;
        state.error = action.payload ?? "An error occurred";
      })
      .addCase(deleteAssetById.fulfilled, (state) => {
        state.deletingLoading = false;
        state.error = null;
      })
      .addCase(deleteAssetById.pending, (state) => {
        state.deletingLoading = true;
        state.error = null;
      })
      .addCase(deleteAssetById.rejected, (state, action) => {
        state.deletingLoading = false;
        state.error = action.payload ?? "An error occurred";
      });
  },
});

export const {
  resetAssets,
  setShouldRefetch,
  removeAsset,
  resetError,
  clearSelectedAsset,
  setPage,
  addAsset,
} = assetSlice.actions;

export default assetSlice.reducer;
