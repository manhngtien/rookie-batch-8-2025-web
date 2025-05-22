// src/services/apiInterceptors.ts
import type { AxiosInstance } from "axios";

import { API_ROUTES } from "@/lib/apiRoutes";
import { APP_ROUTES } from "@/lib/appRoutes";
import type { AppDispatch } from "@/store";
import { logoutUser } from "@/store/slices/authSlice";

export const setupAuthInterceptor = (
  axiosInstance: AxiosInstance,
  dispatch: AppDispatch,
) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;
      const isLoginAttempt = originalRequest?.url?.includes(
        API_ROUTES.auth.login,
      );
      const status = error?.response?.status;

      if (status === 401) {
        if (!isLoginAttempt) {
          dispatch(logoutUser());
          window.location.href = APP_ROUTES.auth.login;
        } else {
          console.error("Invalid credentials");
        }
      } else {
        console.error("[api] Error: ", error.response);
      }

      return Promise.reject(error);
    },
  );
};
