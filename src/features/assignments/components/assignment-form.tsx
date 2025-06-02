import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DateSelector, SearchInput } from "@/components/ui/dashboard-elements";
import { Form, FormField } from "@/components/ui/form";
import { OneLineFormControl } from "@/components/ui/form-controls";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import type { Asset } from "@/features/asset-management/types/Asset";
import type { User } from "@/features/users/types/User";
import type { AppDispatch, RootState } from "@/store";
import { fetchAssetsByParams } from "@/store/thunks/assetThunk";
import { fetchUsers } from "@/store/thunks/userThunk";

import { assetSelectColumns } from "./asset-select-columns";
import { SearchPopup } from "./search-popup";
import { userSelectColumns } from "./user-select-columns";

const POPOVER_SIDE_OFFSET = -55;
const POPOVER_ALIGN_OFFSET = -20;

// eslint-disable-next-line react-refresh/only-export-components
export const assignmentFormSchema = z.object({
  staffCode: z.string().min(1, "User is required"),
  assetCode: z.string().min(1, "Asset is required"),
  assignedDate: z.date().refine(
    (date) => {
      const now = new Date();
      now.setHours(0, 0, 0, 0); // set to local midnight
      const picked = new Date(date);
      picked.setHours(0, 0, 0, 0); // set to local midnight
      return picked >= now;
    },
    {
      message: "Date must be today or later",
    },
  ),
  note: z.string().optional(),
});

