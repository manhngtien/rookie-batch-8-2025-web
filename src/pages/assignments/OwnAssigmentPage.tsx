import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DetailDialog, PageTitle } from "@/components/ui/dashboard-elements";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import { assignmentColumns } from "@/features/assignments/components/assignment-columns";
import type { Assignment } from "@/features/assignments/types/Assignment";
import type { AppDispatch, RootState } from "@/store";
import { fetchAssigmentsHome } from "@/store/thunks/assignmentHomeThunk";

export default function OwnAssignmentPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { assignments, total, loading, error } = useSelector(
    (state: RootState) => state.assigmentsHome,
  );
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [sort, setSort] = useState<{ id: string; desc: boolean } | null>({
    id: "assetname",
    desc: false,
  });

  const handleRowClick = (assignment: Assignment) => {
    console.log(assignment);
    setSelectedAssignment(assignment);
  };
  const orderBy = sort
    ? `${sort.id}${sort.desc ? "desc" : "asc"}`.toLowerCase()
    : "assetnameasc";
  const initialState = useMemo(
    () => ({
      sorting: sort ? [sort] : [{ id: "assetname", desc: false }],
      pagination: {
        pageIndex: page - 1,
        pageSize,
      },
    }),
    [sort, page, pageSize],
  );

  useEffect(() => {
    const fetchAssignmentsData = async () => {
      try {
        const response = await dispatch(
          fetchAssigmentsHome({
            page,
            pageSize,
            orderBy: orderBy,
          }),
        ).unwrap();
        console.info("Users fetched successfully", response);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchAssignmentsData();
  }, [dispatch, page, pageSize, orderBy]);

  const filteredAssigments = assignments;
  return (
    <div className="flex flex-col gap-4">
      <PageTitle>My Assignments</PageTitle>

      {loading && (
        <div>
          <Spinner className="text-foreground" size="large" />
        </div>
      )}
      {error && <p className="text-center text-red-600">Error: {error}</p>}
      {!loading && !error && (
        <DataTable
          total={total}
          columns={assignmentColumns}
          data={filteredAssigments}
          initialState={initialState}
          handleRowClick={(assignment) => handleRowClick(assignment)}
          onPageChange={(pageIndex) => setPage(pageIndex + 1)}
          onSortingChange={(sort) => {
            console.log(sort);
            setSort(sort);
            setPage(1);
          }}
        />
      )}

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
              {selectedAssignment.assignedDate.toDateString()}
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
