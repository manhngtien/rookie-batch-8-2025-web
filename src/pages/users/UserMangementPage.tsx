import { Funnel } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserDataTable from "@/features/users/components/user-data-table";

function UserManagementPage() {
  const [selectedTypes, setSelectedTypes] = useState(["All"]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev.filter((t) => t !== "All"), type],
    );
  };

  return (
    <div className="p-4">
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
          <Input className="" placeholder="Search..." />
          <Button className="bg-red-600 text-white hover:cursor-pointer hover:bg-red-700">
            Create new user
          </Button>
        </div>
      </div>
      <UserDataTable />
    </div>
  );
}

export default UserManagementPage;
