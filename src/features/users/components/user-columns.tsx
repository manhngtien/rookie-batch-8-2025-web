/* eslint-disable react-hooks/rules-of-hooks */
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "react-router";

import { ActionButton } from "@/components/ui/dashboard-elements";
import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import type { User } from "@/features/users/types/User";
import { APP_ROUTES } from "@/lib/appRoutes";
import { formatDate } from "@/utils/helpers";

import DisableUserDialog from "./disable-user-dialog";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "staffCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Staff Code" />
    ),
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
  },
  {
    accessorKey: "userName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "joinedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined Date" />
    ),
    cell: ({ row }) => {
      const joinedDate = row.original.joinedDate;
      return joinedDate ? formatDate(joinedDate) : "N/A";
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const navigate = useNavigate();
      const user = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      return (
        <div className="-my-4 flex">
          <ActionButton
            iconName="pencil"
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                `${APP_ROUTES.users.path}/${APP_ROUTES.users.edit}/${user.staffCode}`,
              );
            }}
          />
          <ActionButton
            iconName="circle-x"
            className="text-foreground"
            onClick={(e) => {
              e.stopPropagation();
              setIsDialogOpen(true);
            }}
          />
          <DisableUserDialog
            user={user}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </div>
      );
    },
  },
];
