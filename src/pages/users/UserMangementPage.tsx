import { Funnel, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PageTitle } from "@/components/ui/dashboard-elements";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { userColumns } from "@/features/users/components/user-columns";
import UserDetailDialog from "@/features/users/components/user-detail-dialog";
import type { User } from "@/features/users/types/User";
import type { AppDispatch, RootState } from "@/store";
import { fetchUsers } from "@/store/thunks/userThunk";

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

function UserManagementPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { users, total, loading, error } = useSelector(
    (state: RootState) => state.users,
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "All",
    "Admin",
    "Staff",
  ]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [sort, setSort] = useState<{ id: string; desc: boolean } | null>({
    id: "fullName",
    desc: false,
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const orderBy = sort
    ? `${sort.id}${sort.desc ? "desc" : "asc"}`.toLowerCase()
    : "fullnameasc";

  // Memoize initialState to prevent resetting table state
  const initialState = useMemo(
    () => ({
      sorting: sort ? [sort] : [{ id: "fullName", desc: false }],
      pagination: {
        pageIndex: page - 1,
        pageSize,
      },
    }),
    [sort, page, pageSize],
  );

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const typeParam = selectedTypes.includes("All")
          ? undefined
          : selectedTypes;
        const response = await dispatch(
          fetchUsers({
            page,
            pageSize,
            type: typeParam,
            searchTerm: debouncedSearchTerm,
            orderBy,
          }),
        ).unwrap();
        console.info("Users fetched successfully", response);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsersData();
  }, [dispatch, page, pageSize, selectedTypes, debouncedSearchTerm, orderBy]);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) => {
      if (type === "All") {
        if (prev.includes("All")) {
          return [];
        }
        return ["All", "Admin", "Staff"];
      }

      let newTypes = prev.includes(type)
        ? prev.filter((t) => t !== type && t !== "All")
        : [...prev, type];

      if (newTypes.includes("Admin") && newTypes.includes("Staff")) {
        newTypes = ["All", "Admin", "Staff"];
      }

      return newTypes;
    });
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      <PageTitle>User List</PageTitle>
      <div className="flex items-center justify-between space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="user-type-dropdown"
              variant="outline"
              className="w-[180px] justify-between text-black hover:cursor-pointer"
            >
              Type
              <span>
                <Funnel color="black" />
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[180px] p-2">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="all"
                  checked={selectedTypes.includes("All")}
                  onCheckedChange={() => handleTypeChange("All")}
                />
                <label htmlFor="all">All</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="admin"
                  checked={selectedTypes.includes("Admin")}
                  onCheckedChange={() => handleTypeChange("Admin")}
                />
                <label htmlFor="admin">Admin</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="staff"
                  checked={selectedTypes.includes("Staff")}
                  onCheckedChange={() => handleTypeChange("Staff")}
                />
                <label htmlFor="staff">Staff</label>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex gap-2">
          <div className="relative w-50">
            <Input
              id="users-search-bar"
              className=""
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
            <Search className="pointer-events-none absolute top-2.5 right-2.5 h-4 w-4 opacity-50" />
          </div>
          <Button
            id="create-new-user-button"
            onClick={() => {
              navigate("/users/create-user");
            }}
            className="bg-red-600 text-white hover:cursor-pointer hover:bg-red-700"
          >
            Create new user
          </Button>
        </div>
      </div>

      {error && <p className="text-center text-red-600">Error: {error}</p>}
      <DataTable
        columns={userColumns}
        data={users}
        total={total}
        loading={loading}
        handleRowClick={(user) => handleRowClick(user)}
        initialState={initialState}
        onPageChange={(pageIndex) => setPage(pageIndex + 1)}
        onSortingChange={(sort) => {
          setSort(sort);
          setPage(1);
        }}
      />

      {selectedUser && (
        <UserDetailDialog selectedUser={selectedUser} closeModal={closeModal} />
      )}
    </div>
  );
}

export default UserManagementPage;
