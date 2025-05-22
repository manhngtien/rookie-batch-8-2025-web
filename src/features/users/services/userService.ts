import type { User } from "@/features/users/types/User";
import { API_ROUTES } from "@/lib/apiRoutes";
import apiClient from "@/services/apiClient";

const userService = {
  getUsers: async (): Promise<{ data: User[] }> => {
    const response = await apiClient.get(API_ROUTES.users.getUsers);
    return response;
  },
};

export default userService;
