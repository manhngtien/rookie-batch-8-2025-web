import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import UserForm from "@/features/users/components/user-form";
import type { CreateUserRequest } from "@/features/users/types/User";
import type { AppDispatch, RootState } from "@/store";
import { createUser } from "@/store/thunks/userThunk";

const CreateUserPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error } = useSelector((state: RootState) => state.users);

  const handleCreateUser = async (data: {
    type: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: "male" | "female";
    joinedDate: Date;
    location?: string;
  }) => {
    const requestData: CreateUserRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth.toLocaleDateString(),
      gender: data.gender === "male",
      joinedDate: data.joinedDate.toLocaleDateString(),
      type: data.type,
      location: data.location,
    };
    try {
      const action = await dispatch(createUser(requestData));
      if (createUser.fulfilled.match(action)) {
        navigate("/users", { state: { newUserCreated: true } });
      }
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 text-black">
      <h2 className="mb-6 text-2xl font-bold text-red-600">Create New User</h2>
      <UserForm
        onSubmit={handleCreateUser}
        onCancel={() => {
          navigate("/users");
        }}
      />
    </div>
  );
};

export default CreateUserPage;
