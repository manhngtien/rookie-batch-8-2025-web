import type { PaginationHeader } from "@/features/users/types/User";
import { API_ROUTES } from "@/lib/apiRoutes";
import apiClient from "@/services/apiClient";

import type {
  Assignment,
  FetchAssignmentsParams,
  FetchAssignmentsResponse,
} from "../types/Assignment";

const assignmentService = {
  getAssignmentsHome: async ({
    page,
    pageSize,
    assignedDate,
    searchTerm,
    orderBy,
  }: FetchAssignmentsParams): Promise<FetchAssignmentsResponse> => {
    const queryParams = new URLSearchParams({
      PageNumber: page.toString(),
      PageSize: pageSize.toString(),
    });

    if (assignedDate) {
      queryParams.append("AssignedDate", assignedDate);
    }

    if (searchTerm) {
      queryParams.append("SearchTerm", searchTerm);
    }

    if (orderBy) {
      queryParams.append("OrderBy", orderBy);
    }

    const response = await apiClient.get<Assignment[]>(
      `${API_ROUTES.assignment.getAssignments}?${queryParams.toString()}`,
    );
    const transformedData = response.data.map((item) => ({
      ...item,
      assignedDate: new Date(item.assignedDate),
    }));
    const paginationHeader = response.headers["pagination"];
    if (!paginationHeader) {
      throw new Error("Pagination header missing");
    }
    const pagination: PaginationHeader = JSON.parse(paginationHeader);
    return {
      data: transformedData,
      total: pagination.totalCount,
    };
  },
};

export default assignmentService;
