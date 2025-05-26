import { assignmentService } from "@/features/assignments/services/assignmentService";
import type {
  FetchAssignmentsParams,
  FetchAssignmentsResponse,
} from "@/features/assignments/types/Assignment";
import { createAppThunk } from "@/utils/thunkFactory";

export const fetchAssignments = createAppThunk<
  FetchAssignmentsParams,
  FetchAssignmentsResponse
>(
  "assignments/fetchAssignments",
  async ({ pageNumber, pageSize, assignedDate, searchTerm, orderBy }) => {
    const response = await assignmentService.getAssignments({
      pageNumber: pageNumber,
      pageSize,
      assignedDate: assignedDate,
      searchTerm: searchTerm,
      orderBy: orderBy,
    });
    return response;
  },
);
