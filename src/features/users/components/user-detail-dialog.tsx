import React from "react";

import { DetailDialog } from "@/components/ui/dashboard-elements";
import type { User } from "@/features/users/types/User";
import { formatDate } from "@/utils/helpers";

interface UserDetailDialogProps {
  selectedUser: User | null;
  closeModal: () => void;
}

const UserDetailDialog: React.FC<UserDetailDialogProps> = ({
  selectedUser,
  closeModal,
}) => {
  return (
    <DetailDialog<User>
      selectedEntity={selectedUser}
      closeModal={closeModal}
      title="Detailed User Information"
    >
      {selectedUser && (
        <div className="space-y-4 px-8 py-2">
          <div className="grid grid-cols-2 gap-4 text-gray-500">
            <p className="font-medium">Staff Code:</p>
            <p className="text-left break-words">{selectedUser.staffCode}</p>
            <p className="font-medium">Full Name:</p>
            <p className="text-left break-words">{`${selectedUser.firstName} ${selectedUser.lastName}`}</p>
            <p className="font-medium">Username:</p>
            <p className="text-left break-words">{selectedUser.userName}</p>
            <p className="font-medium">Date of Birth:</p>
            <p className="text-left">
              {selectedUser.dateOfBirth
                ? formatDate(selectedUser.dateOfBirth)
                : "N/A"}
            </p>
            <p className="font-medium">Gender:</p>
            <p className="text-left">
              {selectedUser.gender ? "Male" : "Female"}
            </p>
            <p className="font-medium">Joined Date:</p>
            <p className="text-left">
              {selectedUser.joinedDate
                ? formatDate(selectedUser.joinedDate)
                : "N/A"}
            </p>
            <p className="font-medium">Type:</p>
            <p className="text-left">{selectedUser.type}</p>
            <p className="font-medium">Location:</p>
            <p className="text-left break-words">{selectedUser.location}</p>
          </div>
        </div>
      )}
    </DetailDialog>
  );
};

export default UserDetailDialog;
