import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AssetFormFields } from "@/features/asset-management/components/asset-form-fields";
import type { AppDispatch, RootState } from "@/store";
import { createAsset } from "@/store/thunks/assetThunk";
import { fetchCategories } from "@/store/thunks/categoryThunk";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  category: z.string({
    required_error: "Category is required",
  }),
  category_id: z.number().optional(),
  specification: z
    .string()
    .min(1, "Specification is required")
    .max(100, "Specification is too long"),
  installedDate: z.date({
    required_error: "Installed date is required",
  }),
  state: z.enum(["available", "not_available"], {
    required_error: "State is required",
  }),
});

function CreateNewAssetPage() {
  const dispatch = useDispatch<AppDispatch>();
  const dataCategories = useSelector(
    (state: RootState) => state.categories.categories,
  );
  const navigate = useNavigate();

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category_id: 0,
      category: "",
      specification: "",
      state: undefined,
    },
  });

  const isFormComplete = () => {
    const values = form.getValues();
    const requiredFields = [
      "name",
      "category",
      "specification",
      "installedDate",
      "state",
    ];
    return requiredFields.every(
      (field) => values[field as keyof typeof values],
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories()).unwrap();
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (isAddingCategory && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingCategory]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("assetName", data.name);
    formData.append("categoryId", data.category_id?.toString() ?? "0");
    formData.append("specification", data.specification);
    const localDateString = data.installedDate.toLocaleDateString("sv-SE");
    formData.append("installedDate", localDateString);
    formData.append("state", data.state);
    const resultAction = await dispatch(createAsset(formData));
    if (createAsset.fulfilled.match(resultAction)) {
      navigate("/assets");
    }
  };

  const handleCancel = () => {
    navigate("/assets");
  };

  return (
    <Form {...form}>
      <form
        id="create-asset-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto max-w-lg space-y-6 p-6 text-black"
      >
        <h2 className="mb-6 text-2xl font-bold text-red-600">
          Create New Asset
        </h2>
        <AssetFormFields
          form={form}
          categories={dataCategories}
          isAddingCategory={isAddingCategory}
          setIsAddingCategory={setIsAddingCategory}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />
        <div className="flex justify-end space-x-4">
          <Button
            id="cancel-button"
            type="button"
            variant="outline"
            onClick={handleCancel}
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

export default CreateNewAssetPage;
