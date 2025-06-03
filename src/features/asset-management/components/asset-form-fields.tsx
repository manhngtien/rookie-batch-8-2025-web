import React from "react";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DateSelector } from "@/components/ui/dashboard-elements";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Category } from "@/features/asset-management/types/Category";
import type { formSchema } from "@/pages/asset-management/CreateNewAssetPage";

import { AddCategoryForm } from "./add-category-form";

export const categoryFormSchema = z.object({
  newCategoryName: z
    .string()
    .min(1, "Category name is required")
    .max(50, "Name too long"),
  prefix: z
    .string()
    .min(1, "Prefix is required")
    .max(10, "Prefix too long")
    .regex(/^[A-Z0-9]+$/, "Only uppercase letters or digits allowed"),
});

interface AssetFormFieldsProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  isAddingCategory: boolean;
  setIsAddingCategory: React.Dispatch<React.SetStateAction<boolean>>;
  newCategoryName: string;
  newCategoryPrefix: string;
  setNewCategoryName: React.Dispatch<React.SetStateAction<string>>;
  setNewCategoryPrefix: React.Dispatch<React.SetStateAction<string>>;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AssetFormFields: React.FC<AssetFormFieldsProps> = ({
  form,
  categories,
  isAddingCategory,
  setIsAddingCategory,
  isDropdownOpen,
  setIsDropdownOpen,
}) => {
  const handleCategorySelect = (
    categoryName: string,
    form: UseFormReturn<z.infer<typeof formSchema>>,
  ) => {
    const selectedCategory = categories.find(
      (cat) => cat.categoryName === categoryName,
    );
    form.setValue("category_id", selectedCategory?.id ?? 0);
  };
  return (
    <>
      {/* Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[120px_1fr] items-center gap-3">
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <FormControl>
              <Input id="asset-name" {...field} className="w-full" />
            </FormControl>
            <FormMessage className="col-start-2" />
          </FormItem>
        )}
      />
      {/* Category ID */}
      <FormField
        control={form.control}
        name="category_id"
        render={({ field }) => (
          <FormItem className="hidden">
            <FormControl>
              <Input id="category-id" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      {/* Category */}
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="category" className="text-sm font-medium">
              Category
            </Label>
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <FormControl>
                  <Button
                    id="category"
                    variant="outline"
                    className="w-full justify-between text-left"
                  >
                    {field.value
                      ? categories.find(
                          (cat) => cat.categoryName === field.value,
                        )?.categoryName
                      : "Select a category"}
                  </Button>
                </FormControl>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[calc(100%-120px-1rem)]">
                {categories.map((cat) => (
                  <DropdownMenuItem
                    key={cat.categoryName}
                    onSelect={() => {
                      handleCategorySelect(cat.categoryName, form);
                      field.onChange(cat.categoryName);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {cat.categoryName}
                  </DropdownMenuItem>
                ))}
                {!isAddingCategory && (
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setIsAddingCategory(true);
                      setIsDropdownOpen(true);
                    }}
                    className="text-foreground text-sm select-none"
                  >
                    + Add new category
                  </DropdownMenuItem>
                )}
                {isAddingCategory && (
                  <AddCategoryForm
                    existingCategories={categories}
                    onCancel={() => {
                      setIsAddingCategory(false);
                      setIsDropdownOpen(true);
                    }}
                    onSuccess={() => {
                      setIsAddingCategory(false);
                      setIsDropdownOpen(false);
                    }}
                  />
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <FormMessage className="col-start-2" />
          </FormItem>
        )}
      />

      {/* Specification */}
      <FormField
        control={form.control}
        name="specification"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="specification" className="text-sm font-medium">
              Specification
            </Label>
            <FormControl>
              <Input id="specification" {...field} className="w-full" />
            </FormControl>
            <FormMessage className="col-start-2" />
          </FormItem>
        )}
      />

      {/* Installed Date */}
      <FormField
        control={form.control}
        name="installedDate"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="installedDate" className="text-sm font-medium">
              Installed Date
            </Label>
            <div className="w-full">
              <DateSelector
                title="Installed Date"
                selectedDate={field.value}
                setSelectedDate={field.onChange}
                className="w-full !max-w-full"
              />
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* State */}
      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label className="text-sm font-medium">State</Label>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="available" id="available" />
                  <Label htmlFor="available" className="text-sm">
                    Available
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not_available" id="not_available" />
                  <Label htmlFor="not-available" className="text-sm">
                    Not available
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage className="col-start-2" />
          </FormItem>
        )}
      />
    </>
  );
};
