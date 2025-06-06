import requestService from "@/features/requests/services/requestService";
import type Request from "@/features/requests/types/Request";
import {
  type ChangeRequestParams,
  type FetchRequestsParams,
} from "@/features/requests/types/Request";
import type { FetchResponse } from "@/types";
import { createAppThunk } from "@/utils/thunkFactory";

export const fetchRequests = createAppThunk<
  FetchRequestsParams,
  FetchResponse<Request[]>
>(
  "requests/fetchRequests",
  async ({
    pageNumber,
    returnedDate,
    pageSize,
    state,
    searchTerm,
    orderBy,
  }) => {
    const response = await requestService.getRequests({
      pageNumber,
      pageSize,
      returnedDate,
      state,
      searchTerm,
      orderBy,
    });
    return response;
  },
);

export const changeToCompleted = createAppThunk<
  ChangeRequestParams,
  { data: Request }
>("requests/complete", async (returningRequestId) => {
  const response =
    await requestService.changeRequestComplete(returningRequestId);
  return response;
});

export const changeToCancel = createAppThunk<
  ChangeRequestParams,
  { data: Request }
>("requests/cancel", async (returningRequestId) => {
  const response = await requestService.changeRequestCancel(returningRequestId);
  return response;
});
