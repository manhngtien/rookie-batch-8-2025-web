import type { FetchParams } from "@/types";

export interface PaginationHeader {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}
export default interface Request {
  id: number;
  assetCode: string;
  assetName: string;
  requestedBy: string;
  assignedDate: Date;
  acceptedBy: string;
  returnedDate: Date;
  state: "Completed" | "Waiting for returning";
}

export interface FetchRequestsResponse {
  data: Request[];
  total: number;
}

export interface FetchRequestsParams extends FetchParams {
  state?: string[];
  returnedDate?: Date | null;
}

export interface ChangeRequestParams {
  returningRequestId: string;
}

export const State = {
  Completed: "Completed",
  WaitingForReturning: "Waiting for returning",
} as const;

export type State = (typeof State)[keyof typeof State];
