import type { Assignment } from "@/features/assignments/types/Assignment";

export interface Asset {
  assetCode: string;
  assetName: string;
  specification: string;
  type: number;
  location: number;
  installedDate: string;
  categoryId: number;
  categoryName: string;
  state: string;
  assignments: Assignment[];
}
