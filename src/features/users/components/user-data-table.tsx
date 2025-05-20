import { ChevronDown, CircleX, Pencil } from "lucide-react";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Location, User, UserType } from "@/features/users/types/User";

import { users } from "../types/fakeData";

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
              key={user.staffCode} // Use staffCode as a unique key
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
                <div className="flex gap-2">
                  <button className="hover:cursor-pointer">
                    <Pencil size={20} />
                  </button>
                  <button className="hover:cursor-pointer">
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

      {/* Modal for Detailed User Information */}
      <Dialog open={!!selectedUser} onOpenChange={closeModal}>
        <DialogContent className="max-w-md text-black">
          <DialogHeader>
            <DialogTitle>Detailed User Information</DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-2">
              <p>
                <strong>Staff Code:</strong> {selectedUser.staffCode}
              </p>
              <p>
                <strong>Full Name:</strong>{" "}
                {`${selectedUser.firstName} ${selectedUser.lastName}`}
              </p>
              <p>
                <strong>Username:</strong> {selectedUser.username}
              </p>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {selectedUser.dateOfBirth || "N/A"}
              </p>
              <p>
                <strong>Gender:</strong>{" "}
                {selectedUser.gender ? "Male" : "Female"}
              </p>
              <p>
                <strong>Joined Date:</strong> {selectedUser.joinedDate}
              </p>
              <p>
                <strong>Type:</strong> {getUserTypeLabel(selectedUser.type)}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {getLocationLabel(selectedUser.location)}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedUser.isDisabled ? "Disabled" : "Active"}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDataTable;
