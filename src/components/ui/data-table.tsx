import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type TableOptions,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  initialState?: TableOptions<TData>["initialState"];
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
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
  handleRowClick,
  onPageChange,
  onSortingChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    initialState: {
      ...initialState,
      pagination: {
        pageIndex: initialState?.pagination?.pageIndex ?? 0,
        pageSize: initialState?.pagination?.pageSize ?? 20,
      },
    },
    columns,
    data,
    rowCount: total,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        const newSorting = updater(table.getState().sorting);
        const sort = newSorting.length > 0 ? newSorting[0] : null;
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
    <div className="rounded-md">
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
          {table.getRowModel().rows?.length ? (
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
