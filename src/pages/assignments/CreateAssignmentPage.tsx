// import { useNavigate } from "react-router";

import { PageTitle } from "@/components/ui/dashboard-elements";
// import { APP_ROUTES } from "@/lib/appRoutes";

export default function CreateAssignmentPage() {
  //   const navigate = useNavigate();

  //   const handleSubmit = () => {
  //     navigate(APP_ROUTES.assignment.path);
  //   };

  //   const handleCancel = () => {
  //     navigate(APP_ROUTES.assignment.path);
  //   };

  return (
    <div className="mx-auto my-auto max-w-lg min-w-md bg-white p-6">
      <PageTitle>Create New Assignment</PageTitle>
      {/* <CreateAssignmentForm onSubmit={handleSubmit} onCancel={handleCancel} /> */}
    </div>
  );
}
