import { ChevronDown } from "lucide-react";
import type { UserLogoutProps } from "../types/types";
import { useState } from "react";
import Modal from "@/components/modal";
import LogoutPopup from "./logout-popup";
import { Link } from "react-router";
export default function UserLogout({ userName }: UserLogoutProps) {
    const [openDropdown, setOpenDropDown] = useState(false)
    const [openModal, setOpenModal] = useState(false)
  return (
    <div className="w-full">
      {
        openModal && 
        <Modal>
            <LogoutPopup onLogout={() => {}} onCancel={() => setOpenModal(false)}/>
        </Modal>
      }
      <button onClick={() => setOpenDropDown((prev) => !prev)} className="flex ml-auto">
        <p>{userName}</p>
        <ChevronDown />
      </button>
      { openDropdown &&
      <div
        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
      >
        <Link to={"create-user"}>
          Create User
        </Link>
        <button
          onClick={() => {
                setOpenModal(true)
          }}
          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Sign out
        </button>
      </div>
        }   
    </div>
  );
}
