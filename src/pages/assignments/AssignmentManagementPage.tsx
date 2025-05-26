import { useState } from "react";

import {
  CreateButton,
  DateSelector,
  DetailDialog,
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
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleRowClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
  };

  return (
    <div className="flex flex-col gap-4">
      <PageTitle>Assignment List</PageTitle>

      <div className="flex">
        <div className="flex w-full gap-2">
          <FilterButton
            filterTitle="State"
            items={filterItems}
            checkedItem={checkedItem}
            onCheckedItemChange={setCheckedItem}
          />
          <DateSelector
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            title="Assigned Date"
          />
        </div>

        <CreateButton>Create new assignment</CreateButton>
      </div>

      <DataTable
        total={-1}
        columns={assignmentColumns}
        data={mockAssignments}
        handleRowClick={(assignment) => handleRowClick(assignment)}
      />

      {selectedAssignment && (
        <DetailDialog<Assignment>
          selectedEntity={selectedAssignment}
          closeModal={() => setSelectedAssignment(null)}
          title="Detailed Assignment Information"
        >
          <div className="grid grid-cols-2 gap-4 text-gray-500">
            <p className="font-medium">Asset Code:</p>
            <p className="text-left">{selectedAssignment.assetCode}</p>
            <p className="font-medium">Asset Name:</p>
            <p className="text-left">{selectedAssignment.assetName}</p>
            <p className="font-medium">Assigned To:</p>
            <p className="text-left">{selectedAssignment.assignedTo}</p>
            <p className="font-medium">Assigned By:</p>
            <p className="text-left">{selectedAssignment.assignedBy}</p>
            <p className="font-medium">Assigned Date:</p>
            <p className="text-left">
              {selectedAssignment.assignedDate.toLocaleDateString()}
            </p>
            <p className="font-medium">State:</p>
            <p className="text-left">{selectedAssignment.state}</p>
            {selectedAssignment.note && (
              <>
                <p className="font-medium">Note:</p>
                <p className="text-left">{selectedAssignment.note}</p>
              </>
            )}
          </div>
        </DetailDialog>
      )}
    </div>
  );
}

export default AssignmentManagementPage;
