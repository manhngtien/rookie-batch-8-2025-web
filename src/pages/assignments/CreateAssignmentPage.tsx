import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { z } from "zod";

import { PageTitle } from "@/components/ui/dashboard-elements";
import {
  type assignmentFormSchema,
  CreateAssignmentForm,
} from "@/features/assignments/components/assignment-form";
import { APP_ROUTES } from "@/lib/appRoutes";
import type { AppDispatch, RootState } from "@/store";
import { createAssignment } from "@/store/thunks/assignmentThunk";

export default function CreateAssignmentPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector(
    (state: RootState) => state.assignments,
  );

  const handleSubmit = async (values: z.infer<typeof assignmentFormSchema>) => {
    const response = await dispatch(createAssignment(values));

    if (createAssignment.fulfilled.match(response)) {
      navigate(APP_ROUTES.assignment.path, {
        state: { newAssignmentCreated: true },
      });
    }
  };

  const handleCancel = () => {
    navigate(APP_ROUTES.assignment.path);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mx-auto my-auto flex max-w-lg min-w-md flex-col gap-6 bg-white p-6">
      <PageTitle>Create New Assignment</PageTitle>
      <CreateAssignmentForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}
