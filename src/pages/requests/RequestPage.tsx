import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Calendar, Check, ChevronDown, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import GeneralDialog from "@/components/general-dialog";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import type Request from "@/features/requests/Type";
import { initialRequests, State } from "@/features/requests/Type";

export default function RequestPage() {
  const [requestsList] = useState<Request[]>(initialRequests);
  const [filteredRequests, setFilteredRequests] =
    useState<Request[]>(initialRequests);
  const [returnedDateFilter, setReturnedDateFilter] = useState<Date | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [openDialogConfirm, setOpenDialogConfirm] = useState<boolean>(false);
  const [openDialogCancel, setOpenDialogCancel] = useState<boolean>(false);
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedState(null);
    setReturnedDateFilter(null);
  };
  useEffect(() => {
    let result = [...requestsList];
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
      const filterDate = format(returnedDateFilter, "dd/MM/yyyy");
      result = result.filter((request) => request.returnedDate === filterDate);
    }
    if (selectedState) {
      result = result.filter((request) => request.state === selectedState);
    }
    setFilteredRequests(result);
  }, [requestsList, searchQuery, selectedState, returnedDateFilter]);

  return (
    <div className="mx-auto p-6 text-black">
      <h1 className="mb-6 text-2xl font-bold text-red-600">Request List</h1>

      <div className="mb-6 flex flex-wrap justify-between">
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <select
              value={selectedState || ""}
              onChange={(e) => setSelectedState(e.target.value)}
              className="appearance-none rounded border border-gray-300 bg-white px-3 py-2 pr-8"
            >
              <option>State</option>
              <option value={State.Completed}>{State.Completed}</option>
              <option value={State.WaitingForReturning}>
                {State.WaitingForReturning}
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <ChevronDown className="text-gray-500" />
            </div>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-between">
                {returnedDateFilter
                  ? format(returnedDateFilter, "dd/MM/yyyy")
                  : "Returned Date"}
                <Calendar className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto rounded-md bg-white p-0 shadow-md"
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
          {(selectedState || returnedDateFilter) && (
            <Button
              variant="ghost"
              onClick={resetFilters}
              className="text-red-600"
            >
              Reset Filters
            </Button>
          )}
        </div>

        <div className="relative">
          <input
            value={searchQuery}
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="rounded border border-gray-300 px-3 py-2 pr-8"
          />
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <button>
              <Search className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full border border-gray-200 bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b px-4 py-2 text-left">
                <div className="flex items-center">
                  No. <ChevronDown className="text-gray-500" />
                </div>
              </th>
              <th className="border-b px-4 py-2 text-left">
                <div className="flex items-center">
                  Asset Code <ChevronDown className="text-gray-500" />
                </div>
              </th>
              <th className="border-b px-4 py-2 text-left">
                <div className="flex items-center">
                  Asset Name <ChevronDown className="text-gray-500" />
                </div>
              </th>
              <th className="border-b px-4 py-2 text-left">
                <div className="flex items-center">
                  Requested by <ChevronDown className="text-gray-500" />
                </div>
              </th>
              <th className="border-b px-4 py-2 text-left">
                <div className="flex items-center">
                  Assigned Date <ChevronDown className="text-gray-500" />
                </div>
              </th>
              <th className="border-b px-4 py-2 text-left">
                <div className="flex items-center">
                  Accepted by <ChevronDown className="text-gray-500" />
                </div>
              </th>
              <th className="border-b px-4 py-2 text-left">
                <div className="flex items-center">
                  Returned Date <ChevronDown className="text-gray-500" />
                </div>
              </th>
              <th className="border-b px-4 py-2 text-left">
                <div className="flex items-center">
                  State <ChevronDown className="text-gray-500" />
                </div>
              </th>
              <th className="border-b px-4 py-2 text-center" colSpan={2}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr className="hover:bg-gray-50">
                <td className="border-b px-4 py-2">{request.id}</td>
                <td className="border-b px-4 py-2">{request.assetCode}</td>
                <td className="border-b px-4 py-2">{request.assetName}</td>
                <td className="border-b px-4 py-2">{request.requestedBy}</td>
                <td className="border-b px-4 py-2">{request.assignedDate}</td>
                <td className="border-b px-4 py-3 whitespace-nowrap">
                  {request.acceptedBy || ""}
                </td>
                <td className="border-b px-4 py-3 whitespace-nowrap">
                  {request.returnedDate || ""}
                </td>
                <td className="border-b px-4 py-3 whitespace-nowrap">
                  {request.state}
                </td>
                <td className="border-b px-2 py-2 text-center">
                  <button
                    onClick={() => setOpenDialogConfirm(true)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Check />
                  </button>
                </td>
                <td className="border-b px-2 py-2 text-center">
                  <button
                    onClick={() => setOpenDialogCancel(true)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <GeneralDialog
        content
        description='Are you sure you want to mark this returning request as "Completed"'
        header="Confirm Return"
        isOpen={openDialogConfirm}
        onClose={() => setOpenDialogConfirm(false)}
      />
      <GeneralDialog
        content
        description="Are you sure you want to cancel this returning request"
        header="Cancel Return"
        isOpen={openDialogCancel}
        onClose={() => setOpenDialogCancel(false)}
      />
    </div>
  );
}
