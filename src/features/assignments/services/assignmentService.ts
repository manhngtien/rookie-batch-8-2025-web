import type { AxiosResponseHeaders } from "axios";

import { API_ROUTES } from "@/lib/apiRoutes";
import apiClient from "@/services/apiClient";
import { getPaginationHeader } from "@/utils/helpers";

import type {
  Assignment,
  FetchAssignmentsParams,
  FetchAssignmentsResponse,
} from "../types/Assignment";

export const assignmentService = {
  getAssignments: async ({
    pageNumber,
    pageSize,
    assignedDate,
  }: FetchAssignmentsParams): Promise<FetchAssignmentsResponse> => {
    const queryParams = new URLSearchParams({
      PageNumber: pageNumber.toString(),
      PageSize: pageSize.toString(),
    });

    if (assignedDate) {
      queryParams.append("AssignedDate", assignedDate.toISOString());
    }

    const response = await apiClient.get<Assignment[]>(
      `${API_ROUTES.assignments.getAssignments}?${queryParams.toString()}`,
    );

    const pagination = getPaginationHeader(
      response.headers as AxiosResponseHeaders,
    );

    return {
      data: response.data,
      total: pagination.totalCount,
    };
  },
};
