import { useNavigate } from "react-router";

import CreateUserForm from "@/features/users/components/create-user-form";

export default function CreateUserPage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/users");
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <div className="mx-auto my-auto max-w-lg min-w-md bg-white p-6">
      <h1 className="mb-6 text-xl font-bold text-red-600">Create New User</h1>
      <CreateUserForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}
