import type {
  FetchUsersParams,
  FetchUsersResponse,
  PaginationHeader,
  User,
} from "@/features/users/types/User";
import { API_ROUTES } from "@/lib/apiRoutes";
import apiClient from "@/services/apiClient";

const userService = {
  getUsers: async ({
    page,
    pageSize,
    type,
    searchTerm,
    orderBy,
  }: FetchUsersParams): Promise<FetchUsersResponse> => {
    const queryParams = new URLSearchParams({
      PageNumber: page.toString(),
      PageSize: pageSize.toString(),
    });

    if (type && type.length > 0 && !type.includes("All")) {
      queryParams.append("Type", type.join(","));
    }

    if (searchTerm) {
      queryParams.append("SearchTerm", searchTerm);
    }

    if (orderBy) {
      queryParams.append("OrderBy", orderBy);
    }

    const response = await apiClient.get<User[]>(
      `${API_ROUTES.users.getUsers}?${queryParams.toString()}`,
    );
    const paginationHeader = response.headers["pagination"];
    if (!paginationHeader) {
      throw new Error("Pagination header missing");
    }
    const pagination: PaginationHeader = JSON.parse(paginationHeader);
    return {
      data: response.data,
      total: pagination.totalCount,
    };
  },

  createUser: async (user: User): Promise<{ data: User }> => {
    const response = await apiClient.post<User>(
      API_ROUTES.users.createUser,
      user,
    );
    return response;
  },
};

export default userService;
