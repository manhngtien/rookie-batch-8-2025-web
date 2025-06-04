/* eslint-disable react-hooks/rules-of-hooks */
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";

import { ActionButton } from "@/components/ui/dashboard-elements";
import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import type { Asset } from "@/features/asset-management/types/Asset";
import { useAssetDeleteDialog } from "@/hooks/useAssetDeleteDialog";
import { APP_ROUTES } from "@/lib/appRoutes";
import { formatStateLabel } from "@/lib/utils";

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
    id: "category",
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
    cell: ({ row }) => {
      const rawState = row.getValue("state") as string;
      return <span>{formatStateLabel(rawState)}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }: { row: { original: Asset } }) => {
      const asset = row.original;
      const navigate = useNavigate();
      const isAssigned = asset.state.toLowerCase().trim() === "assigned";

      const { openAssetDeleteDialog } = useAssetDeleteDialog();
      return (
        <div className="-my-4 flex">
          <ActionButton
            iconName="pencil"
            disabled={isAssigned}
            onClick={(e) => {
              e.stopPropagation();
              navigate(APP_ROUTES.assets.getEditPath(asset.assetCode));
              console.info("This is the clicked asset: " + asset); // Replace with actual asset code
            }}
          />
          <ActionButton
            iconName="circle-x"
            className="text-foreground"
            disabled={isAssigned}
            onClick={async (e) => {
              e.stopPropagation();
              openAssetDeleteDialog(asset); // ✅ triggers dialog
            }}
          />
        </div>
      );
    },
  },
];
