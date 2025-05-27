import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AssetFormFields } from "@/features/asset-management/components/asset-form-fields";
interface Category {
  value: string;
  label: string;
}

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string({
    required_error: "Category is required",
  }),
  specification: z.string().min(1, "Specification is required"),
  installedDate: z.date({
    required_error: "Installed date is required",
  }),
  state: z.enum(["available", "not-available"], {
    required_error: "State is required",
  }),
});

interface CreateNewAssetPageProps {
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
  onCancel?: () => void;
}

function CreateNewAssetPage({ onSubmit, onCancel }: CreateNewAssetPageProps) {
  const [categories, setCategories] = useState<Category[]>([
    { value: "electronics", label: "Electronics" },
    { value: "furniture", label: "Furniture" },
    { value: "equipment", label: "Equipment" },
  ]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      specification: "",
      state: undefined,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

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
    if (isAddingCategory && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingCategory]);

  return (
    <Form {...form}>
      <form
        id="create-asset-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto max-w-md space-y-6 p-6 text-black"
      >
        <h2 className="mb-6 text-2xl font-bold text-red-600">
          Create New Asset
        </h2>
        <AssetFormFields
          form={form}
          categories={categories}
          setCategories={setCategories}
          isAddingCategory={isAddingCategory}
          setIsAddingCategory={setIsAddingCategory}
          newCategoryName={newCategoryName}
          setNewCategoryName={setNewCategoryName}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />
        <div className="flex justify-end space-x-4">
          <Button
            id="cancel-button"
            type="button"
            variant="outline"
            onClick={onCancel}
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
