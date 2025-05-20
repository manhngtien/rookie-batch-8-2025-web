import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { User, Location, UserType } from "@/features/users/types/User";

interface UserDetailDialogProps {
  selectedUser: User | null;
  closeModal: () => void;
  getUserTypeLabel: (type: UserType) => string;
  getLocationLabel: (location: Location) => string;
}

const UserDetailDialog: React.FC<UserDetailDialogProps> = ({
  selectedUser,
  closeModal,
  getUserTypeLabel,
  getLocationLabel,
}) => {
  return (
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
              <strong>Gender:</strong> {selectedUser.gender ? "Male" : "Female"}
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
  );
};

export default UserDetailDialog;
