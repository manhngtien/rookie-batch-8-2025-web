import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import type { Report } from "@/features/report/types/Report";

export const reportColumns: ColumnDef<Report>[] = [
  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
  },
  {
    accessorKey: "totalAssigned",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned" />
    ),
  },
  {
    accessorKey: "totalAvailable",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Available" />
    ),
  },
  {
    accessorKey: "totalNotAvailable",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Not available" />
    ),
  },
  {
    accessorKey: "totalWaitingForRecycling",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waiting for recycling" />
    ),
  },
  {
    accessorKey: "totalRecycled",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recycled" />
    ),
  },
];
