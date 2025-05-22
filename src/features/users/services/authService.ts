import type { User } from "@/features/users/types/User";
import apiClient from "@/services/apiClient";

interface Credentials {
  username: string;
  password: string;
}

const authService = {
  loginUser: async (credentials: Credentials): Promise<{ data: User }> => {
    const response = await apiClient.post("/Auth/login", credentials);
    return response;
  },
};

export default authService;
