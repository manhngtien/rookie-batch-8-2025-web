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

export interface FetchRequestsParams {
  page: number;
  pageSize: number;
  state?: string[];
  searchTerm?: string;
  orderBy?: string;
}

export const State = {
  Completed: "Completed",
  WaitingForReturning: "Waiting for returning",
} as const;

export type State = (typeof State)[keyof typeof State];
