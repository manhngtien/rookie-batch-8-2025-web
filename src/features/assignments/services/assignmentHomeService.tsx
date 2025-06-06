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
    pageNumber,
    pageSize,
    orderBy,
  }: FetchAssignmentsParams): Promise<FetchAssignmentsResponse> => {
    const queryParams = new URLSearchParams({
      PageNumber: pageNumber.toString(),
      PageSize: pageSize.toString(),
    });

    if (orderBy) {
      queryParams.append("OrderBy", orderBy);
    }

    const response = await apiClient.get<Assignment[]>(
      `${API_ROUTES.assignments.myAssignment}?${queryParams.toString()}`,
    );
    const transformedData = response.data;
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

  replyAssignment: async (
    assignmentId: number,
    isAccepted: boolean,
  ): Promise<void> => {
    const url = `${API_ROUTES.assignments.replyAssignment(assignmentId)}`;

    const requestBody = {
      assignmentId: assignmentId,
      isAccepted: isAccepted,
    };

    await apiClient.put(url, requestBody);
  },

  userReturnRequest: async (assignmentId: number): Promise<void> => {
    const url = `${API_ROUTES.requests.userReturnRequests}`;
    const requestBody = {
      assignmentId: assignmentId,
    };
    await apiClient.post(url, requestBody);
  },
};

export default assignmentService;
