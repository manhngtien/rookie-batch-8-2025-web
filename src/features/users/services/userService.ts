import type { User } from "@/features/users/types/User";
import apiClient from "@/services/apiClient";

const userService = {
  getUsers: async (): Promise<{ data: User[] }> => {
    const response = await apiClient.get("/User");

    return response;
  },
};

export default userService;
