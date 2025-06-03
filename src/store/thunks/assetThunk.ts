import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import assetService from "@/features/asset-management/services/assetService";
import type {
  Asset,
  AssetUpdate,
} from "@/features/asset-management/types/Asset";
import type { AssetParams } from "@/features/asset-management/types/AssetParams";

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

export const fetchAssetsByParams = createAsyncThunk<
  { assets: Asset[]; total: number },
  AssetParams,
  { rejectValue: string }
>("assets/fetchAssetsByParams", async (params, { rejectWithValue }) => {
  try {
    const response = await assetService.getAssetsByParams(params);
    console.info("Assets fetched by params successfully:", response);
    return {
      assets: response.data,
      total: response.total,
    };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(
        error.message || "Failed to fetch assets by params",
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export const createAsset = createAsyncThunk<
  Asset,
  FormData,
  { rejectValue: string }
>("assets/createAsset", async (formData, { rejectWithValue }) => {
  try {
    const response = await assetService.createAsset(formData);
    console.info("Asset created successfully:", response);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.message || "Failed to create asset");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export const fetchAssetById = createAsyncThunk<
  Asset,
  string,
  { rejectValue: string }
>("assets/fetchAssetById", async (assetCode, { rejectWithValue }) => {
  try {
    console.info("Fetching asset by code:", assetCode);
    const response = await assetService.getAssetByCode(assetCode);
    console.info("Asset fetched by code successfully:", response);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.message || "Failed to fetch asset by ID");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export const updateAssetById = createAsyncThunk<
  Asset,
  { assetCode: string; assetUpdate: AssetUpdate },
  { rejectValue: string }
>(
  "assets/updateAssetById",
  async ({ assetCode, assetUpdate }, { rejectWithValue }) => {
    try {
      const response = await assetService.updateAsset(assetCode, assetUpdate);
      console.info("Asset updated successfully:", response);
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message || "Failed to fetch asset by ID");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const deleteAssetById = createAsyncThunk<
  { code: number; message: string },
  string,
  { rejectValue: string }
>("assets/deleteAssetById", async (assetCode, { rejectWithValue }) => {
  try {
    await assetService.deleteAsset(assetCode);
    return { code: 200, message: "Asset deleted successfully!" };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue("Failed to delete asset by ID");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});
