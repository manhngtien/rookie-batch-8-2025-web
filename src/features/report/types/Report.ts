export interface Report {
  categoryName: string;
  total: number;
  totalAssigned: number;
  totalAvailable: number;
  totalNotAvailable: number;
  totalWaitingForRecycling: number;
  totalRecycled: number;
}
