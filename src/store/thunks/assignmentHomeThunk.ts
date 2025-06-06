import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import assignmentService from "@/features/assignments/services/assignmentHomeService";
import type {
  FetchAssignmentsParams,
  FetchAssignmentsResponse,
} from "@/features/assignments/types/Assignment";

export const fetchAssigmentsHome = createAsyncThunk<
  FetchAssignmentsResponse,
  FetchAssignmentsParams,
  { rejectValue: string }
>(
  "assignmentsHome/fetchAssignmentsHome",
  async (
    { pageNumber, pageSize, assignedDate, searchTerm, orderBy },
    { rejectWithValue },
  ) => {
    try {
      const response = await assignmentService.getAssignmentsHome({
        pageNumber,
        pageSize,
        assignedDate,
        searchTerm,
        orderBy,
      });
      return response;
    } catch (error: unknown) {
      console.error("Caught error:", error);
      if (isAxiosError(error)) {
        return rejectWithValue(error.message || "Failed to fetch assignments");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const replyAssignment = createAsyncThunk<
  void,
  { assignmentId: number; isAccepted: boolean },
  { rejectValue: string }
>(
  "assignmentsHome/replyAssignment",
  async ({ assignmentId, isAccepted }, { rejectWithValue }) => {
    try {
      await assignmentService.replyAssignment(assignmentId, isAccepted);
    } catch (error: unknown) {
      console.error("Caught error while replying to assignment:", error);
      if (isAxiosError(error)) {
        return rejectWithValue(
          error.message || "Failed to reply to assignment",
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const userReturnRequest = createAsyncThunk<
  void,
  { assignmentId: number },
  { rejectValue: string }
>(
  "assignmentsHome/userReturnRequest",
  async ({ assignmentId }, { rejectWithValue }) => {
    try {
      await assignmentService.userReturnRequest(assignmentId);
    } catch (error: unknown) {
      console.error("Caught error while returning request:", error);
      if (isAxiosError(error)) {
        return rejectWithValue(error.message || "Failed to return request");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);
