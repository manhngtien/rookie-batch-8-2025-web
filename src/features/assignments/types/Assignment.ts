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

export interface CreateAssignmentRequest {
  staffCode: string;
  assetCode: string;
  assignedDate: Date;
  note?: string;
}
