import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GeneralDialog from "@/components/general-dialog";
import {
  DateSelector,
  FilterButton,
  SearchInput,
} from "@/components/ui/dashboard-elements";
import { DataTable } from "@/components/ui/data-table";
import { requestColumns } from "@/features/requests/components/request_columns";
import type Request from "@/features/requests/types/Request";
import { RequestState } from "@/features/requests/types/Request";
import { revertLabel } from "@/lib/utils";
import type { AppDispatch, RootState } from "@/store";
import {
  changeToCancel,
  changeToCompleted,
  fetchRequests,
} from "@/store/thunks/requestThunk";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
const filterItems = ["Completed", "Waiting for returning"];
export default function RequestPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { requests, total, loading, error } = useSelector(
    (state: RootState) => state.requests,
  );
  const [returnedDateFilter, setReturnedDateFilter] = useState<Date | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [sort, setSort] = useState<{ id: string; desc: boolean } | null>({
    id: "assetName",
    desc: false,
  });
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [openDialogConfirm, setOpenDialogConfirm] = useState<boolean>(false);
  const [openDialogCancel, setOpenDialogCancel] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const orderBy = sort
    ? `${sort.id}${sort.desc ? "Desc" : "Asc"}`
    : "assetNameAsc";
  const initialState = {
    sorting: sort ? [sort] : [{ id: "assetName", desc: false }],
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
  };

  const handleFilterChange = useCallback((selected: string[]) => {
    setSelectedStates(selected);
    setPage(1);
  }, []);

  const confirmComplete = async () => {
    if (selectedRequest === null) return;
    try {
      const response = await dispatch(
        changeToCompleted({
          returningRequestId: selectedRequest.id.toString(),
        }),
      );
      console.info("Users fetched successfully", response);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
    setSelectedRequest(null);
    setRefresh((prev) => !prev);
    setOpenDialogConfirm(false);
  };
  const confirmCancel = async () => {
    if (selectedRequest === null) return;
    try {
      const response = await dispatch(
        changeToCancel({ returningRequestId: selectedRequest.id.toString() }),
      );
      console.info("Users fetched successfully", response);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
    setSelectedRequest(null);
    setRefresh((prev) => !prev);
    setOpenDialogCancel(false);
  };
  useEffect(() => {
    const fetchRequestsData = async () => {
      try {
        const response = await dispatch(
          fetchRequests({
            pageNumber: page,
            pageSize,
            state: selectedStates.map((label) =>
              revertLabel(label, RequestState),
            ),
            searchTerm: debouncedSearchTerm,
            orderBy,
            returnedDate: returnedDateFilter,
          }),
        ).unwrap();
        console.info("Users fetched successfully", response);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchRequestsData();
  }, [
    dispatch,
    refresh,
    page,
    pageSize,
    returnedDateFilter,
    selectedStates,
    debouncedSearchTerm,
    orderBy,
  ]);
  const requestCol = requestColumns(
    (selectedRequest: Request) => {
      setSelectedRequest(selectedRequest);
      setOpenDialogConfirm(true);
    },
    (selectedRequest: Request) => {
      setSelectedRequest(selectedRequest);
      setOpenDialogCancel(true);
    },
  );
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-red-600">Request List</h1>

      <div className="mb-4 flex items-center justify-start space-x-4">
        <div className="flex w-full gap-2">
          <FilterButton
            label="State"
            options={filterItems}
            onChange={handleFilterChange}
            defaultSelected={selectedStates}
          />
          <DateSelector
            selectedDate={returnedDateFilter}
            setSelectedDate={setReturnedDateFilter}
            title="Returned Date"
            disableFutureDates={false}
          />
        </div>
        <div className="relative w-50 text-black">
          <SearchInput
            id="assignment-search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {error && <p className="text-red-500">Error: {error}</p>}
      {!error && (
        <DataTable
          onPageChange={(pageIndex) => setPage(pageIndex + 1)}
          onSortingChange={(sort) => {
            setSort(sort);
            setPage(1);
          }}
          initialState={initialState}
          total={total}
          columns={requestCol}
          data={requests}
          loading={loading}
        />
      )}

      <GeneralDialog
        confirmButtonTitle="Yes"
        onConfirm={confirmComplete}
        content
        description='Are you sure you want to mark this returning request as "Completed"'
        header="Confirm Return"
        isOpen={openDialogConfirm}
        onClose={() => setOpenDialogConfirm(false)}
      />
      <GeneralDialog
        confirmButtonTitle="Yes"
        onConfirm={confirmCancel}
        content
        description="Are you sure you want to cancel this returning request"
        header="Cancel Return"
        isOpen={openDialogCancel}
        onClose={() => setOpenDialogCancel(false)}
      />
    </div>
  );
}
