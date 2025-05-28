import type { FetchParams } from "@/types";

export interface FetchAssignmentsParams extends FetchParams {
  assignedDate?: Date | null;
  state?: string[];
}

export interface Assignment {
  id: number;
  state: string;
  assignedDate: string;
  assetCode: string;
  assetName: string;
  assignedBy: string;
  assignedTo: string;
  note: string;
}
