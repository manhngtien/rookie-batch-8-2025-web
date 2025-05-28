import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import assetService from "@/features/asset-management/services/assetService";
import type { Asset } from "@/features/asset-management/types/Asset";
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
