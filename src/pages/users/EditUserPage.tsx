import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { Spinner } from "@/components/ui/spinner";
import UserForm from "@/features/users/components/user-form";
import type { UpdateUserRequest, User } from "@/features/users/types/User";
import type { AppDispatch, RootState } from "@/store";
import { fetchUsers, updateUser } from "@/store/thunks/userThunk";

const EditUserPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { staffCode } = useParams<{ staffCode: string }>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users,
  );

  const userToEdit = users.find((user: User) => user.staffCode === staffCode);

  useEffect(() => {
    if (!userToEdit && staffCode) {
      dispatch(fetchUsers({ page: 1, pageSize: 20 }));
    }
  }, [dispatch, staffCode, userToEdit]);

  const handleEditUser = async (data: {
    dateOfBirth: Date;
    gender: "male" | "female";
    joinedDate: Date;
    type: string;
    location?: string;
  }) => {
    if (!staffCode) return;

    const requestData: UpdateUserRequest = {
      dateOfBirth: data.dateOfBirth.toLocaleDateString(),
      gender: data.gender === "male",
      joinedDate: data.joinedDate.toLocaleDateString(),
      type: data.type,
    };

    console.info(JSON.stringify(data.joinedDate));

    try {
      const action = await dispatch(
        updateUser({ staffCode, user: requestData }),
      );
      if (updateUser.fulfilled.match(action)) {
        navigate("/users", { state: { userEdited: true } });
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  if (!userToEdit) return <div>User not found</div>;

  const defaultValues: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: "male" | "female";
    joinedDate: Date;
    type: string;
    location?: string;
  } = {
    firstName: userToEdit.firstName,
    lastName: userToEdit.lastName,
    dateOfBirth: new Date(userToEdit.dateOfBirth),
    gender: userToEdit.gender ? "male" : "female",
    joinedDate: new Date(userToEdit.joinedDate),
    type: userToEdit.type,
    location: userToEdit.location,
  };

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 text-black">
      <h2 className="mb-6 text-2xl font-bold text-red-600">Edit User</h2>
      <UserForm
        isEditing={true}
        onSubmit={handleEditUser}
        onCancel={() => navigate("/users")}
        defaultValues={defaultValues}
      />
    </div>
  );
};

export default EditUserPage;
