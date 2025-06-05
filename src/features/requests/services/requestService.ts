import { API_ROUTES } from "@/lib/apiRoutes";
import apiClient from "@/services/apiClient";

import type Request from "../types/Request";
import type {
  FetchRequestsParams,
  FetchRequestsResponse,
  PaginationHeader,
} from "../types/Request";

const requestService = {
  getRequests: async ({
    page,
    pageSize,
    state,
    searchTerm,
    orderBy,
  }: FetchRequestsParams): Promise<FetchRequestsResponse> => {
    const queryParams = new URLSearchParams({
      PageNumber: page.toString(),
      PageSize: pageSize.toString(),
    });

    if (state && state.length > 0) {
      queryParams.append("State", state.join(","));
    }

    if (searchTerm) {
      queryParams.append("SearchTerm", searchTerm);
    }

    if (orderBy) {
      queryParams.append("OrderBy", orderBy);
    }

    const response = await apiClient.get<Request[]>(
      `${API_ROUTES.requests.getRequests}?${queryParams.toString()}`,
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

  cancleRequest: async (returningRequestId: number): Promise<string> => {
    await apiClient.put(API_ROUTES.requests.cancleRequest(returningRequestId));
    return "Cancel request successful"; // ✅ manually return something
  },
};

export default requestService;
