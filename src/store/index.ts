import { configureStore } from "@reduxjs/toolkit";

import assetReducer from "@/store/slices/assetSlice";
import authReducer from "@/store/slices/authSlice";
import categoryReducer from "@/store/slices/categorySlice";
import requestReducer from "@/store/slices/requestSlice";
import userReducer from "@/store/slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    assets: assetReducer,
    requests: requestReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
