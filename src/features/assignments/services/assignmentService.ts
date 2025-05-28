import type { AxiosResponseHeaders } from "axios";

import { API_ROUTES } from "@/lib/apiRoutes";
import apiClient from "@/services/apiClient";
import type { FetchResponse } from "@/types";
import { getPaginationHeader } from "@/utils/helpers";

import type { Assignment, FetchAssignmentsParams } from "../types/Assignment";

export const assignmentService = {
  getAssignments: async ({
    pageNumber,
    pageSize,
    assignedDate,
    searchTerm,
    orderBy,
    state,
  }: FetchAssignmentsParams): Promise<FetchResponse<Assignment[]>> => {
    const queryParams = new URLSearchParams({
      PageNumber: pageNumber.toString(),
      PageSize: pageSize.toString(),
      AssignedDate: assignedDate ? assignedDate.toDateString() : "",
      SearchTerm: searchTerm || "",
      OrderBy: orderBy || "assetnameasc",
      State: state ? state.join(",") : "",
    });

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
