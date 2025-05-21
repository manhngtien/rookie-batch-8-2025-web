import { ChevronDown } from "lucide-react";
import type { UserLogoutProps } from "../types/types";
import { useState } from "react";
import ChangePasswordDialog from "@/features/change-password/components/change-password-dialog";
import { Link } from "react-router";
import GeneralDialog from "@/components/general-dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
export default function UserLogout({ userName }: UserLogoutProps) {
  const [openDropdown, setOpenDropDown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);

  return (
    <div className="w-full">
      <GeneralDialog
        content
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        header="Are you sure ?"
        description="Do you want to log out?"
      />

      {openChangePasswordDialog && (
        <ChangePasswordDialog
          open={openChangePasswordDialog}
          onOpenChange={setOpenChangePasswordDialog}
        />
      )}

      <button
        onClick={() => setOpenDropDown((prev) => !prev)}
        className="ml-auto flex"
      >
        <p>{userName}</p>
        <ChevronDown />
      </button>

      {openDropdown && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
          <Link to={"create-user"}>Create User</Link>
          <button
            onClick={() => {
              setOpenChangePasswordDialog(true);
            }}
            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Change password
          </button>
          <button
            onClick={() => {
              setOpenModal(true);
            }}
            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
