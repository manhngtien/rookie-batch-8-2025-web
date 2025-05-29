import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/dashboard-elements";
import { Form, FormField } from "@/components/ui/form";
import { OneLineFormControl } from "@/components/ui/form-controls";
import type { AppDispatch, RootState } from "@/store";
import { fetchUsers } from "@/store/thunks/userThunk";

import { SearchPopup } from "./search-popup";
import { userColumns } from "./user-select-columns";

const formSchema = z.object({
  staffCode: z.string().min(2),
});

export function CreateAssignmentForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel?: () => void;
}) {
  const [selectedStaffCode, setSelectedStaffCode] = useState<string | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [sort, setSort] = useState<{ id: string; desc: boolean } | null>({
    id: "fullName",
    desc: false,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userInputOpened, setUserInputOpened] = useState(false);

  const orderBy = sort
    ? `${sort.id}${sort.desc ? "desc" : "asc"}`.toLowerCase()
    : "fullnameasc";

  const isUserInputOpened = userInputOpened === true;

  const dispatch = useDispatch<AppDispatch>();
  const { users, total, loading /* , error */ } = useSelector(
    (state: RootState) => state.users,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      staffCode: "",
    },
  });

  const fetchUsersData = useCallback(async () => {
    try {
      const response = await dispatch(
        fetchUsers({
          page,
          pageSize,
          searchTerm,
          orderBy,
        }),
      ).unwrap();
      console.info("Users fetched successfully", response);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  }, [dispatch, orderBy, page, pageSize, searchTerm]);

  function getSearchTerm(value: string) {
    setSearchTerm(value);
  }

  function handleRowSelect(staffCode: string) {
    setSelectedStaffCode(staffCode);
  }

  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData, isUserInputOpened]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="staffCode"
          render={
            (/*{ field }*/) => (
              <OneLineFormControl label="User">
                <SearchInput
                  className="cursor-pointer"
                  readOnly
                  onClick={() => setUserInputOpened(!userInputOpened)}
                />
              </OneLineFormControl>
            )
          }
        />

        <div className="flex justify-end gap-3 pt-4">
          {/* TODO: separate this? */}
          <Button
            id="assignment-form-save"
            type="submit"
            className="bg-red-600 text-white hover:bg-red-700"
            // disabled={!isFormComplete()}
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

      {userInputOpened && (
        <SearchPopup
          data={users}
          debouncedSearchTerm={getSearchTerm}
          loading={loading}
          total={total}
          page={page}
          setPage={setPage}
          setSort={setSort}
          pageSize={pageSize}
          title="Select User"
          columns={userColumns(selectedStaffCode, handleRowSelect)}
          handleRowSelect={(row) => {
            handleRowSelect(row.staffCode);
          }}
        />
      )}
    </Form>
  );
}
