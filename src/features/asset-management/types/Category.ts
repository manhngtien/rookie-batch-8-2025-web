export interface Category {
  id: number | null;
  prefix: string;
  name: string;
  total: number | null;
}

export interface CategoryAPIResponse {
  id: number;
  prefix: string;
  categoryName: string;
  total: number;
}
