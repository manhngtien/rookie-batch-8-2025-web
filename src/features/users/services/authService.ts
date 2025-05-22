import type {
  ChangePasswordPayload,
  Credentials,
} from "@/features/users/types/Auth";
import type { User } from "@/features/users/types/User";
import { API_ROUTES } from "@/lib/apiRoutes";
import apiClient from "@/services/apiClient";

const authService = {
  loginUser: async (credentials: Credentials): Promise<{ data: User }> => {
    const response = await apiClient.post(API_ROUTES.auth.login, credentials);
    return response;
  },

  changePassword: async (payload: ChangePasswordPayload): Promise<void> => {
    await apiClient.post(API_ROUTES.auth.changePassword, payload);
  },

  checkAuth: async (): Promise<{ data: User }> => {
    const response = await apiClient.get(API_ROUTES.auth.check);
    return response;
  },

  refreshToken: async (): Promise<{ data: User }> => {
    const response = await apiClient.get(API_ROUTES.auth.refreshToken);
    return response;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(API_ROUTES.auth.logout);
  },
};

export default authService;
