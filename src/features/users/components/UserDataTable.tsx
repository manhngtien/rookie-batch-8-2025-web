import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleX, Pencil } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { users } from "./fake-data";

const UserDataTable = () => {
  const itemsPerPage = 10;
  const [currentPage] = React.useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="overflow-x-auto">
      <Table className="text-black">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="border p-2 text-left">Staff Code</TableHead>
            <TableHead className="border p-2 text-left">
              Full Name <span className="text-gray-500">▼</span>
            </TableHead>
            <TableHead className="border p-2 text-left">
              Username <span className="text-gray-500">▼</span>
            </TableHead>
            <TableHead className="border p-2 text-left">
              Joined Date <span className="text-gray-500">▼</span>
            </TableHead>
            <TableHead className="border p-2 text-left">
              Type <span className="text-gray-500">▼</span>
            </TableHead>
            <TableHead className="bg-white"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user) => (
            <TableRow className="border-b-0" key={user.id}>
              <TableCell className="border p-4">{user.id}</TableCell>
              <TableCell className="border p-4">{user.fullName}</TableCell>
              <TableCell className="border p-4">{user.username}</TableCell>
              <TableCell className="border p-4">{user.joinedDate}</TableCell>
              <TableCell className="border p-4">{user.type}</TableCell>
              <TableCell className="p-4">
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
      <Pagination className="mt-4 flex justify-end">
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
      </Pagination>{" "}
    </div>
  );
};

export default UserDataTable;
