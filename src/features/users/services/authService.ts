import type {
  ChangePasswordPayload,
  Credentials,
} from "@/features/users/types/Auth";
import type { User } from "@/features/users/types/User";
import apiClient from "@/services/apiClient";

const authService = {
  loginUser: async (credentials: Credentials): Promise<{ data: User }> => {
    const response = await apiClient.post("/Auth/login", credentials);
    return response;
  },

  changePassword: async (payload: ChangePasswordPayload): Promise<void> => {
    await apiClient.post("/Auth/change-password", payload);
  },
};

export default authService;
