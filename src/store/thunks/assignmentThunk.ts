import { assignmentService } from "@/features/assignments/services/assignmentService";
import type {
  Assignment,
  FetchAssignmentsParams,
} from "@/features/assignments/types/Assignment";
import type { FetchResponse } from "@/types";
import { createAppThunk } from "@/utils/thunkFactory";

export const fetchAssignments = createAppThunk<
  FetchAssignmentsParams,
  FetchResponse<Assignment[]>
>(
  "assignments/fetchAssignments",
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
