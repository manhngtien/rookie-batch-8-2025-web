export interface PaginationHeader {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

export interface FetchUsersResponse {
  data: User[];
  total: number;
}

export interface FetchUsersParams {
  page: number;
  pageSize: number;
  type?: string[];
  searchTerm?: string;
  orderBy?: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: boolean;
  joinedDate: string;
  type: string;
  location?: string;
}

export interface UpdateUserRequest {
  dateOfBirth: string;
  gender: boolean;
  joinedDate: string;
  type: string;
}
export interface User {
  staffCode: string;
  userName: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  joinedDate: string;
  gender: boolean;
  type: string;
  location: string;
  isDisabled: boolean;
  isFirstLogin: boolean;
}
