import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import GeneralDialog from "@/components/general-dialog";
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
import { useAssignments } from "@/features/assignments/hooks/useAssignments";
import { useDeleteAssignment } from "@/features/assignments/hooks/useDeleteAssignment";
import { useReturnAssignment } from "@/features/assignments/hooks/useReturnAssignment";
import {
  type Assignment,
  assignmentStateMap,
} from "@/features/assignments/types/Assignment";
import { APP_ROUTES } from "@/lib/appRoutes";
import { formatLabel } from "@/lib/utils";
import { formatDate } from "@/utils/helpers";

const filterItems = Object.values(assignmentStateMap);

function AssignmentManagementPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data,
    total,
    loading,
    error,
    setPage,
    setSort,
    selectedDate,
    setSelectedDate,
    searchTerm,
    setSearchTerm,
    selectedStates,
    setSelectedStates,
    initialState,
    fetchData,
  } = useAssignments();

  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const { deleteAssignment } = useDeleteAssignment(selectedAssignment);
  const { returnAssignment } = useReturnAssignment(selectedAssignment);

  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openReturnDialog, setOpenReturnDialog] = useState(false);

  const newAssignmentCreated = location.state?.newAssignmentCreated;
  const hasHandledNewAssignment = useRef(false);

  const handleRowClick = (assignment: Assignment) => {
    setOpenDetailDialog(true);
    setSelectedAssignment(assignment);
  };

  const handleCloseDetailDialog = () => {
    setSelectedAssignment(null);
    setOpenDetailDialog(false);
  };

  async function handleDeleteAssignment() {
    await deleteAssignment();
    await fetchData();
    handleCloseDeleteDialog();
  }

  const handleCloseDeleteDialog = () => {
    setSelectedAssignment(null);
    setOpenDeleteDialog(false);
  };

  async function handleReturnAssignment() {
    await returnAssignment();
    await fetchData();
    handleCloseReturnDialog();
  }

  const handleCloseReturnDialog = () => {
    setSelectedAssignment(null);
    setOpenReturnDialog(false);
  };

  const handleFilterChange = useCallback(
    (selected: string[]) => {
      setSelectedStates(selected);
      setPage(1);
    },
    [setPage, setSelectedStates],
  );

  useEffect(() => {
    if (newAssignmentCreated && !hasHandledNewAssignment.current) {
      hasHandledNewAssignment.current = true;
      navigate(location.pathname, { replace: true });
      return;
    }

    if (hasHandledNewAssignment.current) {
      hasHandledNewAssignment.current = false;
      return;
    }

    fetchData();
  }, [fetchData, location.pathname, navigate, newAssignmentCreated]);

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
        columns={assignmentColumns({
          onEdit: (assignment) => {
            navigate(
              `${APP_ROUTES.assignment.path}/${APP_ROUTES.assignment.edit}/${assignment.id}`,
            );
          },
          onDelete: (assignment) => {
            setSelectedAssignment(assignment);
            setOpenDeleteDialog(true);
          },
          onAssignmentReturn: (assignment) => {
            setSelectedAssignment(assignment);
            setOpenReturnDialog(true);
          },
        })}
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

      {/* Detail dialog */}
      {selectedAssignment && openDetailDialog && (
        <DetailDialog<Assignment>
          selectedEntity={selectedAssignment}
          closeModal={handleCloseDetailDialog}
          title="Detailed Assignment Information"
        >
          <div className="grid grid-cols-2 gap-4 break-words text-gray-500">
            <p className="font-medium">Asset Code:</p>
            <p className="text-left">{selectedAssignment.assetCode}</p>
            <p className="font-medium">Asset Name:</p>
            <p className="text-left break-words">
              {selectedAssignment.assetName}
            </p>
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
              {formatDate(selectedAssignment.assignedDate)}
            </p>
            <p className="font-medium">State:</p>
            <p className="text-left">
              {formatLabel(selectedAssignment.state, assignmentStateMap)}
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

      {/* Delete dialog */}
      <GeneralDialog
        confirmButtonTitle="Yes"
        declineButtonTitle="No"
        onConfirm={handleDeleteAssignment}
        content
        description="Do you want to delete this assignment?"
        header="Are you sure?"
        isOpen={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      />

      {/* Returning request dialog */}
      <GeneralDialog
        confirmButtonTitle="Yes"
        declineButtonTitle="No"
        onConfirm={handleReturnAssignment}
        content
        description="Do you want to create a returning request for this asset?"
        header="Are you sure?"
        isOpen={openReturnDialog}
        onClose={handleCloseReturnDialog}
      />
    </div>
  );
}

export default AssignmentManagementPage;
