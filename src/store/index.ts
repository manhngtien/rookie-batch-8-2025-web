import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/store/slices/authSlice";
import userReducer from "@/store/slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
