import { assignmentService } from "@/features/assignments/services/assignmentService";
import type {
  Assignment,
  CreateAssignmentRequest,
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

export const createAssignment = createAppThunk<
  CreateAssignmentRequest,
  { data: Assignment[]; total: number } // <- "total" is a workaround. TODO: fix on addThunkCases
>("assignments/create", async (assignment) => {
  const response = await assignmentService.createAssignment(assignment);
  return { data: response.data, total: 1 };
});
