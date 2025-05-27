import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import categoryService from "@/features/asset-management/services/categoryService";
import type { Category } from "@/features/asset-management/types/Category";

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await categoryService.getCategories();
    console.info("Categories fetched successfully:", response);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.message || "Failed to fetch categories");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});
