import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, CircleX, Pencil } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import UserDetailDialog from "./UserDetailDialog";
import { users } from "../types/fakeData";
import { Button } from "@/components/ui/button";

import type { User, Location, UserType } from "@/features/users/types/User";

const UserDataTable = () => {
  const itemsPerPage = 10;
  const [currentPage] = React.useState(1);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("Edit button clicked");
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("Delete button clicked");
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

  return (
    <div className="overflow-x-auto">
      <Table className="text-black">
        <TableHeader>
          <TableRow className="border-b-white bg-gray-100">
            <TableHead className="border p-2 text-left text-black">
              Staff Code
            </TableHead>
            <TableHead className="border p-2 text-left text-black">
              <div className="flex items-center gap-2 p-2">
                Full Name
                <span>
                  <ChevronDown size={20} />
                </span>
              </div>
            </TableHead>
            <TableHead className="border p-2 text-left text-black">
              <div className="flex items-center gap-2 p-2">
                Username
                <span>
                  <ChevronDown size={20} />
                </span>
              </div>
            </TableHead>
            <TableHead className="border p-2 text-left text-black">
              <div className="flex items-center gap-2 p-2">
                Joined Date
                <span>
                  <ChevronDown size={20} />
                </span>
              </div>
            </TableHead>
            <TableHead className="border p-2 text-left text-black">
              <div className="flex items-center gap-2 p-2">
                Type
                <span>
                  <ChevronDown size={20} />
                </span>
              </div>
            </TableHead>
            <TableHead className="bg-white p-2"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user) => (
            <TableRow
              className="group border-none hover:cursor-pointer hover:bg-transparent"
              key={user.staffCode}
              onClick={() => handleRowClick(user)}
            >
              <TableCell className="group-hover:bg-muted/50 border p-4">
                {user.staffCode}
              </TableCell>
              <TableCell className="group-hover:bg-muted/50 border p-4">
                {`${user.firstName} ${user.lastName}`}
              </TableCell>
              <TableCell className="group-hover:bg-muted/50 border p-4">
                {user.username}
              </TableCell>
              <TableCell className="group-hover:bg-muted/50 border p-4">
                {user.joinedDate}
              </TableCell>
              <TableCell className="group-hover:bg-muted/50 border p-4">
                {getUserTypeLabel(user.type)}
              </TableCell>
              <TableCell className="p-4 group-hover:bg-transparent">
                <div className="flex gap-4">
                  <button
                    className="duration-200 hover:scale-120 hover:cursor-pointer"
                    onClick={handleEditClick}
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    className="duration-200 hover:scale-120 hover:cursor-pointer"
                    onClick={handleDeleteClick}
                  >
                    <CircleX size={20} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4 flex justify-end text-black">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <UserDetailDialog
        selectedUser={selectedUser}
        closeModal={closeModal}
        getUserTypeLabel={getUserTypeLabel}
        getLocationLabel={getLocationLabel}
      />
    </div>
  );
};

export default UserDataTable;
