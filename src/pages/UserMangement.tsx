import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Funnel } from "lucide-react";
import UserDataTable from "@/features/users/components/UserDataTable";

function UserManagement() {
  const [selectedTypes, setSelectedTypes] = useState(["All"]);

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev.filter((t) => t !== "All"), type]
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-red-600">User List</h1>
      <div className="flex justify-between items-center space-x-4 mb-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[180px] justify-between hover:cursor-pointer">
              Type
              <span>
                <Funnel />
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
          <Input className="" placeholder="Search..." />
          <Button className="bg-red-600 text-white hover:bg-red-700 hover:cursor-pointer">
            Create new user
          </Button>
        </div>
      </div>
      <UserDataTable />
    </div>
  );
}

export default UserManagement;
