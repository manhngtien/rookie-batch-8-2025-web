import type { ColumnDef } from "@tanstack/react-table";

import { ActionButton } from "@/components/ui/dashboard-elements";
import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import { calculateNumberPosition, formatLabel } from "@/lib/utils";
import { formatDate } from "@/utils/helpers";

import { type Assignment, assignmentStateMap } from "../types/Assignment";

export const assignmentColumns = ({
  onEdit,
  onDelete,
  onAssignmentReturn,
}: {
  onEdit: (assignment: Assignment) => void;
  onDelete: (assignment: Assignment) => void;
  onAssignmentReturn: (assignment: Assignment) => void;
}): ColumnDef<Assignment>[] => [
  {
    id: "number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No." />
    ),
    cell: ({ row, table }) => {
      const pageIndex = table.options.state.pagination?.pageIndex || 0;
      const pageSize = table.options.state.pagination?.pageSize || 20;
      return calculateNumberPosition(pageIndex, pageSize, row.index);
    },
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
    id: "assignedTo",
    accessorKey: "assignedToUser.userName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned to" />
    ),
    cell: ({ row }) => {
      const userName: string = row.getValue("assignedTo");
      const maxLength = 30;
      if (userName.length > maxLength) {
        return `${userName.substring(0, maxLength)}...`;
      }
      return userName;
    },
  },
  {
    id: "assignedBy",
    accessorKey: "assignedByUser.userName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned by" />
    ),
    cell: ({ row }) => {
      const userName: string = row.getValue("assignedBy");
      const maxLength = 30;
      if (userName.length > maxLength) {
        return `${userName.substring(0, maxLength)}...`;
      }
      return userName;
    },
  },
  {
    accessorKey: "assignedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("assignedDate"));
      return <span>{formatDate(date)}</span>;
    },
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="State" />
    ),
    cell: ({ row }) => {
      const rawState = row.getValue("state") as string;
      return <span>{formatLabel(rawState, assignmentStateMap)}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const assignment = row.original;
      return (
        <div className="-my-4 flex">
          <ActionButton
            id="edit-assignment-button"
            iconName="pencil"
            disabled={assignment.state !== "Waiting_For_Acceptance"}
            onClick={() => onEdit(assignment)}
          />
          <ActionButton
            id="delete-assignment-button"
            iconName="circle-x"
            className="text-foreground"
            disabled={
              assignment.state !== "Waiting_For_Acceptance" &&
              assignment.state !== "Declined"
            }
            onClick={() => onDelete(assignment)}
          />
          <ActionButton
            id="return-assignment-button"
            iconName="undo-2"
            className="text-blue-500"
            disabled={
              assignment.state !== "Accepted" || assignment.isReturned === true
            }
            onClick={() => onAssignmentReturn(assignment)}
          />
        </div>
      );
    },
  },
];
