export interface PaginationHeader {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

export interface FetchParams {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
  orderBy?: string;
}

export interface FetchResponse<T> {
  data: T;
  total: number;
}
