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

export const categoryFormSchema = z.object({
  newCategoryName: z
    .string()
    .min(1, "Category name is required")
    .max(20, "Name too long"),
  newCategoryPrefix: z
    .string()
    .min(1, "Prefix is required")
    .max(2, "Prefix too long")
    .regex(/^[A-Z0-9]+$/, "Only uppercase letters or digits allowed"),
});

interface AddCategoryFormProps {
  existingCategories: Category[];
  onCancel: () => void;
  onSuccess: (newCategory: Category) => void;
}

export const AddCategoryForm: React.FC<AddCategoryFormProps> = ({
  existingCategories,
  onCancel,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const formSchema = categoryFormSchema
    .refine(
      (data) =>
        !existingCategories.some(
          (cat) =>
            cat.categoryName.toLowerCase().trim() ===
            data.newCategoryName.toLowerCase().trim(),
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

  type CategoryFormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newCategoryName: "",
      newCategoryPrefix: "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      console.info("Submitting new category:", data);
      const newCategory = await dispatch(
        createCategories({
          categoryName: data.newCategoryName,
          prefix: data.newCategoryPrefix,
        }),
      ).unwrap();
      onSuccess(newCategory.data); // Pass the new category to onSuccess
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex px-2 py-1.5">
        {isSubmitted && errors.newCategoryName && (
          <p className="text-xs text-red-500">
            {errors.newCategoryName.message}.
          </p>
        )}
        {isSubmitted && errors.newCategoryPrefix && (
          <p className="text-xs text-red-500">
            {errors.newCategoryPrefix.message}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 px-2 py-1.5">
        <Input
          id="new-category-name"
          {...register("newCategoryName")}
          placeholder="Bluetooth Mouse"
          className="flex-6"
          onKeyDown={(e) => e.stopPropagation()}
        />
        <Input
          id="new-category-prefix"
          {...register("newCategoryPrefix")}
          placeholder="BM"
          className="flex-1"
          onKeyDown={(e) => e.stopPropagation()}
        />
        <Button
          id="add-category-submit"
          type="button"
          onClick={handleSubmit(onSubmit)}
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
    </div>
  );
};
