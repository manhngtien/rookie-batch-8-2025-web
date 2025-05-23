import { configureStore } from "@reduxjs/toolkit";

import assetReducer from "@/store/slices/assetSlice";
import authReducer from "@/store/slices/authSlice";
import userReducer from "@/store/slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    assets: assetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
