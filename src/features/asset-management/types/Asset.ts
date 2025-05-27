import type { Assignment } from "@/features/assignments/types/Assignment";

import type { Category } from "./Category";

export interface Asset {
  assetCode: string;
  assetName: string;
  specification: string;
  type: number;
  location: number;
  installedDate: Date;
  category: Category;
  state: string;
  assignments: Assignment[];
}

export interface PaginationHeader {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}
