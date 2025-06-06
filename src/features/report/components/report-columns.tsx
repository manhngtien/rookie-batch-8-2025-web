import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import type { Asset } from "@/features/asset-management/types/Asset";

export const reportColumns: ColumnDef<Asset>[] = [
  // {
  //   id: "select",
  //   cell: ({ row }) => (
  //     <input
  //       id=""
  //       type="radio"
  //       checked={row.getIsSelected()}
  //       value={row.original.assetCode}
  //       disabled={!row.getCanSelect()}
  //       onChange={row.getToggleSelectedHandler()}
  //     />
  //   ),
  // },
  {
    accessorKey: "category",
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
    accessorKey: "assigned",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned" />
    ),
  },
  {
    accessorKey: "available",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Available" />
    ),
  },
  {
    accessorKey: "not_available",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Not available" />
    ),
  },
  {
    accessorKey: "waiting_for_recycling",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waiting for recycling" />
    ),
  },
  {
    accessorKey: "recycled",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recycled" />
    ),
  },
];
