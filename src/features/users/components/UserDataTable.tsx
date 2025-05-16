import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  CircleX,
  Pencil,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const UserDataTable = () => {
  const users = [
    {
      id: "SD1901",
      fullName: "An Nguyen Thuy",
      username: "annt",
      joinedDate: "20/06/2019",
      type: "Staff",
    },
    {
      id: "SD1234",
      fullName: "An Tran Van",
      username: "antv",
      joinedDate: "09/04/2019",
      type: "Staff",
    },
    {
      id: "SD0971",
      fullName: "Binh Nguyen Van",
      username: "binhv1",
      joinedDate: "08/03/2018",
      type: "Admin",
    },
    {
      id: "SD0973",
      fullName: "Binh Nguyen Van",
      username: "binhv2",
      joinedDate: "08/03/2018",
      type: "Staff",
    },
    {
      id: "SD0974",
      fullName: "Binh Nguyen Van",
      username: "binhv3",
      joinedDate: "08/03/2018",
      type: "Staff",
    },
    {
      id: "SD0976",
      fullName: "Binh Nguyen Van",
      username: "binhv4",
      joinedDate: "08/03/2018",
      type: "Staff",
    },
    {
      id: "SD0977",
      fullName: "Binh Nguyen Van",
      username: "binhv5",
      joinedDate: "08/03/2018",
      type: "Staff",
    },
    {
      id: "SD0978",
      fullName: "Binh Nguyen Van",
      username: "binhv6",
      joinedDate: "08/03/2018",
      type: "Staff",
    },
    {
      id: "SD0979",
      fullName: "Binh Nguyen Van",
      username: "binhv7",
      joinedDate: "08/03/2018",
      type: "Staff",
    },
    {
      id: "SD0980",
      fullName: "Binh Nguyen Van",
      username: "binhv8",
      joinedDate: "08/03/2018",
      type: "Staff",
    },
    {
      id: "SD0981",
      fullName: "Binh Nguyen Van",
      username: "binhv9",
      joinedDate: "08/03/2018",
      type: "Staff",
    },
    {
      id: "SD0982",
      fullName: "Binh Nguyen Van",
      username: "binhv10",
      joinedDate: "08/03/2018",
      type: "Staff",
    },
    {
      id: "SD0983",
      fullName: "Binh Nguyen Van",
      username: "binhv11",
      joinedDate: "08/03/2018",
      type: "Staff",
    },
    {
      id: "SD0984",
      fullName: "Binh Nguyen Van",
      username: "binhv12",
      joinedDate: "08/03/2018",
      type: "Staff",
    },
    {
      id: "SD0985",
      fullName: "Binh Nguyen Van",
      username: "binhv13",
      joinedDate: "08/03/2018",
      type: "Staff",
    },
    {
      id: "SD0986",
      fullName: "Binh Nguyen Van",
      username: "binhv14",
      joinedDate: "08/03/2018",
      type: "Staff",
    },
    {
      id: "SD0987",
      fullName: "Binh Nguyen Van",
      username: "binhv15",
      joinedDate: "08/03/2018",
      type: "Staff",
    },
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = React.useState(1);

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
            <TableHead className="border p-2 text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="border p-4">{user.id}</TableCell>
              <TableCell className="border p-4">{user.fullName}</TableCell>
              <TableCell className="border p-4">{user.username}</TableCell>
              <TableCell className="border p-4">{user.joinedDate}</TableCell>
              <TableCell className="border p-4">{user.type}</TableCell>
              <TableCell className="border p-4">
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
