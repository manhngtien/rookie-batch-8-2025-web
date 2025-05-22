import type { ColumnDef } from "@tanstack/react-table";

import { ActionButton } from "@/components/ui/action-button";
import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";

import type { Assignment } from "../types/Assignment";

export const assignmentColumns: ColumnDef<Assignment>[] = [
  {
    id: "number",
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
    accessorKey: "assignedTo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned to" />
    ),
  },
  {
    accessorKey: "assignedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned by" />
    ),
  },
  {
    accessorKey: "assignedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned Date" />
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
