import { Check, X } from "lucide-react";
import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { categoryFormSchema } from "@/pages/asset-management/CreateNewAssetPage"; // Adjust path if needed

interface CategoryFormFieldsProps {
  form: UseFormReturn<z.infer<typeof categoryFormSchema>>;
  onSubmit: (values: z.infer<typeof categoryFormSchema>) => void;
  onCancel: () => void;
}

export const CategoryFormFields: React.FC<CategoryFormFieldsProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(onSubmit)();
      }}
      className="space-y-4 p-4"
    >
      {/* Category Name */}
      <FormField
        control={form.control}
        name="newCategoryName"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="new-category-name" className="text-sm font-medium">
              Name
            </Label>
            <div className="w-full">
              <FormControl>
                <Input
                  id="new-category-name"
                  placeholder="e.g. Monitor"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* Prefix */}
      <FormField
        control={form.control}
        name="prefix"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="prefix" className="text-sm font-medium">
              Prefix
            </Label>
            <div className="w-full">
              <FormControl>
                <Input id="prefix" placeholder="e.g. MON" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* Action buttons */}
      <div className="flex justify-end gap-2 pt-2">
        <Button
          id=""
          type="submit"
          variant="default"
          className="bg-green-600 text-white hover:bg-green-700"
        >
          <Check className="mr-2 h-4 w-4" /> Add
        </Button>
        <Button id="" type="button" variant="outline" onClick={onCancel}>
          <X className="mr-2 h-4 w-4" /> Cancel
        </Button>
      </div>
    </form>
  );
};
