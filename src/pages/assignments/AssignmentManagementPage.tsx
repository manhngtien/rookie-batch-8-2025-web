import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  CreateButton,
  DateSelector,
  DetailDialog,
  FilterButton,
  PageTitle,
  SearchInput,
} from "@/components/ui/dashboard-elements";
import { DataTable } from "@/components/ui/data-table";
import { assignmentColumns } from "@/features/assignments/components/assignment-columns";
import type { Assignment } from "@/features/assignments/types/Assignment";
import { useDebounce } from "@/hooks/useDebounce";
import { APP_ROUTES } from "@/lib/appRoutes";
import { formatStateLabel, revertStateLabel } from "@/lib/utils";
import type { AppDispatch, RootState } from "@/store";
import { fetchAssignments } from "@/store/thunks/assignmentThunk";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const { data, total, loading, error } = useSelector(
    (state: RootState) => state.assignments,
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // TODO: hooks??

  // TODO: maybe this sort stuff could be separated

  const orderBy = sort
    ? `${sort.id}${sort.desc ? "desc" : "asc"}`.toLowerCase()
    : "assetnameasc";

  const initialState = {
    sorting: sort ? [sort] : [{ id: "assetName", desc: false }],
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
  };

  const debouncedSearchTerm = useDebounce(searchTerm);

  const handleRowClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await dispatch(
        fetchAssignments({
          pageNumber: page,
          pageSize,
          assignedDate: selectedDate,
          searchTerm: debouncedSearchTerm,
          orderBy,
          state: selectedStates.map(revertStateLabel),
        }),
      ).unwrap();
      console.info("Assignments fetched successfully", response);
    } catch (err) {
      console.error("Failed to fetch assignments:", err);
    }
  }, [
    debouncedSearchTerm,
    dispatch,
    orderBy,
    page,
    pageSize,
    selectedDate,
    selectedStates,
  ]);

  const handleFilterChange = (selected: string[]) => {
    setSelectedStates(selected);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col gap-4">
      <PageTitle>Assignment List</PageTitle>

      <div className="flex flex-col gap-2 md:flex-row">
        <div className="flex w-full gap-2">
          <FilterButton
            label="State"
            options={filterItems}
            onChange={handleFilterChange}
            defaultSelected={selectedStates}
          />
          <DateSelector
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            title="Assigned Date"
            disableFutureDates={false}
          />
        </div>

        <div className="flex w-full gap-2 md:justify-end">
          <SearchInput
            id="assignment-search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />

          <CreateButton
            onClick={() => {
              navigate(
                `${APP_ROUTES.assignment.path}/${APP_ROUTES.assignment.create}`,
              );
            }}
          >
            Create new assignment
          </CreateButton>
        </div>
      </div>

      {error && <p className="text-center text-red-600">Error: {error}</p>}

      <DataTable
        total={total}
        columns={assignmentColumns}
        data={data}
        loading={loading}
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
          {/* TODO: maybe this could also be separated to components */}
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
              {new Date(selectedAssignment.assignedDate).toLocaleDateString()}
            </p>
            <p className="font-medium">State:</p>
            <p className="text-left">
              {formatStateLabel(selectedAssignment.state)}
            </p>
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
