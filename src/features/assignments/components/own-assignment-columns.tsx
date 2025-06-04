import type { ColumnDef } from "@tanstack/react-table";

import { ActionButton } from "@/components/ui/dashboard-elements";
import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import { formatLabel } from "@/lib/utils";
import { formatDate } from "@/utils/helpers";

import type { Assignment } from "../types/Assignment";
import { assignmentStateMap } from "../types/Assignment";

interface OwnAssignmentColumnsProps {
  onOpenReplyDialog: (
    assignment: Assignment,
    actionType: "accept" | "decline",
  ) => void;
}

export const ownAssignmentColumns = ({
  onOpenReplyDialog,
}: OwnAssignmentColumnsProps): ColumnDef<Assignment>[] => [
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
    accessorKey: "assignedToUser.userName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned to" />
    ),
  },
  {
    accessorKey: "assignedByUser.userName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned by" />
    ),
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
      const isWaiting = assignment.state === "Waiting_For_Acceptance";
      const isAccepted = assignment.state === "Accepted";
      return (
        <div className="-my-4 flex">
          <ActionButton
            iconName="check"
            disabled={!isWaiting}
            onClick={() => {
              onOpenReplyDialog(assignment, "accept");
            }}
          />
          <ActionButton
            iconName="circle-x"
            disabled={!isWaiting}
            className="text-foreground"
            onClick={() => {
              onOpenReplyDialog(assignment, "decline");
            }}
          />
          <ActionButton
            iconName="undo-2"
            className="text-blue-500"
            disabled={!isAccepted}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      );
    },
  },
];
