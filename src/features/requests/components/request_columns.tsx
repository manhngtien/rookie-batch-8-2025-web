import type { ColumnDef } from "@tanstack/react-table";

import { ActionButton } from "@/components/ui/dashboard-elements";
import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";

import type Request from "../types/Request";

export const requestColumns: ColumnDef<Request>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No." />
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
  },
  {
    accessorKey: "requestedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested By" />
    ),
  },
  {
    accessorKey: "assignedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned Date" />
    ),
  },
  {
    accessorKey: "acceptedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Accepted By" />
    ),
  },
  {
    accessorKey: "returnedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Returned Date" />
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
        <div className="-my-4 flex">
          <ActionButton
            iconName="pencil"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
          <ActionButton
            iconName="circle-x"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
          <ActionButton
            iconName="undo-2"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      );
    },
  },
];
