// src/services/apiInterceptors.ts
import type { AxiosInstance } from "axios";

import { API_ROUTES } from "@/lib/apiRoutes";
import { APP_ROUTES } from "@/lib/appRoutes";
import type { AppDispatch } from "@/store";
import { logoutUser, refreshToken } from "@/store/thunks/authThunk";

export const setupAuthInterceptor = (
  axiosInstance: AxiosInstance,
  dispatch: AppDispatch,
) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const isLoginAttempt = originalRequest?.url?.includes(
        API_ROUTES.auth.login,
      );
      const isRefreshAttempt = originalRequest?.url?.includes(
        API_ROUTES.auth.refreshToken,
      );
      const status = error?.response?.status;

      if (status === 401) {
        if (isLoginAttempt || isRefreshAttempt) {
          console.error("Invalid credentials or refresh token failed");
          dispatch(logoutUser());
          window.location.href = APP_ROUTES.auth.login;
        } else {
          try {
            await dispatch(refreshToken()).unwrap();
            return axiosInstance(originalRequest);
          } catch (err) {
            console.error("Token refresh failed", err);
            dispatch(logoutUser());
            window.location.href = APP_ROUTES.auth.login;
          }
        }
      } else {
        console.error("[api] Error: ", error.response);
      }

      return Promise.reject(error);
    },
  );
};
