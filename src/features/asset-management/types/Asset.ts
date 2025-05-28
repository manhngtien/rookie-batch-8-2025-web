import type { Assignment } from "@/features/assignments/types/Assignment";

import type { Category } from "./Category";

export interface Asset {
  assetCode: string;
  assetName: string;
  specification: string;
  location: number;
  installedDate: Date;
  category: Category;
  state: string;
  assignments: Assignment[];
}

export interface AssetCreate {
  assetName: string;
  specification: string;
  location: number;
  installedDate: Date;
  category_id: number;
  state: string;
}

export interface PaginationHeader {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}
