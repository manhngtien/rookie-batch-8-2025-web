// src/components/NavUser.tsx
import { ChevronsUpDown, Lock, LogOut } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

// import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChangePasswordDialog from "@/features/change-password/components/change-password-dialog";
import type { AppDispatch } from "@/store";
import { logoutUser } from "@/store/thunks/authThunk";

import GeneralDialog from "./general-dialog";

interface NavUserProps {
  user: {
    name?: string;
    avatar?: string;
  };
}

export function NavUser({ user }: NavUserProps) {
  // const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
    setOpenModal(false);
  };

  return (
    <div>
      <GeneralDialog
        content
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleLogout}
        header="Are you sure ?"
        description="Do you want to log out?"
      />

      {openChangePasswordDialog && (
        <ChangePasswordDialog
          open={openChangePasswordDialog}
          onOpenChange={setOpenChangePasswordDialog}
        />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            id="user-dropdown"
            className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-2 rounded-lg p-2 hover:cursor-pointer"
          >
            <div className="grid text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {user.name ?? "User"}
              </span>
            </div>
            <ChevronsUpDown className="ml-2 size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg hover:cursor-pointer"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">NT</AvatarFallback>
              </Avatar>
              <div className="grid text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user.name ?? "User"}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpenChangePasswordDialog(true)}
            className="text-black hover:cursor-pointer"
          >
            <Lock className="size-4" />
            Change Password
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-black hover:cursor-pointer"
          >
            <LogOut className="size-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
