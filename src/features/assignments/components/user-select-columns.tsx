import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import type { User } from "@/features/users/types/User";

export const userSelectColumns: ColumnDef<User>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <input
        id=""
        type="radio"
        checked={row.getIsSelected()}
        value={row.original.staffCode}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
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
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
];