export function CreateAssignmentForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: z.infer<typeof assignmentFormSchema>) => void;
  onCancel?: () => void;
}) {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>(
    undefined,
  );

  // Pagination and sorting states
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState<{ id: string; desc: boolean } | null>({
    id: "",
    desc: false,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [userInputOpened, setUserInputOpened] = useState(false);
  const [assetInputOpened, setAssetInputOpened] = useState(false);

  const usersOrderBy = sort
    ? `${sort.id}${sort.desc ? "desc" : "asc"}`.toLowerCase()
    : "fullnameasc";
  const assetsOrderBy = sort
    ? `${sort.id}${sort.desc ? "desc" : "asc"}`.toLowerCase()
    : "assetnameasc";

  const isUserInputOpened = userInputOpened === true;
  const isAssetInputOpened = assetInputOpened === true;

  const dispatch = useDispatch<AppDispatch>();
  const {
    users,
    total: totalUsers,
    loading: usersLoading,
    // error: usersError,
  } = useSelector((state: RootState) => state.users);
  const {
    assets,
    total: totalAssets,
    loading: assetsLoading,
    // error: assetsError,
  } = useSelector((state: RootState) => state.assets);

  const form = useForm<z.infer<typeof assignmentFormSchema>>({
    resolver: zodResolver(assignmentFormSchema),
    defaultValues: {
      staffCode: "",
      assetCode: "",
    },
  });

  const fetchUsersData = useCallback(async () => {
    try {
      const response = await dispatch(
        fetchUsers({
          page,
          pageSize,
          searchTerm,
          orderBy: usersOrderBy,
        }),
      ).unwrap();
      console.info("Users fetched successfully", response);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  }, [dispatch, usersOrderBy, page, pageSize, searchTerm]);

  const fetchAssetData = useCallback(async () => {
    try {
      const response = await dispatch(
        fetchAssetsByParams({
          pageNumber: page,
          pageSize,
          searchTerm,
          state: "available",
          orderBy: assetsOrderBy,
        }),
      ).unwrap();
      console.info("Users fetched successfully", response);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  }, [dispatch, page, pageSize, searchTerm, assetsOrderBy]);

  function getSearchTerm(value: string) {
    setSearchTerm(value);
  }

  function getPage(value: number) {
    setPage(value);
  }

  function getSort(value: { id: string; desc: boolean } | null) {
    setSort(value);
  }

  function getPageSize(value: number) {
    setPageSize(value);
  }

  function onUserSelect(row: User | undefined) {
    setSelectedUser(row ?? undefined);
    form.setValue("staffCode", row?.staffCode ?? "");
    setUserInputOpened(false);
  }

  function onAssetSelect(row: Asset | undefined) {
    setSelectedAsset(row ?? undefined);
    form.setValue("assetCode", row?.assetCode ?? "");
    setAssetInputOpened(false);
  }

  const isFormComplete = () => {
    const values = form.getValues();
    const requiredFields = ["staffCode", "assetCode", "assignedDate"];

    const allFieldsFilled = requiredFields.every(
      (field) => values[field as keyof typeof values],
    );

    return allFieldsFilled;
  };

  useEffect(() => {
    if (isUserInputOpened) {
      fetchUsersData();
    }
  }, [fetchUsersData, isUserInputOpened]);

  useEffect(() => {
    if (isAssetInputOpened) {
      fetchAssetData();
    }
  }, [fetchAssetData, isAssetInputOpened]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-black"
      >
        <FormField
          control={form.control}
          name="staffCode"
          render={() => (
            <OneLineFormControl label="User">
              <Popover
                open={userInputOpened}
                onOpenChange={setUserInputOpened}
                modal
              >
                <PopoverTrigger asChild>
                  <SearchInput
                    id="assignment-user-input"
                    value={selectedUser ? selectedUser.fullName : ""}
                    className="cursor-pointer text-left"
                    readOnly
                  />
                </PopoverTrigger>
                <PopoverContent
                  className="w-2xl max-w-full"
                  side="top"
                  align="end"
                  sideOffset={POPOVER_SIDE_OFFSET}
                  alignOffset={POPOVER_ALIGN_OFFSET}
                >
                  <SearchPopup<User>
                    title="Select User"
                    columns={userSelectColumns}
                    data={users}
                    total={totalUsers}
                    loading={usersLoading}
                    sendPage={getPage}
                    sendSort={getSort}
                    sendPageSize={getPageSize}
                    sendSearchTerm={getSearchTerm}
                    onSave={onUserSelect}
                    onCancel={() => setUserInputOpened(false)}
                    selectedRow={selectedUser}
                  />
                </PopoverContent>
              </Popover>
            </OneLineFormControl>
          )}
        />

        <FormField
          control={form.control}
          name="assetCode"
          render={() => (
            <OneLineFormControl label="Asset">
              <Popover
                open={assetInputOpened}
                onOpenChange={setAssetInputOpened}
                modal
              >
                <PopoverTrigger asChild>
                  <SearchInput
                    id="assignment-asset-input"
                    className="cursor-pointer text-left"
                    value={selectedAsset ? selectedAsset.assetName : ""}
                    readOnly
                  />
                </PopoverTrigger>
                <PopoverContent
                  className="w-2xl max-w-full"
                  side="top"
                  align="end"
                  sideOffset={POPOVER_SIDE_OFFSET}
                  alignOffset={POPOVER_ALIGN_OFFSET}
                >
                  <SearchPopup<Asset>
                    title="Select Asset"
                    columns={assetSelectColumns}
                    data={assets}
                    total={totalAssets}
                    loading={assetsLoading}
                    sendPage={getPage}
                    sendSort={getSort}
                    sendPageSize={getPageSize}
                    sendSearchTerm={getSearchTerm}
                    onSave={onAssetSelect}
                    onCancel={() => setAssetInputOpened(false)}
                    selectedRow={selectedAsset}
                  />
                </PopoverContent>
              </Popover>
            </OneLineFormControl>
          )}
        />

        <FormField
          control={form.control}
          name="assignedDate"
          render={({ field }) => (
            <OneLineFormControl label="Assigned Date">
              <div className="w-full">
                <DateSelector
                  selectedDate={field.value}
                  setSelectedDate={field.onChange}
                  title=""
                  className="w-full !max-w-full"
                  disableFutureDates={false}
                  defaultToToday={true}
                />
              </div>
            </OneLineFormControl>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => {
            return (
              <OneLineFormControl label="Note">
                <Textarea id="assignment-notes" className="" {...field} />
              </OneLineFormControl>
            );
          }}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button
            id="assignment-form-save"
            type="submit"
            disabled={!isFormComplete()}
          >
            Save
          </Button>
          <Button
            id="assignment-form-cancel"
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
