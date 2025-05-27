import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TableSkeleton from "../table-skeleton";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  initialState?: TableOptions<TData>["initialState"];
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  total: number;
  handleRowClick?: (row: TData) => void;
  onPageChange?: (pageIndex: number) => void;
  onSortingChange?: (sort: { id: string; desc: boolean } | null) => void;
}

export function DataTable<TData, TValue>({
  initialState,
  columns,
  data,
  total,
  loading,
  handleRowClick,
  onPageChange,
  onSortingChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(
    initialState?.sorting ?? [{ id: "fullName", desc: false }],
  );

  const table = useReactTable({
    data,
    columns,
    rowCount: total,
    state: {
      sorting,
      pagination: {
        pageIndex: initialState?.pagination?.pageIndex ?? 0,
        pageSize: initialState?.pagination?.pageSize ?? 20,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        const newSorting = updater(sorting);
        setSorting(newSorting);
        const sort = newSorting.length > 0 ? newSorting[0] : null;
        onSortingChange?.(sort);
      } else {
        setSorting(updater);
        const sort = updater.length > 0 ? updater[0] : null;
        onSortingChange?.(sort);
      }
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater(table.getState().pagination);
        onPageChange?.(newState.pageIndex);
      }
    },
  });

  return (
    <div className="relative rounded-md">
      <Table className="text-black">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-none bg-gray-100">
              {headerGroup.headers.slice(0, -1).map((header) => (
                <TableHead
                  className="border p-2 text-left text-black hover:cursor-pointer"
                  key={header.id}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort() ? "select-none" : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                              ? "Sort descending"
                              : "Clear sort"
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="group border-none hover:cursor-pointer"
                onClick={() => handleRowClick?.(row.original)}
              >
                {row
                  .getVisibleCells()
                  .slice(0, -1)
                  .map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="group-hover:bg-muted/50 border p-4"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                {row
                  .getVisibleCells()
                  .slice(-1)
                  .map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="group-hover:white w-0 p-4 whitespace-nowrap hover:cursor-default"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="py-2">
        <DataTablePagination table={table} total={total} />
      </div>
    </div>
  );
}
