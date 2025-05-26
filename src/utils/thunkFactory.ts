import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

export function createAppThunk<TArg, TReturn>(
  typePrefix: string,
  handler: (arg: TArg, thunkAPI?: unknown) => Promise<TReturn>,
) {
  return createAsyncThunk<TReturn, TArg>(typePrefix, async (arg, thunkAPI) => {
    try {
      return await handler(arg, thunkAPI);
    } catch (error) {
      console.error("Fetch error:", error);
      if (isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || error.message,
        );
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  });
}
