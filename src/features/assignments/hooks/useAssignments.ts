import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useDebounce } from "@/hooks/useDebounce";
import { revertLabel } from "@/lib/utils";
import type { AppDispatch, RootState } from "@/store";
import { fetchAssignments } from "@/store/thunks/assignmentThunk";

import { assignmentStateMap } from "../types/Assignment";

export function useAssignments() {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [sort, setSort] = useState<{ id: string; desc: boolean } | null>({
    id: "assetName",
    desc: false,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const { data, total, loading, error } = useSelector(
    (state: RootState) => state.assignments,
  );

  const orderBy = sort
    ? `${sort.id}${sort.desc ? "desc" : "asc"}`.toLowerCase()
    : "assetnameasc";

  const initialState = {
    sorting: sort ? [sort] : [{ id: "assetName", desc: false }],
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
  };

  const debouncedSearchTerm = useDebounce(searchTerm);

  const fetchData = useCallback(async () => {
    try {
      await dispatch(
        fetchAssignments({
          pageNumber: page,
          pageSize,
          assignedDate: selectedDate,
          searchTerm: debouncedSearchTerm,
          orderBy,
          state: selectedStates.map((state) =>
            revertLabel(state, assignmentStateMap),
          ),
        }),
      ).unwrap();
    } catch (err) {
      console.error("Failed to fetch assignments:", err);
    }
  }, [
    debouncedSearchTerm,
    dispatch,
    orderBy,
    page,
    pageSize,
    selectedDate,
    selectedStates,
  ]);

  return {
    data,
    total,
    loading,
    error,
    page,
    setPage,
    pageSize,
    sort,
    setSort,
    selectedDate,
    setSelectedDate,
    searchTerm,
    setSearchTerm,
    selectedStates,
    setSelectedStates,
    initialState,
    fetchData,
  };
}
