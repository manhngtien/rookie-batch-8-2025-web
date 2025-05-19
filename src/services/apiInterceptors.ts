import type { AxiosInstance } from "axios";

export const authInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      //   const originalRequest = error.config;
      //   const isLoginAttempt = originalRequest?.url?.includes(
      //     API_ROUTES.auth.login,
      //   );
      //   const status = error?.response?.status;
      //   if (status === 401 && !isLoginAttempt) {
      //     console.warn(
      //       `[api] 401 Unauthorized, redirecting to ${APP_ROUTES.login.url}...`,
      //     );
      //     window.location.href = APP_ROUTES.login.url;
      //   } else if (status === 401 && isLoginAttempt)
      //     console.error("Invalid creds");
      //   else console.error("[api] Error: ", error.response);
      //   return Promise.reject(error);
    },
  );
};
