import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DetailDialog, PageTitle } from "@/components/ui/dashboard-elements";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import { ownAssignmentColumns } from "@/features/assignments/components/own-assignment-columns";
import ReplyAssignmentDialog from "@/features/assignments/components/reply-assignment-dialog";
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
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [dialogAssignment, setDialogAssignment] = useState<Assignment | null>(
    null,
  );
  const [dialogActionType, setDialogActionType] = useState<
    "accept" | "decline"
  >("accept");

  const handleRowClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleOpenReplyDialog = (
    assignment: Assignment,
    actionType: "accept" | "decline",
  ) => {
    setDialogAssignment(assignment);
    setDialogActionType(actionType);
    setIsReplyDialogOpen(true);
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

  const columns = useMemo(
    () => ownAssignmentColumns({ onOpenReplyDialog: handleOpenReplyDialog }),
    [],
  );

  useEffect(() => {
    const fetchAssignmentsData = async () => {
      try {
        const response = await dispatch(
          fetchAssigmentsHome({
            pageNumber: page,
            pageSize,
            orderBy: orderBy,
          }),
        ).unwrap();
        console.info("Assignments fetched successfully", response);
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
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
          columns={columns}
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
            <p className="text-left">
              {selectedAssignment.assignedToUser.userName}
            </p>
            <p className="font-medium">Assigned By:</p>
            <p className="text-left">
              {selectedAssignment.assignedByUser.userName}
            </p>
            <p className="font-medium">Assigned Date:</p>
            <p className="text-left">
              {new Date(selectedAssignment.assignedDate).toLocaleDateString()}
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

      {dialogAssignment && (
        <ReplyAssignmentDialog
          open={isReplyDialogOpen}
          onOpenChange={(open) => {
            setIsReplyDialogOpen(open);
            if (!open) {
              setDialogAssignment(null);
              setDialogActionType("accept");
            }
          }}
          assignment={dialogAssignment}
          actionType={dialogActionType}
        />
      )}
    </div>
  );
}
