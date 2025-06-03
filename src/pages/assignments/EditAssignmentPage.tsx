import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import type { z } from "zod";

import { PageTitle } from "@/components/ui/dashboard-elements";
import assetService from "@/features/asset-management/services/assetService";
import type { Asset } from "@/features/asset-management/types/Asset";
import {
  AssignmentForm,
  assignmentFormSchema,
} from "@/features/assignments/components/assignment-form";
import { assignmentService } from "@/features/assignments/services/assignmentService";
import type { Assignment } from "@/features/assignments/types/Assignment";
import { APP_ROUTES } from "@/lib/appRoutes";
import type { AppDispatch, RootState } from "@/store";
import { editAssignment } from "@/store/thunks/assignmentThunk";

export default function EditAssignmentPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [assignment, setAssignment] = useState<Assignment>();
  const [asset, setAsset] = useState<Asset | undefined>(undefined);

  const { loading, error } = useSelector(
    (state: RootState) => state.assignments,
  );

  const form = useForm<z.infer<typeof assignmentFormSchema>>({
    resolver: zodResolver(assignmentFormSchema),
    defaultValues: {
      staffCode: assignment?.assignedToUser.staffCode ?? "",
      assetCode: assignment?.assetCode ?? "",
      assignedDate: assignment?.assignedDate
        ? new Date(assignment.assignedDate)
        : undefined,
      note: assignment?.note ?? "",
    },
  });

  const FetchSingleAssignment = useCallback(async () => {
    try {
      if (!id) return;
      setAssignment(
        (await assignmentService.getSingleAssignment({ id: Number(id) })).data,
      );
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const FetchSingleAsset = useCallback(async () => {
    try {
      if (assignment?.assetCode)
        setAsset(
          (await assetService.getAssetByCode(assignment.assetCode)).data,
        );
    } catch (err) {
      console.log(err);
    }
  }, [assignment?.assetCode]);

  const handleSubmit = async (values: z.infer<typeof assignmentFormSchema>) => {
    if (!id) return;

    console.info(values, id, "ddddddddddddd");
    const response = await dispatch(
      editAssignment({
        ...values,
        id: Number(id),
      }),
    );
    if (editAssignment.fulfilled.match(response)) {
      navigate(APP_ROUTES.assignment.path, {
        state: { newAssignmentCreated: true },
      });
    }
  };

  const handleCancel = () => {
    navigate(APP_ROUTES.assignment.path);
  };

  useEffect(() => {
    FetchSingleAssignment();
  }, [FetchSingleAssignment]);

  // Fetch asset after assignment is loaded
  useEffect(() => {
    FetchSingleAsset();
  }, [FetchSingleAsset]);

  useEffect(() => {
    if (assignment) {
      form.reset({
        staffCode: assignment.assignedToUser.staffCode ?? "",
        assignedDate: assignment.assignedDate
          ? new Date(assignment.assignedDate)
          : undefined,
        note: assignment.note ?? "",
      });
    }
  }, [assignment, form]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mx-auto my-auto flex max-w-lg min-w-md flex-col gap-6 bg-white p-6">
      <PageTitle>Edit Assignment</PageTitle>
      <AssignmentForm
        form={form}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialUser={assignment?.assignedToUser}
        initialAsset={asset}
      />
    </div>
  );
}
