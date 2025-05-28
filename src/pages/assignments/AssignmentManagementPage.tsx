import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CreateButton,
  DateSelector,
  DetailDialog,
  FilterButton,
} from "@/components/ui/dashboard-elements";
import { PageTitle } from "@/components/ui/dashboard-elements";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import { assignmentColumns } from "@/features/assignments/components/assignment-columns";
import type { Assignment } from "@/features/assignments/types/Assignment";
import type { AppDispatch, RootState } from "@/store";
import { fetchAssignments } from "@/store/thunks/assignmentThunk";

// Example mock data for Assignment
// const mockAssignments: Assignment[] = [
//   {
//     id: 1,
//     state: "Accepted",
//     assignedDate: new Date("2025-05-01"),
//     assetCode: "AS001",
//     assetName: "Laptop Dell XPS 13",
//     assignedBy: "Alice Nguyen",
//     assignedTo: "Bob Tran",
//     note: "Urgent assignment",
//   },
//   {
//     id: 2,
//     state: "Waiting for Acceptance",
//     assignedDate: new Date("2025-05-10"),
//     assetCode: "AS002",
//     assetName: 'Monitor Samsung 24"',
//     assignedBy: "Charlie Le",
//     assignedTo: "Daisy Pham",
//     note: "",
//   },
//   {
//     id: 3,
//     state: "Declined",
//     assignedDate: new Date("2025-05-15"),
//     assetCode: "AS003",
//     assetName: "Keyboard Logitech K380",
//     assignedBy: "Eve Hoang",
//     assignedTo: "Frank Vu",
//     note: "User declined due to duplicate",
//   },
// ];

const filterItems = ["Accepted", "Declined", "Waiting for acceptance"];

function AssignmentManagementPage() {
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [sort, setSort] = useState<{ id: string; desc: boolean } | null>({
    id: "assetName",
    desc: false,
  });

  const { data, total, loading, error } = useSelector(
    (state: RootState) => state.assignments,
  );

  const dispatch = useDispatch<AppDispatch>();

  const orderBy = sort
    ? `${sort.id}${sort.desc ? "desc" : "asc"}`.toLowerCase()
    : "fullnameasc";

  const initialState = {
    sorting: sort ? [sort] : [{ id: "assetName", desc: false }],
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
  };

  const handleRowClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
  };

  const fetchData = useCallback(async () => {
    try {
      // const typeParam = selectedTypes.includes("All")
      //   ? undefined
      //   : selectedTypes;
      const response = await dispatch(
        fetchAssignments({
          pageNumber: page,
          pageSize,
          assignedDate: selectedDate,
          // searchTerm,
          orderBy,
        }),
      ).unwrap();
      console.info("Assignments fetched successfully", response);
    } catch (err) {
      console.error("Failed to fetch assignments:", err);
    }
  }, [dispatch, orderBy, page, pageSize, selectedDate]);

  const handleFilterChange = (selected: string[]) => {
    console.log("🔥 Selected filters:", selected);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, orderBy, page, pageSize, selectedDate]);

  return (
    <div className="flex flex-col gap-4">
      <PageTitle>Assignment List</PageTitle>

      <div className="flex">
        <div className="flex w-full gap-2">
          <FilterButton
            label="State"
            options={filterItems}
            onChange={handleFilterChange}
          />
          <DateSelector
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            title="Assigned Date"
          />
        </div>

        <CreateButton>Create new assignment</CreateButton>
      </div>

      {loading && (
        <div>
          <Spinner className="text-foreground" size="large" />
        </div>
      )}

      {error && <p className="text-center text-red-600">Error: {error}</p>}

      <DataTable
        total={total}
        columns={assignmentColumns}
        data={data}
        initialState={initialState}
        handleRowClick={(assignment) => handleRowClick(assignment)}
        onPageChange={(pageIndex) => setPage(pageIndex + 1)}
        onSortingChange={(sort) => {
          setSort(sort);
          setPage(1);
        }}
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
