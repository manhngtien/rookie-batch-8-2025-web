import { format } from "date-fns";
import { Calendar, Funnel, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GeneralDialog from "@/components/general-dialog";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { requestColumns } from "@/features/requests/components/request_columns";
import type Request from "@/features/requests/types/Request";
import type { AppDispatch, RootState } from "@/store";
import { fetchRequests } from "@/store/thunks/requestThunk";

export default function RequestPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { requests, loading, error } = useSelector(
    (state: RootState) => state.requests,
  );
  const [filteredRequests, setFilteredRequests] = useState<Request[]>(requests);
  const [returnedDateFilter, setReturnedDateFilter] = useState<Date | null>(
    null,
  );
  // const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStates, setSelectedStates] = useState<string[]>([""]);
  const [openDialogConfirm, setOpenDialogConfirm] = useState<boolean>(false);
  const [openDialogCancel, setOpenDialogCancel] = useState<boolean>(false);
  function handleStateCheck(state: string) {
    if (!selectedStates.includes(state))
      setSelectedStates((prev) => [...prev, state]);
    else setSelectedStates((prev) => prev.filter((s) => s !== state));
  }
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedStates([""]);
    setReturnedDateFilter(null);
  };
  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  useEffect(() => {
    let result = [...requests];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (request) =>
          request.assetCode.toLowerCase().includes(query) ||
          request.assetName.toLowerCase().includes(query) ||
          request.requestedBy.toLowerCase().includes(query),
      );
    }
    if (returnedDateFilter) {
      result = result.filter(
        (request) => request.returnedDate === returnedDateFilter,
      );
    }
    if (selectedStates.length > 1) {
      result = result.filter((request) =>
        selectedStates.includes(request.state),
      );
    }
    setFilteredRequests(result);
  }, [requests, searchQuery, selectedStates, returnedDateFilter]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold text-red-600">Request List</h1>

      <div className="mb-4 flex items-center justify-start space-x-4">
        <div className="space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="return-state-dropdown"
                variant="outline"
                className="w-[180px] justify-between text-black hover:cursor-pointer"
              >
                Type
                <span>
                  <Funnel color="black" />
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="z-10 w-[180px] bg-white p-2">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="completed"
                    checked={selectedStates?.includes("Completed")}
                    onCheckedChange={() => handleStateCheck("Completed")}
                  />
                  <label htmlFor="completed">Completed</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wtfr"
                    checked={selectedStates?.includes("Waiting for returning")}
                    onCheckedChange={() =>
                      handleStateCheck("Waiting for returning")
                    }
                  />
                  <label htmlFor="wtfr">Waiting for return</label>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="returned-date-filter"
                variant="outline"
                className="w-[180px] justify-between"
              >
                {returnedDateFilter
                  ? format(returnedDateFilter, "dd/MM/yyyy")
                  : "Returned Date"}
                <Calendar className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="z-10 w-auto rounded-md bg-white p-0 text-black shadow-md"
              align="start"
            >
              <CalendarComponent
                mode="single"
                onSelect={(date) => setReturnedDateFilter(date ?? null)}
                selected={returnedDateFilter || undefined}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {(selectedStates.length > 1 || returnedDateFilter) && (
            <Button
              id="reset-fillter-button"
              variant="ghost"
              onClick={resetFilters}
              className="text-red-600"
            >
              Reset Filters
            </Button>
          )}
        </div>
        <div className="relative w-50 text-black">
          <Input
            id="return-request-search-bar"
            onChange={(e) => setSearchQuery(e.target.value)}
            className=""
            placeholder="Search..."
          />

          <Search className="pointer-events-none absolute top-2.5 right-2.5 h-4 w-4 opacity-50" />
        </div>
      </div>

      {loading && <p>Loading assets...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <DataTable
          total={-1}
          columns={requestColumns}
          data={filteredRequests}
        />
      )}

      <GeneralDialog
        onConfirm={() => {}}
        content
        description='Are you sure you want to mark this returning request as "Completed"'
        header="Confirm Return"
        isOpen={openDialogConfirm}
        onClose={() => setOpenDialogConfirm(false)}
      />
      <GeneralDialog
        onConfirm={() => {}}
        content
        description="Are you sure you want to cancel this returning request"
        header="Cancel Return"
        isOpen={openDialogCancel}
        onClose={() => setOpenDialogCancel(false)}
      />
    </div>
  );
}
