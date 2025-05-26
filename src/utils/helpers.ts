import type { AxiosResponseHeaders } from "axios";

import type { PaginationHeader } from "@/types";

export const formatDate = (dateInput: string | Date): string => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getPaginationHeader = (
  headers: AxiosResponseHeaders,
): PaginationHeader => {
  const paginationHeader = headers["pagination"];
  if (!paginationHeader) {
    throw new Error("Pagination header missing or invalid");
  }

  return JSON.parse(paginationHeader);
};
