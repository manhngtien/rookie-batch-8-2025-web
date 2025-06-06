import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/store";
import { returnSingleAssignment } from "@/store/thunks/assignmentThunk";

import type { Assignment } from "../types/Assignment";

export function useReturnAssignment(selectedAssignment: Assignment | null) {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector(
    (state: RootState) => state.assignments,
  );

  const returnAssignment = async () => {
    try {
      if (!selectedAssignment) return;
      await dispatch(
        returnSingleAssignment({ id: selectedAssignment.id }),
      ).unwrap();
    } catch (err) {
      console.error("Failed to return assignments:", err);
    }
  };

  return {
    returnAssignment,
    loading,
    error,
  };
}
