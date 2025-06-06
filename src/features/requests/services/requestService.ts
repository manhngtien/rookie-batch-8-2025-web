import type { AxiosResponseHeaders } from "axios";

import { API_ROUTES } from "@/lib/apiRoutes";
import apiClient from "@/services/apiClient";
import type { FetchResponse } from "@/types";
import { getPaginationHeader } from "@/utils/helpers";

import type Request from "../types/Request";
import type {
  ChangeRequestParams,
  FetchRequestsParams,
} from "../types/Request";

const requestService = {
  getRequests: async ({
    pageNumber,
    pageSize,
    returnedDate,
    state,
    searchTerm,
    orderBy,
  }: FetchRequestsParams): Promise<FetchResponse<Request[]>> => {
    const queryParams = new URLSearchParams({
      PageNumber: pageNumber.toString(),
      PageSize: pageSize.toString(),
      ReturnedDate: returnedDate ? returnedDate.toDateString() : "",
      SearchTerm: searchTerm || "",
      State: state ? state.join(",") : "",
      OrderBy: orderBy || "assetNameAsc",
    });

    const response = await apiClient.get<Request[]>(
      `${API_ROUTES.requests.getRequests}?${queryParams.toString()}`,
    );

    const pagination = getPaginationHeader(
      response.headers as AxiosResponseHeaders,
    );
    return {
      data: response.data,
      total: pagination.totalCount,
    };
  },
  changeRequestComplete: async ({
    returningRequestId,
  }: ChangeRequestParams): Promise<{ data: Request }> => {
    const apiRoute =
      API_ROUTES.requests.changeRequestComplete(returningRequestId);
    const response = await apiClient.put<Request>(apiRoute, {
      id: returningRequestId,
    });

    return response;
  },
  changeRequestCancel: async ({
    returningRequestId,
  }: ChangeRequestParams): Promise<{ data: Request }> => {
    const formData = new FormData();
    const apiRoute =
      API_ROUTES.requests.changeRequestCancel(returningRequestId);
    formData.append("Id", returningRequestId);
    const response = await apiClient.put<Request>(apiRoute, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  },
};

export default requestService;
