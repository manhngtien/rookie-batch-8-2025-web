import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/store";
import { deleteSingleAssignment } from "@/store/thunks/assignmentThunk";

import type { Assignment } from "../types/Assignment";

export function useDeleteAssignment(selectedAssignment: Assignment | null) {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector(
    (state: RootState) => state.assignments,
  );

  const deleteAssignment = async () => {
    try {
      if (!selectedAssignment) return;
      await dispatch(
        deleteSingleAssignment({ id: selectedAssignment.id }),
      ).unwrap();
    } catch (err) {
      console.error("Failed to delete assignments:", err);
    }
  };

  return {
    deleteAssignment,
    loading,
    error,
  };
}
