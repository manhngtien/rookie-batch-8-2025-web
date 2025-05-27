import { createSlice } from "@reduxjs/toolkit";

import type { Category } from "@/features/asset-management/types/Category";
import { fetchCategories } from "@/store/thunks/categoryThunk";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetCategories(state) {
      state.categories = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch categories";
      });
  },
});

export const { resetCategories } = categorySlice.actions;
export default categorySlice.reducer;
