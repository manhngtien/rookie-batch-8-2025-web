import type { ColumnDef } from "@tanstack/react-table";
import { CircleX, Pencil } from "lucide-react";

import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import type { Asset } from "@/features/asset-management/types/Asset";

export const assetColumns: ColumnDef<Asset>[] = [
  {
    accessorKey: "assetCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asset Code" />
    ),
  },
  {
    accessorKey: "assetName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asset Name" />
    ),
  },
  {
    accessorKey: "category.categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="State" />
    ),
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="flex gap-2">
          <button
            className="duration-200 hover:scale-120 hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Pencil size={20} />
          </button>
          <button
            className="duration-200 hover:scale-120 hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <CircleX size={20} />
          </button>
        </div>
      );
    },
  },
];
