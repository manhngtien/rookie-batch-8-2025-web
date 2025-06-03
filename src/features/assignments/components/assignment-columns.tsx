/* eslint-disable react-hooks/rules-of-hooks */
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";

import { ActionButton } from "@/components/ui/dashboard-elements";
import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import { APP_ROUTES } from "@/lib/appRoutes";
import { formatStateLabel } from "@/lib/utils";
import { formatDate } from "@/utils/helpers";

import type { Assignment } from "../types/Assignment";

export const assignmentColumns: ColumnDef<Assignment>[] = [
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
      return <span>{formatStateLabel(rawState)}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const assignment = row.original;
      const navigate = useNavigate();

      return (
        <div className="-my-4 flex">
          <ActionButton
            iconName="pencil"
            disabled={assignment.state === "Waiting for acceptance"}
            onClick={() => {
              navigate(
                `${APP_ROUTES.assignment.path}/${APP_ROUTES.assignment.edit}/${assignment.id}`,
              );
            }}
          />
          <ActionButton
            iconName="circle-x"
            className="text-foreground"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
          <ActionButton
            iconName="undo-2"
            className="text-blue-500"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      );
    },
  },
];
