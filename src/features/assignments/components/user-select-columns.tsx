import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { User } from "@/features/users/types/User";

export const userColumns = (
  selectedStaffCode: string | null,
  onSelect: (staffCode: string) => void,
): ColumnDef<User>[] => [
  {
    id: "select",
    cell: ({ row }) => (
      <RadioGroup>
        <RadioGroupItem
          checked={row.original.staffCode === selectedStaffCode}
          value={row.original.staffCode}
          onClick={() => onSelect(row.original.staffCode)}
        />
      </RadioGroup>
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
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
];
