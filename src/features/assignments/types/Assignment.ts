import type { User } from "@/features/users/types/User";
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
  assignedByUser: User;
  assignedToUser: User;
  note: string;
}

export interface FetchAssignmentsResponse {
  data: Assignment[];
  total: number;
}

export interface AssignmentFormRequest {
  staffCode: string;
  assetCode: string;
  assignedDate?: Date;
  note?: string;
}

export interface AssignmentEditRequest extends AssignmentFormRequest {
  id: number;
}
