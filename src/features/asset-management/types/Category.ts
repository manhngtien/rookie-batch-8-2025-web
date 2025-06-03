export interface Category {
  id: number | null;
  prefix: string;
  categoryName: string;
  total: number | null;
}

export interface CategoryAPIResponse {
  id: number;
  prefix: string;
  categoryName: string;
  total: number;
}

export interface CreateCategoryRequest {
  categoryName: string;
  prefix: string;
}
