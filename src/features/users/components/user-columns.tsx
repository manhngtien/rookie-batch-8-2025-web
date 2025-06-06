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
interface UserColumnsProps {
  currentUserLocation?: string;
}

export const userColumns = ({
  currentUserLocation,
}: UserColumnsProps): ColumnDef<User>[] => [
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
    cell: ({ row }) => {
      const fullName: string = row.getValue("fullName");
      const maxLength = 30;
      if (fullName.length > maxLength) {
        return `${fullName.substring(0, maxLength)}...`;
      }
      return fullName;
    },
  },
  {
    accessorKey: "userName",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => {
      const userName: string = row.getValue("userName");
      const maxLength = 30;
      if (userName.length > maxLength) {
        return `${userName.substring(0, maxLength)}...`;
      }
      return userName;
    },
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
      const isSameLocation = currentUserLocation
        ? user.location === currentUserLocation
        : true;

      const [isDialogOpen, setIsDialogOpen] = useState(false);

      return (
        <div className="-my-4 flex">
          <ActionButton
            iconName="pencil"
            disabled={!isSameLocation}
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                `${APP_ROUTES.users.path}/${APP_ROUTES.users.edit}/${user.staffCode}`,
              );
            }}
          />
          <ActionButton
            iconName="circle-x"
            disabled={!isSameLocation}
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
