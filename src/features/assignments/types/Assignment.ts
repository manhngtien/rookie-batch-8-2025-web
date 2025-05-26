import type { FetchParams } from "@/types";

export interface FetchAssignmentsParams extends FetchParams {
  assignedDate?: Date;
}

export interface FetchAssignmentsResponse {
  data: Assignment[];
  total: number;
}

export interface Assignment {
  id: number;
  state: string;
  assignedDate: Date;
  assetCode: string;
  assetName: string;
  assignedBy: string;
  assignedTo: string;
  note: string;
}
