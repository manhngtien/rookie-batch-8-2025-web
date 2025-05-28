import { configureStore } from "@reduxjs/toolkit";

import assetReducer from "@/store/slices/assetSlice";
import assignmentReducer from "@/store/slices/assignmentSlice";
import authReducer from "@/store/slices/authSlice";
import requestReducer from "@/store/slices/requestSlice";
import userReducer from "@/store/slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    assets: assetReducer,
    requests: requestReducer,
    assignments: assignmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
