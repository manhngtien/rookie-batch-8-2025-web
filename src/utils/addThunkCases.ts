/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ActionReducerMapBuilder,
  AsyncThunk,
  Draft,
} from "@reduxjs/toolkit";

type SliceState<T> = {
  data: T;
  loading: boolean;
  error: string | null;
  total: number;
};

export function addThunkCases<
  TPayload,
  TArg,
  TThunkPayload extends { data: TPayload; total: number },
>(
  builder: ActionReducerMapBuilder<SliceState<TPayload>>,
  thunk: AsyncThunk<TThunkPayload, TArg, any>,
) {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data as Draft<TPayload>;
      state.total = action.payload.total ?? 0;
    })
    .addCase(thunk.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) ?? "An unknown error occurred";
    });
}
