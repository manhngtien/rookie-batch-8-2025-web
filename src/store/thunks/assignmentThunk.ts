import { assignmentService } from "@/features/assignments/services/assignmentService";
import type {
  Assignment,
  AssignmentEditRequest,
  AssignmentFormRequest,
  FetchAssignmentsParams,
} from "@/features/assignments/types/Assignment";
import type { FetchResponse } from "@/types";
import { createAppThunk } from "@/utils/thunkFactory";

export const fetchAssignments = createAppThunk<
  FetchAssignmentsParams,
  FetchResponse<Assignment[]>
>(
  "assignments/fetch",
  async ({
    pageNumber,
    pageSize,
    assignedDate,
    searchTerm,
    orderBy,
    state,
  }) => {
    const response = await assignmentService.getAssignments({
      pageNumber,
      pageSize,
      assignedDate,
      searchTerm,
      orderBy,
      state,
    });
    return response;
  },
);

export const getSingleAssignment = createAppThunk<
  { id: number },
  { data: Assignment }
>("assignments/getById", async (id) => {
  const response = await assignmentService.getSingleAssignment(id);
  return response;
});

export const createAssignment = createAppThunk<
  AssignmentFormRequest,
  { data: Assignment }
>("assignments/create", async (assignment) => {
  const response = await assignmentService.createAssignment(assignment);
  return response;
});

export const editAssignment = createAppThunk<
  AssignmentEditRequest,
  { data: Assignment }
>("assignments/edit", async (assignment) => {
  const response = await assignmentService.editAssignment(assignment);
  return response;
});

export const deleteSingleAssignment = createAppThunk<
  { id: number },
  { status: number }
>("assignments/getById", async (id) => {
  const response = await assignmentService.deleteSingleAssignment(id);
  return response;
});
