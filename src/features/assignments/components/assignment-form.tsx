import { useEffect } from "react";
import { type UseFormReturn } from "react-hook-form";
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

import { useAssetList } from "../hooks/useAssetList";
import { useUserList } from "../hooks/useUserList";
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

export function AssignmentForm({
  form,
  onSubmit,
  onCancel,
  initialUser,
  initialAsset,
}: {
  form: UseFormReturn<z.infer<typeof assignmentFormSchema>>;
  onSubmit: (data: z.infer<typeof assignmentFormSchema>) => void;
  onCancel?: () => void;
  initialUser?: User;
  initialAsset?: Asset;
}) {
  const {
    selectedAsset,
    setSelectedAsset,
    setAssetsPage,
    setAssetsPageSize,
    setAssetsSort,
    setAssetsSearchTerm,
    assetInputOpened,
    setAssetInputOpened,
    assets,
    totalAssets,
    assetsLoading,
    assetsSort,
  } = useAssetList(initialAsset);

  const {
    selectedUser,
    setSelectedUser,
    setUsersPage,
    setUsersPageSize,
    setUsersSort,
    setUsersSearchTerm,
    userInputOpened,
    setUserInputOpened,
    users,
    totalUsers,
    usersLoading,
    usersSort,
  } = useUserList(initialUser);

  function onUserSave(row: User | undefined) {
    setSelectedUser(row ?? undefined);
    form.setValue("staffCode", row?.staffCode ?? "");
    setUserInputOpened(false);
  }

  function onAssetSave(row: Asset | undefined) {
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
    if (selectedAsset) {
      form.setValue("assetCode", selectedAsset.assetCode, {
        shouldValidate: true,
      });
    }
  }, [form, selectedAsset]);

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
                    sendPage={setUsersPage}
                    sendSort={setUsersSort}
                    sendPageSize={setUsersPageSize}
                    sendSearchTerm={setUsersSearchTerm}
                    onSave={onUserSave}
                    onCancel={() => setUserInputOpened(false)}
                    selectedRow={selectedUser}
                    initialSort={usersSort?.id || ""}
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
                    sendPage={setAssetsPage}
                    sendSort={setAssetsSort}
                    sendPageSize={setAssetsPageSize}
                    sendSearchTerm={setAssetsSearchTerm}
                    onSave={onAssetSave}
                    onCancel={() => setAssetInputOpened(false)}
                    selectedRow={selectedAsset}
                    initialSort={assetsSort?.id || ""}
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
                  disablePastDates={true}
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
