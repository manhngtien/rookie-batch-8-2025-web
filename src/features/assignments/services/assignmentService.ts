import type { AxiosResponseHeaders } from "axios";

import { API_ROUTES } from "@/lib/apiRoutes";
import { toLocalISOString } from "@/lib/utils";
import apiClient from "@/services/apiClient";
import type { FetchResponse } from "@/types";
import { getPaginationHeader } from "@/utils/helpers";

import type {
  Assignment,
  AssignmentEditRequest,
  AssignmentFormRequest,
  FetchAssignmentsParams,
} from "../types/Assignment";

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

  getSingleAssignment: async ({
    id,
  }: {
    id: number;
  }): Promise<{ data: Assignment }> => {
    const response = await apiClient.get<Assignment>(
      `${API_ROUTES.assignments.getAssignments}/${id}`,
    );

    return response;
  },

  createAssignment: async (
    assignment: AssignmentFormRequest,
  ): Promise<{ data: Assignment }> => {
    const formData = new FormData();

    formData.append("staffCode", assignment.staffCode);
    formData.append("assetCode", assignment.assetCode);
    formData.append(
      "assignedDate",
      assignment.assignedDate ? toLocalISOString(assignment.assignedDate) : "",
    );
    formData.append("note", assignment.note || "");

    const response = await apiClient.post<Assignment>(
      API_ROUTES.assignments.createAssignment,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response;
  },

  editAssignment: async (
    assignment: AssignmentEditRequest,
  ): Promise<{ data: Assignment }> => {
    const formData = new FormData();

    formData.append("id", assignment.id.toString());
    formData.append("staffCode", assignment.staffCode);
    formData.append("assetCode", assignment.assetCode);
    formData.append(
      "assignedDate",
      assignment.assignedDate ? toLocalISOString(assignment.assignedDate) : "",
    );
    formData.append("note", assignment.note || "");

    const response = await apiClient.put<Assignment>(
      `${API_ROUTES.assignments.createAssignment}/${assignment.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response;
  },

  deleteSingleAssignment: async ({
    id,
  }: {
    id: number;
  }): Promise<{ status: number }> => {
    const response = await apiClient.delete(
      `${API_ROUTES.assignments.getAssignments}/${id}`,
    );

    return response;
  },
};
