import type {
  CreateUserRequest,
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

  createUser: async (user: CreateUserRequest): Promise<{ data: User }> => {
    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("dateOfBirth", user.dateOfBirth);
    formData.append("gender", user.gender.toString());
    formData.append("joinedDate", user.joinedDate);
    formData.append("type", user.type);
    if (user.location) {
      formData.append("location", user.location);
    }

    const response = await apiClient.post<User>(
      API_ROUTES.users.createUser,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response;
  },
};

export default userService;
