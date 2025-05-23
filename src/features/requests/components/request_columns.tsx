import type { ColumnDef } from "@tanstack/react-table";
import { CircleX, Pencil } from "lucide-react";

import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import type Request from "@/features/requests/Type";

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
        <div className="flex gap-2">
          <button
            id="edit-request"
            className="duration-200 hover:scale-120 hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Pencil size={20} />
          </button>
          <button
            id="cancel-request"
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
