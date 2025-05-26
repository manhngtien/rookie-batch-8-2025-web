import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

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
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig;
      const isLoginAttempt = originalRequest?.url?.includes(
        API_ROUTES.auth.login,
      );
      const isRefreshAttempt = originalRequest?.url?.includes(
        API_ROUTES.auth.refreshToken,
      );
      const status = error.response?.status;
      const errorData = error.response?.data as {
        code?: number;
        message?: string;
      };

      if (status === 401) {
        if (isLoginAttempt || isRefreshAttempt) {
          console.error(
            "Invalid credentials or refresh token failed",
            errorData,
          );
          dispatch(logoutUser());
          window.location.href = APP_ROUTES.auth.login;
          return Promise.reject(error);
        } else {
          try {
            await dispatch(refreshToken()).unwrap();
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed", refreshError);
            dispatch(logoutUser());
            window.location.href = APP_ROUTES.auth.login;
            return Promise.reject(error);
          }
        }
      }

      console.error("[api] Error: ", error.response?.data ?? error.message);
      return Promise.reject(error);
    },
  );
};
