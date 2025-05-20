import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import Modal from "@/components/modal";
import ChangePasswordDialog from "@/features/change-password/components/change-password-dialog";

import type { UserLogoutProps } from "../types/types";
import LogoutPopup from "./logout-popup";
export default function UserLogout({ userName }: UserLogoutProps) {
  const [openDropdown, setOpenDropDown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);

  return (
    <div className="w-full">
      {openModal && (
        <Modal>
          <LogoutPopup
            onLogout={() => {}}
            onCancel={() => setOpenModal(false)}
          />
        </Modal>
      )}

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
