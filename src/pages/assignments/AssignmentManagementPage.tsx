import { DataTable } from "@/components/ui/data-table";
import { PageTitle } from "@/components/ui/page-header";
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

function AssignmentManagementPage() {
  return (
    <>
      <PageTitle>Assignment List</PageTitle>

      <DataTable columns={assignmentColumns} data={mockAssignments} />
    </>
  );
}

export default AssignmentManagementPage;
