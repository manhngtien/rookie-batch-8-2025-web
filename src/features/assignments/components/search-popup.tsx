import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { PageTitle, SearchInput } from "@/components/ui/dashboard-elements";
import { DataTable } from "@/components/ui/data-table";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchPopup<T>({
  title,
  columns,
  data,
  total,
  loading,
  sendPage,
  sendSort,
  sendPageSize,
  sendSearchTerm,
  onSave,
  onCancel,
}: {
  title: string;
  columns: ColumnDef<T>[];
  data: T[];
  total: number;
  loading: boolean;
  sendPage: (value: number) => void;
  sendSort: (
    value: {
      id: string;
      desc: boolean;
    } | null,
  ) => void;
  sendPageSize: (value: number) => void;
  sendSearchTerm: (value: string) => void;
  onSave: (row: T | undefined) => void;
  onCancel: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [sort, setSort] = useState<{ id: string; desc: boolean } | null>({
    id: "",
    desc: false,
  });
  const [selectedRow, setSelectedRow] = useState<T | undefined>(undefined);

  sendSearchTerm(useDebounce(searchTerm));
  sendPage(page);
  sendSort(sort);
  sendPageSize(pageSize);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <PageTitle>{title}</PageTitle>

        <SearchInput
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
      </div>

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
        handleRowClick={(row) => setSelectedRow(row)}
      />

      <div className="flex justify-end gap-4">
        <Button
          id="save-search-popup"
          onClick={() => onSave(selectedRow)}
          disabled={!selectedRow}
        >
          Save
        </Button>
        <Button
          id="close-search-popup"
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
