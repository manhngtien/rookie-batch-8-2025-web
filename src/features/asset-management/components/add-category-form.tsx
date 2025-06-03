import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Category } from "@/features/asset-management/types/Category";
import type { AppDispatch } from "@/store";
import { createCategories } from "@/store/thunks/categoryThunk";

interface AddCategoryFormProps {
  existingCategories: Category[];
  onCancel: () => void;
  onSuccess: () => void;
}

export const AddCategoryForm: React.FC<AddCategoryFormProps> = ({
  existingCategories,
  onCancel,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const categoryFormSchema = z
    .object({
      newCategoryName: z
        .string()
        .min(1, "Category name is required")
        .max(50, "Name too long"),
      newCategoryPrefix: z
        .string()
        .min(1, "Prefix is required")
        .max(10, "Prefix too long")
        .regex(/^[A-Z0-9]+$/, "Only uppercase letters or digits allowed"),
    })
    .refine(
      (data) =>
        !existingCategories.some(
          (cat) =>
            cat.categoryName.toLowerCase() ===
            data.newCategoryName.toLowerCase(),
        ),
      {
        message: "Category name already exists",
        path: ["newCategoryName"],
      },
    )
    .refine(
      (data) =>
        !existingCategories.some(
          (cat) =>
            cat.prefix.toUpperCase() === data.newCategoryPrefix.toUpperCase(),
        ),
      {
        message: "Prefix already exists",
        path: ["newCategoryPrefix"],
      },
    );

  type CategoryFormValues = z.infer<typeof categoryFormSchema>;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      newCategoryName: "",
      newCategoryPrefix: "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      console.info("Submitting new category:", data);
      await dispatch(
        createCategories({
          categoryName: data.newCategoryName,
          prefix: data.newCategoryPrefix,
        }),
      ).unwrap();
      onSuccess();
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <div className="flex items-center gap-2 px-2 py-1.5">
      <Input
        id="new-category-name"
        {...form.register("newCategoryName")}
        placeholder="Bluetooth Mouse"
        className="flex-6 rounded-none"
      />
      <Input
        id="new-category-prefix"
        {...form.register("newCategoryPrefix")}
        placeholder="BM"
        className="flex-1 rounded-none"
      />
      <Button
        id="add-category-submit"
        type="button"
        onClick={form.handleSubmit(onSubmit)}
        variant="ghost"
        size="icon"
        className="h-6 w-6"
      >
        <Check className="h-4 w-4 text-green-600" />
      </Button>
      <Button
        id="add-category-cancel"
        type="button"
        onClick={onCancel}
        variant="ghost"
        size="icon"
        className="h-6 w-6"
      >
        <X className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  );
};
