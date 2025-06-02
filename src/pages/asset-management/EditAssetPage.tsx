import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { EditAssetFormFields } from "@/features/asset-management/components/edit-asset-form-fields";
import type { AssetUpdate } from "@/features/asset-management/types/Asset";
import type { AppDispatch, RootState } from "@/store";
import { fetchAssetById, updateAssetById } from "@/store/thunks/assetThunk";

type AssetState =
  | "available"
  | "not_available"
  | "waiting_for_recycling"
  | "recycled";

function mapToAssetState(input: string): AssetState {
  const normalized = input.toLowerCase();
  if (
    normalized === "available" ||
    normalized === "not_available" ||
    normalized == "waiting_for_recycling" ||
    normalized == "recycled"
  ) {
    return normalized;
  }
  throw new Error(`Invalid state from API: ${input}`);
}

export const editFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  category_id: z.number().optional().nullable(),
  specification: z.string().min(1, "Specification is required"),
  installedDate: z.date({
    required_error: "Installed date is required",
  }),
  state: z.enum(
    ["available", "not_available", "waiting_for_recycling", "recycled"],
    {
      required_error: "State is required",
    },
  ),
});

function EditAssetPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { assetCode = "" } = useParams<{ assetCode?: string }>();

  const asset = useSelector((state: RootState) => state.assets.selectedAsset);
  console.info(asset);

  const handleSubmit = async (data: z.infer<typeof editFormSchema>) => {
    if (!assetCode) return;

    const updateData: AssetUpdate = {
      assetName: data.name,
      specification: data.specification,
      installedDate: new Date(data.installedDate).toLocaleDateString("sv-SE"),
      state: data.state,
    };

    try {
      const resultAction = await dispatch(
        updateAssetById({ assetCode, assetUpdate: updateData }),
      ).unwrap();
      console.info("result Action", resultAction);
      navigate("/assets");
    } catch (error) {
      console.error("Failed to update asset:", error);
    }
  };

  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      name: "",
      category: "",
      category_id: 0,
      specification: "",
      installedDate: new Date(),
      state: undefined,
    },
  });

  const watchedValues = useWatch({ control: form.control });
  const isFormComplete = () => {
    const values = watchedValues;

    return (
      values.name?.trim() &&
      values.category &&
      values.category_id !== 0 &&
      values.specification?.trim() &&
      values.installedDate instanceof Date &&
      !isNaN(values.installedDate.getTime()) &&
      values.state?.trim()
    );
  };

  useEffect(() => {
    if (assetCode) {
      dispatch(fetchAssetById(assetCode));
    }
  }, [assetCode, dispatch]);

  useEffect(() => {
    if (asset) {
      form.reset({
        name: asset.assetName,
        category: asset.category.categoryName,
        specification: asset.specification,
        installedDate: new Date(asset.installedDate),
        state: mapToAssetState(asset.state),
        category_id: asset.category.id,
      });
    }
  }, [asset, form]);

  return (
    <Form {...form}>
      <form
        id="update-asset-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto max-w-md space-y-6 p-6 text-black"
      >
        <h2 className="mb-6 text-2xl font-bold text-red-600">Update Asset</h2>
        <EditAssetFormFields form={form} />
        <div className="flex justify-end space-x-4">
          <Button
            id="cancel-button"
            type="button"
            variant="outline"
            onClick={() => navigate("/assets")}
          >
            Cancel
          </Button>
          <Button
            id="save-button"
            type="submit"
            className="bg-red-600 text-white hover:bg-red-700"
            disabled={!isFormComplete()}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EditAssetPage;
