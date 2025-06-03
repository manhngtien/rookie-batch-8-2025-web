import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import categoryService from "@/features/asset-management/services/categoryService";
import type {
  Category,
  CreateCategoryRequest,
} from "@/features/asset-management/types/Category";

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

export const createCategories = createAsyncThunk<
  { data: Category },
  CreateCategoryRequest,
  { rejectValue: string }
>("categories/createCategories", async (category, { rejectWithValue }) => {
  try {
    const response = await categoryService.createCategories(category);
    return { data: response.data };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.message || "Failed to fetch categories");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});
