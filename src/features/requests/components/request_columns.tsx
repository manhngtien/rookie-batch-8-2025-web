import type { ColumnDef } from "@tanstack/react-table";

import { ActionButton } from "@/components/ui/dashboard-elements";
import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import { formatStateLabel } from "@/lib/utils";

import type Request from "../types/Request";

export const requestColumns = (
  onCheckClick: (request: Request) => void,
  onCancelClick: (request: Request) => void,
): ColumnDef<Request>[] => [
  {
    id: "number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No." />
    ),
    cell: ({ row }) => row.index + 1,
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
    cell: ({ row }) => {
      const rawState = row.getValue("state") as string;
      return <span>{formatStateLabel(rawState)}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div className="-my-4 flex">
          <ActionButton
            disabled={request.state === "Completed"}
            iconName="check"
            className="text-red-500"
            onClick={() => {
              onCheckClick(request);
            }}
          />
          <ActionButton
            disabled={request.state === "Completed"}
            iconName="circle-x"
            onClick={() => {
              onCancelClick(request);
            }}
          />
        </div>
      );
    },
  },
];
