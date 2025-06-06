import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import type { Asset } from "@/features/asset-management/types/Asset";

export const assetSelectColumns: ColumnDef<Asset>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <input
        id=""
        type="radio"
        checked={row.getIsSelected()}
        value={row.original.assetCode}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
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
    cell: ({ row }) => {
      const assetName: string = row.getValue("assetName");
      const maxLength = 30;
      if (assetName.length > maxLength) {
        return `${assetName.substring(0, maxLength)}...`;
      }
      return assetName;
    },
  },
  {
    id: "category",
    accessorKey: "category.categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category: string = row.getValue("category");
      const maxLength = 30;
      if (category.length > maxLength) {
        return `${category.substring(0, maxLength)}...`;
      }
      return category;
    },
  },
];
