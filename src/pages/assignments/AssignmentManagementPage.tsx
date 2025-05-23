import { useState } from "react";

import {
  FilterButton,
  type FilterButtonItems,
} from "@/components/ui/dashboard-elements";
import { PageTitle } from "@/components/ui/dashboard-elements";
import { DataTable } from "@/components/ui/data-table";
import { assignmentColumns } from "@/features/assignments/components/assignment-columns";
import type { Assignment } from "@/features/assignments/types/Assignment";

// Example mock data for Assignment
const mockAssignments: Assignment[] = [
  {
    id: 1,
    state: "Accepted",
    assignedDate: new Date("2025-05-01"),
    assetCode: "AS001",
    assetName: "Laptop Dell XPS 13",
    assignedBy: "Alice Nguyen",
    assignedTo: "Bob Tran",
    note: "Urgent assignment",
  },
  {
    id: 2,
    state: "Waiting for Acceptance",
    assignedDate: new Date("2025-05-10"),
    assetCode: "AS002",
    assetName: 'Monitor Samsung 24"',
    assignedBy: "Charlie Le",
    assignedTo: "Daisy Pham",
    note: "",
  },
  {
    id: 3,
    state: "Declined",
    assignedDate: new Date("2025-05-15"),
    assetCode: "AS003",
    assetName: "Keyboard Logitech K380",
    assignedBy: "Eve Hoang",
    assignedTo: "Frank Vu",
    note: "User declined due to duplicate",
  },
];

const filterItems: FilterButtonItems[] = [
  {
    title: "Accepted",
  },
  {
    title: "Declined",
  },
  {
    title: "Waiting for acceptance",
  },
];

function AssignmentManagementPage() {
  const [checkedItem, setCheckedItem] = useState<"all" | number>("all");
  return (
    <div className="flex flex-col gap-4">
      <PageTitle>Assignment List</PageTitle>

      <FilterButton
        filterTitle="State"
        items={filterItems}
        checkedItem={checkedItem}
        onCheckedItemChange={setCheckedItem}
      />

      <DataTable columns={assignmentColumns} data={mockAssignments} />
    </div>
  );
}

export default AssignmentManagementPage;
