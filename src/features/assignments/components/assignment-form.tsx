import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/dashboard-elements";
import { Form, FormField } from "@/components/ui/form";
import { OneLineFormControl } from "@/components/ui/form-controls";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { User } from "@/features/users/types/User";
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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState<{ id: string; desc: boolean } | null>({
    id: "",
    desc: false,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userInputOpened, setUserInputOpened] = useState(false);

  const usersOrderBy = sort
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
          orderBy: usersOrderBy,
        }),
      ).unwrap();
      console.info("Users fetched successfully", response);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  }, [dispatch, usersOrderBy, page, pageSize, searchTerm]);

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
    if (row) {
      form.setValue("staffCode", row.staffCode);
      setUserInputOpened(false);
    }
  }

  function onUserInputClose() {
    setUserInputOpened(false);
  }

  useEffect(() => {
    if (isUserInputOpened) {
      fetchUsersData();
    }
  }, [fetchUsersData, isUserInputOpened]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="staffCode"
          render={({ field }) => (
            <OneLineFormControl label="User">
              <Popover
                open={userInputOpened}
                onOpenChange={setUserInputOpened}
                modal
              >
                <PopoverTrigger asChild>
                  <SearchInput className="cursor-pointer" readOnly {...field} />
                </PopoverTrigger>
                <PopoverContent
                  className="w-2xl max-w-full"
                  align="end"
                  sideOffset={-55}
                  alignOffset={-20}
                >
                  <SearchPopup<User>
                    title="Select User"
                    columns={userColumns}
                    data={users}
                    total={total}
                    loading={loading}
                    sendPage={getPage}
                    sendSort={getSort}
                    sendPageSize={getPageSize}
                    sendSearchTerm={getSearchTerm}
                    onSave={onUserSelect}
                    onCancel={onUserInputClose}
                  />
                </PopoverContent>
              </Popover>
            </OneLineFormControl>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          {/* TODO: separate this? */}
          <Button
            id="assignment-form-save"
            type="submit"
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
    </Form>
  );
}
