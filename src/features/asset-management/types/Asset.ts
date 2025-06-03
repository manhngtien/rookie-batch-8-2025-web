import type { Assignment } from "@/features/assignments/types/Assignment";

import type { Category } from "./Category";

export interface Asset {
  assetCode: string;
  assetName: string;
  specification: string;
  location: number;
  installedDate: string;
  category: Category;
  state: string;
  assignments: Assignment[];
}

export const ELocation = {
  HCM: 1,
  HN: 2,
  DN: 3,
} as const;

export type ELocation = (typeof ELocation)[keyof typeof ELocation];

export const LocationLabelMap: Record<ELocation, string> = {
  [ELocation.HCM]: "Ho Chi Minh",
  [ELocation.HN]: "Ha Noi",
  [ELocation.DN]: "Da Nang",
};

export interface AssetCreate {
  assetName: string;
  specification: string;
  location: number;
  installedDate: Date;
  category_id: number;
  state: string;
}

export interface AssetUpdate {
  assetName: string;
  specification: string;
  installedDate: string;
  state: string;
}

export interface PaginationHeader {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}
