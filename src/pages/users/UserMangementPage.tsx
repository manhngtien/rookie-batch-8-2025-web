// src/features/users/components/UserManagementPage.tsx
import { Funnel, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { userColumns } from "@/features/users/components/user-columns";
import UserDetailDialog from "@/features/users/components/user-detail-dialog";
import type { Location, User, UserType } from "@/features/users/types/User";
import type { AppDispatch, RootState } from "@/store";
import { fetchUsers } from "@/store/thunks/userThunk";

function UserManagementPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users,
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["All"]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    dispatch(fetchUsers());
    console.log(users);
  }, [dispatch]);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const getUserTypeLabel = (type: UserType) => {
    switch (type) {
      case 1:
        return "Staff";
      case 2:
        return "Admin";
      default:
        return "Unknown";
    }
  };

  const getLocationLabel = (location: Location) => {
    switch (location) {
      case 1:
        return "HCM";
      case 2:
        return "HN";
      case 3:
        return "DN";
      default:
        return "Unknown";
    }
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev.filter((t) => t !== "All"), type],
    );
  };

  // Filter users based on type and search term
  const filteredUsers = users.filter((user) => {
    const typeMatch =
      selectedTypes.includes("All") ||
      selectedTypes.includes(getUserTypeLabel(user.type));
    const searchMatch =
      searchTerm === "" ||
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.staffCode.toLowerCase().includes(searchTerm.toLowerCase());
    return typeMatch && searchMatch;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold text-red-600">User List</h1>
      <div className="mb-4 flex items-center justify-between space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
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
              className=""
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="pointer-events-none absolute top-2.5 right-2.5 h-4 w-4 opacity-50" />
          </div>
          <Button
            onClick={() => {
              navigate("/users/create-user");
            }}
            className="bg-red-600 text-white hover:cursor-pointer hover:bg-red-700"
          >
            Create new user
          </Button>
        </div>
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!loading && !error && (
        <DataTable
          columns={userColumns}
          data={filteredUsers}
          handleRowClick={(user) => handleRowClick(user)}
        />
      )}

      {selectedUser && (
        <UserDetailDialog
          selectedUser={selectedUser}
          closeModal={closeModal}
          getUserTypeLabel={getUserTypeLabel}
          getLocationLabel={getLocationLabel}
        />
      )}
    </div>
  );
}

export default UserManagementPage;
