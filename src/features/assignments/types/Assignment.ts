import type { User } from "@/features/users/types/User";
import type { FetchParams } from "@/types";

export interface FetchAssignmentsParams extends FetchParams {
  assignedDate?: Date | null;
  state?: string[];
}

export type AssignmentState =
  | "Accepted"
  | "Declined"
  | "Waiting_For_Acceptance";

export const assignmentStateMap: Record<AssignmentState, string> = {
  Accepted: "Accepted",
  Declined: "Declined",
  Waiting_For_Acceptance: "Waiting for Acceptance",
};

export interface Assignment {
  id: number;
  state: AssignmentState;
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
