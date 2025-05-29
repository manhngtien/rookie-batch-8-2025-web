import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

import { PageTitle, SearchInput } from "@/components/ui/dashboard-elements";
import { DataTable } from "@/components/ui/data-table";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchPopup<T>({
  title,
  columns,
  data,
  total,
  loading,
  page,
  setPage,
  setSort,
  pageSize,
  debouncedSearchTerm,
  handleRowSelect,
}: {
  title: string;
  columns: ColumnDef<T>[];
  data: T[];
  total: number;
  loading: boolean;
  page: number;
  setPage: (value: React.SetStateAction<number>) => void;
  setSort: (
    value: React.SetStateAction<{
      id: string;
      desc: boolean;
    } | null>,
  ) => void;
  pageSize: number;
  debouncedSearchTerm: (value: string) => void;
  handleRowSelect: (row: T) => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  debouncedSearchTerm(useDebounce(searchTerm));

  return (
    <div>
      <PageTitle>{title}</PageTitle>

      <SearchInput
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
      />

      <DataTable
        columns={columns}
        data={data}
        total={total}
        loading={loading}
        initialState={{
          pagination: {
            pageIndex: page - 1,
            pageSize,
          },
        }}
        onPageChange={(pageIndex) => setPage(pageIndex + 1)}
        uniqueLastColumn={false}
        onSortingChange={(sort) => {
          setSort(sort);
          setPage(1);
        }}
        handleRowClick={handleRowSelect}
      />
    </div>
  );
}
