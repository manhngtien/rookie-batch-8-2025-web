import { useNavigate } from "react-router";

import { PageTitle } from "@/components/ui/dashboard-elements";
import { CreateAssignmentForm } from "@/features/assignments/components/assignment-form";
import { APP_ROUTES } from "@/lib/appRoutes";

export default function CreateAssignmentPage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(APP_ROUTES.assignment.path);
  };

  const handleCancel = () => {
    navigate(APP_ROUTES.assignment.path);
  };

  return (
    <div className="mx-auto my-auto flex max-w-lg min-w-md flex-col gap-6 bg-white p-6">
      <PageTitle>Create New Assignment</PageTitle>
      <CreateAssignmentForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}
