import type { ColumnDef } from "@tanstack/react-table";
import { CircleX, Pencil } from "lucide-react";

import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import type { User } from "@/features/users/types/User";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "staffCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Staff Code" />
    ),
  },
  {
    id: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return `${firstName} ${lastName}`;
    },
  },
  {
    accessorKey: "userName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "joinedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined Date" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="flex gap-2">
          <button
            id="edit-user-button"
            className="duration-200 hover:scale-120 hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Pencil size={20} />
          </button>
          <button
            id="delete-user-button"
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
